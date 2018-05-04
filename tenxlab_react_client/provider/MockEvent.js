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

class Person {
	constructor(name, id){
		this.name = name;
		this.id = id;
	}
}

var abhay = new Person("Abhay Sesha", "67713173");
var supriya = new Person("Supriya Mishra", "67894438");
var darrell = new Person("Darell Platz", "79149169");
var tom = new Person("Tom Fuller", "1091147");
var xuelan = new Person("Xuelan Zhang", "45423186");
var nayan = new Person("Nayan Busa", "21046359");

var mockEvent1 = new TenXEvent("skills", "May Skills 10X", "2018-05-05 09:00:00", 3600, [abhay, supriya, darrell], [tom, xuelan, nayan], 300, 120, 120);

var TenXEvents = [mockEvent1];

export default TenXEvents;






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