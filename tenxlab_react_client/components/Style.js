
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Colors and Fonts - collated for ease of changing
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var mainColor = '#e6e6e6';
var secondColor = '#A9A9A9';

var Style = {

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Global Styling
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	screen:{
		flex: 1,
    	justifyContent: 'center',
    	alignItems: 'center',
    	backgroundColor: mainColor,
	},
	scrollScreen:{
		flex: 1,
		backgroundColor: mainColor
	},
	section:{
		marginTop: 20,
		marginBottom: 20
	},
	center:{
		justifyContent: 'center',
    	alignItems: 'center',
    	marginTop: 10
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
	    width: 100,
	    height: 100,
	    borderRadius: 100/2,
	    backgroundColor: '#FFF',
	    padding: 30,
	    margin: 10
	},
	button: {
		backgroundColor: secondColor,
		padding: 10
	},
	buttonText:{
		fontSize: 18,
		color: '#FFF'
	},

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Font
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	h1:{
		fontSize: 24,
		fontWeight: 'bold',
		marginTop: 15
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
	}

};

export default Style;
