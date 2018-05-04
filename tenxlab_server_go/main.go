package main

import (
	"encoding/json"
	"fmt"
	//"golang.org/x/net/websocket"
	//"io"
	"net"
	"net/http"

	"github.com/gobwas/ws"
	"github.com/gobwas/ws/wsutil"
)

// This example demonstrates a trivial echo server.
func main() {
	http.HandleFunc("/ws", handlerWs)

	http.HandleFunc("/events", handlerGetEvents)

	fmt.Println("Listening for requests..")
	err := http.ListenAndServe(":3000", nil)
	if err != nil {
		panic("ListenAndServe: " + err.Error())
	}
}

/* H A N D L E R S */

func handlerGetEvents(w http.ResponseWriter, r *http.Request) {
	events := getEvents()
	bytes, err := json.Marshal(events)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return

	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(bytes)
}

// map[uniqueCode]*websocket.Conn
// func getUniqueCode
var codeConnectionMap map[string]net.Conn

func getUniqueCode() string {
	return "KHGHTS"
}

func init() {
	codeConnectionMap = make(map[string]net.Conn)
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

		// get code for the web client and store it in the map
		code := getUniqueCode()
		if _, exists := codeConnectionMap[code]; exists {
			panic("the code is already in use")
		}
		codeConnectionMap[code] = conn

		// send the unique code to web client
		err := sendWsDataByConn(conn, WsMessage{"UniqueCode", code})
		if err != nil {
			panic(err)
		}

		for {
			msg, op, err := wsutil.ReadClientData(conn)
			if err != nil {
				panic(err)
			}
			err = wsutil.WriteServerMessage(conn, op, msg)
			if err != nil {
				panic(err)
			}
		}
	}()
}

func sendWsDataByCode(code string, data interface{}) error {
	// get the connection
	conn, exists := codeConnectionMap[code]
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
