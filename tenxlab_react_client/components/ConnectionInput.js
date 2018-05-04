/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* ConnectionInput
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import React, { Component } from 'react';
import {
  Platform,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableHighlight
} from 'react-native';
import Style from './Style';


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Constants
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* ConnectionInput Component
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

export default class ConnectionInput extends Component {
  
  constructor (props) {
    super(props);
    
    // define default states
    this.state = {
      code: 'CNTS'
    };

  }

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Internal Methods
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
  _spitCode = () => {
    console.log(this.state.code);
  }

  render() {

    // declare to be used in render
    const { code } = this.state;

    return (
      <View style={Style.center}>
        // text input + button - TODO: Make into a component
        <View style={[Style.center,Style.section]}>
          <TextInput
            style={[Style.textInput,Style.eventCode]}
            ref="code"
            onChangeText={(code) => this.setState({code})} 
            value={code} />
        </View>

        <View style={[Style.center,Style.section]}>
          <TouchableHighlight 
            style={Style.button}
            onPress={this._spitCode}
          >
            <Text style={Style.buttonText}>Connect</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
