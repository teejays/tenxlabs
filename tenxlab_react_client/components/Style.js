
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Colors and Fonts - collated for ease of changing
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var bgColor = '#FFF';
var mainColor = '#F06023';
var secondColor = '#A9A9A9';

var Style = {

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Global Styling
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	launch: {
		flex: 1,
    	justifyContent: 'center',
    	alignItems: 'center',
    	backgroundColor: mainColor
	},
	screen:{
		flex: 1,
    	//justifyContent: 'center',
    	alignItems: 'center',
    	backgroundColor: bgColor
	},
	scrollScreen:{
		flex: 1,
		backgroundColor: bgColor
	},
	title:{
		flex: 1,
		backgroundColor: mainColor,
		alignSelf: 'stretch',
    	textAlign: 'center',
    	paddingTop: 5,
    	paddingBottom: 10
	},
	section:{
		marginTop: 10,
		marginBottom: 10
	},
	center:{
		justifyContent: 'center',
    	alignItems: 'center',
	},
	textInput:{
		borderBottomColor: 'black',
		borderBottomWidth: 2,
		width: 200,
		textAlign: 'center'
	},
	row:{
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	iconCircle: {
	    width: 75,
	    height: 75,
	    borderRadius: 75/2,
	    backgroundColor: '#FFF',
	    padding: 30,
	    margin: 10
	},
	button: {
		backgroundColor: secondColor,
		padding: 10,
		marginLeft: 3,
		marginRight: 3
	},
	buttonText:{
		fontSize: 18,
		color: '#FFF'
	},
	sectionText: {
		marginTop: 10
	},
	left: {
		alignSelf: 'flex-start',
		marginLeft: 5
	},
	right: {
  		alignSelf: 'flex-end',
  		marginRight: 5
	},

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Font
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	h1:{
		fontSize: 24,
		fontWeight: 'bold',
		marginTop: 15
	},
	title: {
  		fontSize: 20
	},
	subtitle: {
  		fontSize: 12,
	},
	judgeSubtitle: {
  		fontSize: 12,
  		fontStyle: 'italic'
	},

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Alignment
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	alignRow: {
	    flexDirection: 'row',
	    justifyContent: 'space-between',
	    alignItems: 'center',
	  },
	  leftAlign: {
	    flex: 1,
	    marginLeft: 20,
	    flexDirection: 'row',
	    justifyContent: 'flex-start',
	  },
	  rightAlign: {
	    flex: 1,
	    marginRight: 20,
	    flexDirection: 'row',
	    justifyContent: 'flex-end',
	    alignItems: 'center',
	  },

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Control
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	remoteButton: {
		width: 100,
	    height: 60,
	    borderRadius: 100/2,
	    backgroundColor: 'red',
	    textAlign: 'center',
	    padding: 20,
	    margin: 5
	},

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Event
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	eventTitle: {
		fontSize: 32,
	},
	eventIcon: {
		width: 60,
		height: 60,
		borderRadius: 60/2,
		margin: 5
	},
	eventIconJudge: {
		width: 40,
		height: 40,
		borderRadius: 40/2,
		margin: 5
	},
	eventCode: {
		fontSize: 32,
		marginBottom: 20,
	},
	eventPanel: {
	    flex: 1,
	    backgroundColor: 'lightgray',
	    position: 'relative'
	},
	eventPanelIcon: {
		width: 120,
		height: 120,
		margin: 15
	},
	eventPanelControl: {
		justifyContent: 'space-around',
		alignItems: 'space-around'
	}

};

export default Style;
