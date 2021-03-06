/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Remote
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import Style from './Style';


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Constants
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Remote Component
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

export default class Remote extends Component {
  
  constructor (props) {
    super(props);
    
    // define default states
    this.state = {
      // whatever
    };

  }

  render() {

    return (
      <View style={Style.center}>

        <TouchableHighlight 
          style={Style.button}
        >
          <Text style={Style.buttonText}>Start</Text>
        </TouchableHighlight>

        <View style={Style.row}>
          <TouchableHighlight 
            style={Style.button}
          >
            <Text style={Style.buttonText}>Next</Text>
          </TouchableHighlight>

          <TouchableHighlight 
            style={Style.button}
          >
            <Text style={Style.buttonText}>Pause</Text>
          </TouchableHighlight>
        </View>


      </View>
    );
  }
}
