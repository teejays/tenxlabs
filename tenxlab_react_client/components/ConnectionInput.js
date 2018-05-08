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
  TouchableHighlight,
  KeyboardAvoidingView,
  Image
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
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
        margin: -120,
        code: "",
        appToken: "",
        eventId: 1,
        connected: false,
        paused: true,
        startAction: 'start'
    }
    
    this.connectServer = this.connectServer.bind(this);
    this.sendStart = this.sendStart.bind(this);
    this.sendPause = this.sendPause.bind(this);
    this.sendNext = this.sendNext.bind(this);
    this.sendPrev = this.sendPrev.bind(this);
  }

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Methods
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  _keyboardWillShow(e) {
    this.setState({margin: -330});
  }
  _keyboardWillHide(e) {
    this.setState({margin: -220});
  }

  setAppToken = (response) => this.setState({ appToken: response });

  connectServer() {
    const { code } = this.state;
    axios.post('http://34.211.129.88:3000/screen/connect',{
      "code": code,
      "eventId":2
    })
      .then(response => {
        this.setAppToken(response.data);
        if(response.status == 200){
          this.setState({connected: true})
        }
      })
      .catch(error => console.log(error));
  }

  sendStart() {
    const { appToken, startAction } = this.state;
    
    axios.post('http://34.211.129.88:3000/screen/control',{
      "appToken": appToken,
      "action": startAction
    })
      .then(response => {
        console.log(response);
        if(response.status == 200){
          this.setState({paused: false})
          this.setState({startAction: 'resume'})
        }
      })
      .catch(error => console.log(error));
  }

  sendPause() {
    const { appToken } = this.state;
    axios.post('http://34.211.129.88:3000/screen/control',{
      "appToken": appToken,
      "action": 'pause'
    })
      .then(response => {
        console.log(response);
        if(response.status == 200){
          this.setState({paused: true})
        }
      })
      .catch(error => console.log(error));
  }

  sendNext() {
    const { appToken } = this.state;
    axios.post('http://34.211.129.88:3000/screen/control',{
      "appToken": appToken,
      "action": 'next'
    })
      .then(response => {
        console.log(response);
        if(response.status == 200){
          this.setState({paused: false})
        }
      })
      .catch(error => console.log(error));
  }

  sendPrev() {
    const { appToken } = this.state;
    axios.post('http://34.211.129.88:3000/screen/control',{
      "appToken": appToken,
      "action": 'previous'
    })
      .then(response => {
        console.log(response);
        if(response.status == 200){
          this.setState({paused: false})
        }
      })
      .catch(error => console.log(error));
  }

  _renderChevron(){
    return(
      <View style={Style.center}>
        <TouchableHighlight>
          <Entypo
            name="chevron-small-down"
            size={40}
          />
        </TouchableHighlight>
      </View>
    );
  }

  _renderControl(code, appToken, action) {
      if (!this.state.connected) {
          return (
            <View style={[Style.center,Style.section]}>
              <Text style={Style.sectionText}>Connect to Screen{'\n'}</Text>
              <View style={Style.section}>
              <TouchableHighlight style={Style.button}>
                <Text style={Style.buttonText}>SCAN</Text>
              </TouchableHighlight>
              </View>
              <View>
                <Text>OR{'\n'}</Text>
              </View>
              <View>
                <TextInput
                  style={[Style.textInput,Style.eventCode]}
                  ref="code"
                  onChangeText={(code) => this.setState({code})} 
                  value={code} />
              </View>
              <TouchableHighlight 
                style={Style.button}
                onPress={this.connectServer.bind()}
              >
                <Text style={Style.buttonText}>ENTER CODE</Text>
              </TouchableHighlight>
            </View>
          );
      } 

      if (this.state.connected){
        return (
          <View style={Style.center}>
            <Text style={Style.sectionText}></Text>
            <View style={[Style.row, Style.eventPanelControl]}>
              {this._renderPrev()}
              {this._renderPlay()}
              <TouchableHighlight 
                  style={Style.controlButton}
                  onPress={this.sendNext}
                >
                <Entypo
                  name="controller-next"
                  size={40}
                />
              </TouchableHighlight>
            </View>
          </View>
        )
      }
  }

  _renderPrev() {
    return (
      <TouchableHighlight 
        style={Style.controlButton}
        onPress={this.sendPrev}
      >
        <Entypo
          name="controller-jump-to-start"
          size={40}
        />
      </TouchableHighlight>
    )
  }

  _renderPlay() {
    if (this.state.paused){
      return (
        <TouchableHighlight 
          style={Style.controlButton}
          onPress={this.sendStart}
        >
          <Entypo
            name="controller-play"
            size={40}
          />
        </TouchableHighlight>
      )
    }
    if (!this.state.paused){
      return (
        <TouchableHighlight 
          style={Style.controlButton}
          onPress={this.sendPause}
        >
          <Entypo
            name="controller-paus"
            size={40}
          />
        </TouchableHighlight>
      )
    }
  }

  render() {

    // declare to be used in render
    const { code, appToken, action, margin } = this.state;

    return (
      <KeyboardAvoidingView style={[Style.overlayScreen]}>
        {this._renderChevron()}  
        {this._renderControl(code, appToken, action)}  
      </KeyboardAvoidingView>
    );
  }
}
