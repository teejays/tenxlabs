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
import axios from 'axios';


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
        code: "",
        appToken: "",
        eventId: 1
    }
    
    this.connectServer = this.connectServer.bind(this);
    this.sendStart = this.sendStart.bind(this);
    this.sendPause = this.sendPause.bind(this);
    this.sendNext = this.sendNext.bind(this);
    this.sendPrevious = this.sendPrevious.bind(this);

  }

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Methods
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  setAppToken = (response) => this.setState({ appToken: response });

  connectServer() {
    const { code } = this.state;
    axios.post('http://34.211.129.88:80/screen/connect',{
      "code": code,
      "eventId":1
    })
      .then(response => this.setAppToken(response.data) )
      .catch(error => console.log(error));
  }

  sendStart() {
    const { appToken } = this.state;
    console.log(appToken);
    axios.post('http://34.211.129.88:80/screen/control',{
      "appToken": appToken,
      "action": 'start'
    })
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

  sendPause() {
    const { appToken } = this.state;
    axios.post('http://34.211.129.88:80/screen/control',{
      "appToken": appToken,
      "action": 'pause'
    })
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

  sendNext() {
    const { appToken } = this.state;
    axios.post('http://34.211.129.88:80/screen/control',{
      "appToken": appToken,
      "action": 'next'
    })
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

  sendPrevious() {
    const { appToken } = this.state;
    axios.post('http://34.211.129.88:80/screen/control',{
      "appToken": appToken,
      "action": 'previous'
    })
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

  render() {

    // declare to be used in render
    const { code, appToken, action } = this.state;

    return (
      <View style={Style.center}>
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
            onPress={this.connectServer.bind()}
          >
            <Text style={Style.buttonText}>Connect</Text>
          </TouchableHighlight>
        </View>

        <View style={[Style.center,Style.row]}>

          <TouchableHighlight 
            style={Style.button}
            onPress={this.sendStart}
          >
            <Text style={Style.buttonText}>Start</Text>
          </TouchableHighlight>

          <TouchableHighlight 
            style={Style.button}
            onPress={this.sendPause}
          >
            <Text style={Style.buttonText}>Pause</Text>
          </TouchableHighlight>

          <View style={Style.row}>
            <TouchableHighlight 
              style={Style.button}
              onPress={this.sendNext}
            >
              <Text style={Style.buttonText}>Next</Text>
            </TouchableHighlight>

            <TouchableHighlight 
              style={Style.button}
              onPress={this.sendPrevious}
            >
              <Text style={Style.buttonText}>Previous</Text>
            </TouchableHighlight>
          </View>


        </View>

      </View>
    );
  }
}
