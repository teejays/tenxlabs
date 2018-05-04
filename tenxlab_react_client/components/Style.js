
// Ease of whatever
var mainColor = '#e6e6e6';

var Style = {

// Global Styling
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
	center:{
		justifyContent: 'center',
    	alignItems: 'center',
    	marginTop: 10
	},
	h1:{
		fontSize: 24,
		fontWeight: 'bold',
		marginTop: 15
	},
	textInput:{
		borderBottomColor: 'black',
		borderBottomWidth: 2,
		width: 200
	},
	row:{
		flexDirection: 'row'
	},
	iconCircle: {
	    width: 100,
	    height: 100,
	    borderRadius: 100/2,
	    backgroundColor: '#FFF',
	    padding: 30,
	    margin: 10
	},

// Remote
	remoteButton: {
		width: 100,
	    height: 60,
	    borderRadius: 100/2,
	    backgroundColor: 'red',
	    textAlign: 'center',
	    padding: 20,
	    margin: 5
	}

};

export default Style;
