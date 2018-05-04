package main

import (
	"encoding/json"
	"fmt"

	"github.com/gobwas/ws"
	"github.com/gobwas/ws/wsutil"
	"github.com/teejays/gofiledb"
	"net"
	"net/http"
	"sync"
	"time"
)

// This example demonstrates a trivial echo server.
func main() {
	// set the app
	gofiledb.InitClient("data")
	err := setupEventsMap()
	if err != nil {
		panic(err)
	}

	// set the webserver
	http.HandleFunc("/ws", handlerWs)

	http.HandleFunc("/event", handlerEvents)
	http.HandleFunc("/ping", handlerPing)
	http.HandleFunc("/screen/connect", handlerScreenConnect)
	http.HandleFunc("/screen/control", handlerScreenControl)

	fmt.Println("Listening for requests..")
	err = http.ListenAndServe(":3000", nil)
	if err != nil {
		panic("ListenAndServe: " + err.Error())
	}
}

/* H A N D L E R S */

func handlerPing(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte(`Pong`))
}

func handlerEvents(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		handlerGetEvents(w, r)
		break
	case "POST":
		handlerPostEvent(w, r)
		break
	default:
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(fmt.Sprintf("No %s endpoint implement for the route", r.Method)))
		return
	}

}

func handlerGetEvents(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Request received for Events..")

	events := getEvents()
	bytes, err := json.Marshal(events)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(bytes)
}

type AddEventParams struct {
	EventType                string
	Name                     string
	DatetimeStart            time.Time
	Presenters               []User
	Judges                   []User
	EventDuration            time.Duration
	PresentationDuration     time.Duration
	AudienceFeedbackDuration time.Duration
	JudgeFeedbackDuration    time.Duration
}

func handlerPostEvent(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Request received for adding events..")

	// get the params
	decoder := json.NewDecoder(r.Body)
	var p AddEventParams

	err := decoder.Decode(&p)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}

	event := NewEvent(p.EventType, p.Name, p.DatetimeStart, p.Presenters, p.Judges, p.EventDuration, p.PresentationDuration, p.AudienceFeedbackDuration, p.JudgeFeedbackDuration)
	err = addEvent(*event)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}

	w.Write([]byte("Submitted"))
}

type ReponseStruct struct {
	Message interface{}
}
type ScreenConnectParams struct {
	EventId int
	Code    string
}

func handlerScreenConnect(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(fmt.Sprintf("No %s endpoint implement for the route", r.Method)))
		return
	}
	fmt.Println("Request received for ScreenConnect..")

	// get the params
	decoder := json.NewDecoder(r.Body)
	var params ScreenConnectParams

	err := decoder.Decode(&params)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}

	if params.Code == "" || params.EventId < 1 {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(fmt.Sprintf("Invalid parameters provided: eventId=%d, code=%s", params.EventId, params.Code)))
		return
	}

	// check if code is valid
	screenCodeConnectionMapLock.RLock()
	_, exists := screenCodeConnectionMap[params.Code]
	screenCodeConnectionMapLock.RUnlock()
	if !exists {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid code: no screen found for the given code."))
		return
	}

	// if valid, we should get the event
	event, err := getEventById(params.EventId)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}

	// get an app token for the requester, and store it so we know what app is connected to what screen
	var token string
	exists = true
	for exists { // get a token until we have a new unused one
		token = getUniqueAppToken()
		appTokenScreenCodeMapLock.RLock()
		_, exists = appTokenScreenCodeMap[token]
		appTokenScreenCodeMapLock.RUnlock()
	}
	fmt.Println("AppToken Generated: " + token)
	appTokenScreenCodeMapLock.Lock()
	appTokenScreenCodeMap[token] = params.Code
	appTokenScreenCodeMapLock.Unlock()

	// send the event data to the screen
	err = sendWsDataByCode(params.Code, WsMessage{"Event", event})
	if err != nil {
		fmt.Println(err)
	}

	w.Write([]byte(token))

}

type ScreenControlParams struct {
	AppToken string
	Action   string
}

func handlerScreenControl(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(fmt.Sprintf("No %s endpoint implement for the route", r.Method)))
		return
	}
	fmt.Println("Request received for ScreenControl..")

	// get the params
	decoder := json.NewDecoder(r.Body)
	var params ScreenControlParams

	err := decoder.Decode(&params)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}

	if params.AppToken == "" || params.Action == "" {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(fmt.Sprintf("Invalid parameters provided: appToken=%d, action=%s", params.AppToken, params.Action)))
		return
	}

	// check what screen the app token points to
	appTokenScreenCodeMapLock.RLock()
	code, exists := appTokenScreenCodeMap[params.AppToken]
	appTokenScreenCodeMapLock.RUnlock()
	if !exists {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid token: seems like the app is not linked to any screen."))
		return
	}

	// depending on the control action, create the ws request for screen
	var wsMessage WsMessage
	switch params.Action {
	case "start":
		wsMessage.MessageType = "Start"
	case "pause":
		wsMessage.MessageType = "Pause"
	case "resume":
		wsMessage.MessageType = "Resume"
	case "next":
		wsMessage.MessageType = "Next"
	}

	// send the ws message
	err = sendWsDataByCode(code, wsMessage)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte("Submitted"))
}

var screenCodeConnectionMap map[string]net.Conn
var screenCodeConnectionMapLock sync.RWMutex

var appTokenScreenCodeMap map[string]string
var appTokenScreenCodeMapLock sync.RWMutex

func init() {
	screenCodeConnectionMap = make(map[string]net.Conn)
	appTokenScreenCodeMap = make(map[string]string)
}

// map[uniqueCode]EventId
// func handlerCreateScreenConnection (uniqueCode, eventId)

// func handlerCreateEvent()

type WsMessage struct {
	MessageType string
	Message     interface{}
}

func handlerWs(w http.ResponseWriter, r *http.Request) {
	conn, _, _, err := ws.UpgradeHTTP(r, w, nil)
	if err != nil {
		panic(err)
	}

	go func() {
		defer conn.Close()

		defer func() {
			if r := recover(); r != nil {
				fmt.Printf("Goroutine recovered after panic: %v\n", r)
			}
		}()

		// get code for the web client and store it in the map
		code := getUniqueScreenCode()
		appTokenScreenCodeMapLock.RLock()
		if _, exists := screenCodeConnectionMap[code]; exists {
			appTokenScreenCodeMapLock.RUnlock()
			fmt.Println("the code is already in use")
			return
		}
		appTokenScreenCodeMapLock.RUnlock()

		// save the screen code and the connection
		appTokenScreenCodeMapLock.Lock()
		screenCodeConnectionMap[code] = conn
		appTokenScreenCodeMapLock.Unlock()

		fmt.Printf("Opened WS: %s\n", code)

		// send the unique code to web client
		err := sendWsDataByConn(conn, WsMessage{"UniqueCode", code})
		if err != nil {
			fmt.Println(err)
		}

		for {
			msg, op, err := wsutil.ReadClientData(conn)
			if err != nil {
				fmt.Printf("Closing WS: %v\n", err)
				removeWsConnectionByCode(code)
				break
			}
			// do something with the message
			fmt.Printf("WS Message Received: %v, %v\n", msg, op)
		}
	}()
}

func removeWsConnectionByCode(code string) {
	screenCodeConnectionMapLock.Lock()
	delete(screenCodeConnectionMap, code)
	screenCodeConnectionMapLock.Unlock()
}

func sendWsDataByCode(code string, data interface{}) error {
	// get the connection
	screenCodeConnectionMapLock.RLock()
	conn, exists := screenCodeConnectionMap[code]
	screenCodeConnectionMapLock.RUnlock()
	if !exists {
		return fmt.Errorf("No connection record for code %s exists", code)
	}
	return sendWsDataByConn(conn, data)
}

func sendWsDataByConn(conn net.Conn, data interface{}) error {
	bytes, err := json.Marshal(data)
	if err != nil {
		return err
	}

	return wsutil.WriteServerMessage(conn, ws.OpText, bytes)
}
