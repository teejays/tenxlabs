package main

import (
	"fmt"
	"github.com/teejays/gofiledb"
	"time"
)

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
* E N T I T Y 										  *
* * * * * * * * * * * * * * * * * * * * * * * * * * * */

type (
	Event struct {
		Id            int
		EventType     string
		Name          string
		DatetimeStart time.Time

		// People
		Presenters []User
		Judges     []User

		// Durations
		EventDuration            time.Duration
		PresentationDuration     time.Duration
		AudienceFeedbackDuration time.Duration
		JudgeFeedbackDuration    time.Duration

		// SubEntities
		SubEvents []SubEvent
	}

	User struct {
		Id   int64
		Name string
	}

	SubEvent struct {
		// People
		Presenter User
		Judges    []User

		// Durations
		PresentationDuration     time.Duration
		AudienceFeedbackDuration time.Duration
		JudgeFeedbackDuration    time.Duration

		// TimerEvents
		TimerEvents []TimerEvent
	}

	TimerEvent struct {
		ActivityType string
		Title        string
		Duration     time.Duration
	}
)

func NewEvent(eventType, name string, datetimeStart time.Time, presenters, judges []User, eventDuration, presentationDuration, audienceFeedbackDuration, judgeFeedbackDuration time.Duration) *Event {

	var e Event
	e.EventType = eventType
	e.Name = name
	e.DatetimeStart = datetimeStart

	e.Presenters = presenters
	e.Judges = judges

	e.EventDuration = eventDuration
	e.PresentationDuration = presentationDuration
	e.AudienceFeedbackDuration = audienceFeedbackDuration
	e.JudgeFeedbackDuration = judgeFeedbackDuration

	var subEvents []SubEvent
	for _, presenter := range e.Presenters {
		var s SubEvent
		s.Presenter = presenter
		s.Judges = e.Judges
		s.PresentationDuration = e.PresentationDuration
		s.AudienceFeedbackDuration = e.AudienceFeedbackDuration
		s.JudgeFeedbackDuration = e.JudgeFeedbackDuration

		var timerEvents []TimerEvent
		timerEvents = append(timerEvents, TimerEvent{"Presentation", s.Presenter.Name, s.PresentationDuration})
		timerEvents = append(timerEvents, TimerEvent{"Feedback", "Audience Feeback", s.AudienceFeedbackDuration})
		timerEvents = append(timerEvents, TimerEvent{"Feedback", "Judge Scoring", (15 * time.Second)})
		for _, judge := range s.Judges {
			timerEvents = append(timerEvents, TimerEvent{"Judge Feedback", judge.Name, s.JudgeFeedbackDuration})
		}
		s.TimerEvents = timerEvents

		subEvents = append(subEvents, s)
	}
	e.SubEvents = subEvents

	return &e
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
* M O C K  DA T A 									  *
* * * * * * * * * * * * * * * * * * * * * * * * * * * */
var mockPresenters []User = []User{
	{Id: 1, Name: "Abhay Sesha"},
	{Id: 2, Name: "Supriya Mishra"},
	{Id: 3, Name: "Darrell Platz"},
}

var mockJudges []User = []User{
	{Id: 4, Name: "Tom Fuller"},
	{Id: 5, Name: "Xuelan Zhang"},
	{Id: 6, Name: "Nayan Busa"},
}
var mockEvent1 *Event = NewEvent("Engineering 10x", "Engineering 10x", time.Now(), mockPresenters, mockJudges, (1 * time.Hour), (5 * time.Minute), (2 * time.Minute), (2 * time.Minute))

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
* E V E N T S										  *
* * * * * * * * * * * * * * * * * * * * * * * * * * * */

var eventsMap map[int]*Event

func setupEventsMap() error {
	db := gofiledb.GetClient()
	exists, err := db.GetStructIfExists("storage", "tenxlab_events_map", &eventsMap)
	if err != nil {
		return err
	}
	if !exists {
		eventsMap = make(map[int]*Event)
	}
	return nil
}

func addEvent(e Event) error {
	// validate event
	err := validateEvent(e)
	if err != nil {
		return err
	}
	// we should give this an event an id
	// get the max id of the existing events and increment
	var maxId int
	for _, e := range eventsMap {
		if e.Id > maxId {
			maxId = e.Id
		}
	}
	// new id should be 1 + existing max id
	e.Id = maxId + 1
	eventsMap[e.Id] = &e

	// save the new events map in the db
	db := gofiledb.GetClient()
	err = db.SetStruct("storage", "tenxlab_events_map", eventsMap)
	if err != nil {
		return err
	}

	return nil

}

func validateEvent(e Event) error {
	if e.EventType == "" {
		return fmt.Errorf("invalid event type: %s", e.EventType)
	}

	if len(e.Presenters) < 1 {
		return fmt.Errorf("no presenters provided")
	}

	if len(e.Judges) < 1 {
		return fmt.Errorf("no presenters provided")
	}

	if e.PresentationDuration < 1000 {
		return fmt.Errorf("invalid presentation duration: %d", e.PresentationDuration)
	}

	return nil

}

func getEvents() []*Event {
	var events []*Event
	for _, e := range eventsMap {
		events = append(events, e)
	}
	return events
}

func getEventById(eventId int) (*Event, error) {
	e, exists := eventsMap[eventId]
	if !exists {
		return nil, fmt.Errorf("No event exists for event id %d", eventId)
	}
	return e, nil
}
