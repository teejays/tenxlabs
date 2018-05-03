class TenXEvent {
	constructor(type, name, datetime, duration, presenters, judges, presentationTime, audienceFeedbackTime, judgeFeedbackTime) {
		
		this.type = type;
		this.name = name;
		this.datetime = datetime;
		this.duration = duration;

		this.presenters = presenters;
		this.judges = judges;
		
		this.presentationTime = presentationTime;
		this.audienceFeedbackTime = audienceFeedbackTime;
		this.judgeFeedbackTime = judgeFeedbackTime;

		// create subEvent
		subEvents = [];
		for (var i = 0; i < presenters.length; i++) {

			subEvents.push(new TenXSubEvent(presenters[i], judges, presentationTime, audienceFeedbackTime, judgeFeedbackTime));
		}
		this.subEvents = subEvents;
	}

	getSubEvents() {
		return this.subEvents;
	}
}

class TenXSubEvent {
	constructor(presenter, judges, presentationTime, audienceFeedbackTime, judgeFeedbackTime) {
		this.presenter = presenter;
		this.judges = judges;
		this.presentationTime = presentationTime;
		this.judgeFeedbackTime = judgeFeedbackTime;

		// Create timerEvents
		timerEvents = [];
		timerEvents.push(new TimerEvent("presentation", presenter, presentationTime));
		timerEvents.push(new TimerEvent("audience feedback", "", audienceFeedbackTime));

		for (var i = 0; i < judges.length; i++) {
			timerEvents.push(new TimerEvent("judge feedback", judges[i], judgeFeedbackTime));
		}
		this.timerEvents = timerEvents;

	}	

	getTimerEvents() {
		return this.timerEvents;
	}
}

class TimerEvent {
	constructor(type, description, time) {
		this.type = type;
		this.description = description;
		this.time = time;
	}	
}

var mockEvent1 = new TenXEvent("skills", "May Skills 10X", "2018-05-05 09:00:00", 3600, ["Abhay Sesha", "Supriya Mishra", "Darell Platz"], ["Tom Fuller", "Xuelan Zhang", "Nayan Busa"], 300, 120, 120);

var TexXEvents = [mockEvent1];

export default TexXEvents;



// /*   OLD  */

// var MockEvent = {
// 	EventId: 1,
// 	EventType: "Skills 10X",
// 	Name: "May Engineering 10X",
// 	Presenters: ["Abhay Sesha", "Supriya Mishra", "Darell Platz"],
// 	Judges: ["Tom Fuller", "Xuelan Zhang", "Nayan Busa"],
// 	PresentationTime: 300,
// 	AudienceFeedbackTime: 120,
// 	JudgeFeedbackTime: 120,
// };

// export default MockEvent;




// /*   OLD  */


// var Event = {
// 	EventId: 1,
// 	EventType: "Skills 10X",
// 	Name: "May Engineering 10X",
	
// 	SubEvents: [
// 	subEvent1, subEvent2, subEvent3
// 	],
// 	Judges: ["Tom Fuller", "Xuelan Zhang", "Nayan Busa"],
// 	PresentationTime: 300,
// 	AudienceFeedbackTime: 120,
// 	JudgeFeedbackTime: 120,
// };

// var subEvent1 = {
// 	Type: "Presenter",
// 	Presenter: "Abhay Sesha",
// 	Judges: ["Tom Fuller", "Xuelan Zhang", "Nayan Busa"],
// }

// var subEvent2 = {
// 	Type: "Presenter",
// 	Presenter: "Supriys Mishra"
// }
// var subEvent3 = {
// 	Presenter: "Darell Platz"
// }