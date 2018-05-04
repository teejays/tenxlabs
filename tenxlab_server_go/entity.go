package main

import (
	"time"
)

type Event struct {
	EventId       int
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

type User struct {
	Id   int64
	Name string
}

type SubEvent struct {
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

type TimerEvent struct {
	ActivityType string
	Title        string
	Duration     time.Duration
}

func NewEvent(eventId int, eventType, name string, datetimeStart time.Time, presenters, judges []User, eventDuration, presentationDuration, audienceFeedbackDuration, judgeFeedbackDuration time.Duration) *Event {

	var e Event
	e.EventId = eventId
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
		for _, judge := range s.Judges {
			timerEvents = append(timerEvents, TimerEvent{"Judge Feedback", judge.Name, s.JudgeFeedbackDuration})
		}
		s.TimerEvents = timerEvents

		subEvents = append(subEvents, s)
	}
	e.SubEvents = subEvents

	return &e
}

var mockEvent1 *Event

func init() {
	mockPresenters := []User{
		User{Id: 1, Name: "Abhay Sesha"},
		User{Id: 2, Name: "Supriya Mishra"},
		User{Id: 3, Name: "Darrell Platz"},
	}
	mockJudges := []User{
		User{Id: 4, Name: "Tom Fuller"},
		User{Id: 5, Name: "Xuelan Zhang"},
		User{Id: 6, Name: "Nayan Busa"},
	}
	mockEvent1 = NewEvent(1, "Engineering 10x", "Engineering 10x", time.Now(), mockPresenters, mockJudges, (1 * time.Hour), (5 * time.Minute), (2 * time.Minute), (2 * time.Minute))
}

func getEvents() []*Event {
	return []*Event{mockEvent1}
}
