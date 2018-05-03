/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Form
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  Button,
  ListView,
  TouchableOpacity
} from 'react-native';
import Style from './Style'
import ValidationComponent from 'react-native-form-validator'
import DateTimePicker from 'react-native-modal-datetime-picker';


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Constants
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Form Component
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

export default class TenXForm extends ValidationComponent {
  
  constructor (props) {
    super(props);
    
    // define default states
    this.state = {
      eventName: "",
      participantInput: "",
      participants: [],
      judgeInput: "",
      judges: [],
      isDateTimePickerVisible: false
    };

  }

  // setters?
  _setDateTime = (datetime) => this.setState({ eventDatetime: datetime });
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log(date);
    this._hideDateTimePicker();
  };

  _submitForm = () => {
    const { 
        eventName,
        participantInput,
        participants,
        judgeInput,
        judges 
    } = this.state;
    participants.push(participantInput);
    judges.push(judgeInput);
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={Style.h1}>
          SET UP 10X
          {'\n'}
        </Text>

        <Text>Name of Event:</Text>
        <TextInput
          style={Style.textInput}
          ref="eventName"
          onChangeText={(eventName) => this.setState({eventName})} 
          value={this.state.eventName} />
        <Text>{'\n'}</Text>

        <TouchableOpacity onPress={this._showDateTimePicker}>
          <Text>When is the event?</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          mode="datetime"
        />

        <Text>{'\n'}</Text>

        <Text>Presenters:</Text>
        <TextInput 
          style={Style.textInput} 
          ref="participantInput" 
          onChangeText={(participantInput) => this.setState({participantInput})} 
          value={this.state.participantInput} />

        <Text>{'\n'}</Text>

        <Text>Judges:</Text>
        <TextInput 
          style={Style.textInput} 
          ref="judgeInput" 
          onChangeText={(judgeInput) => this.setState({judgeInput})} 
          value={this.state.judgeInput} />

        <Text>{'\n'}</Text>

        <TouchableHighlight onPress={this._submitForm.bind()}>
            <Text>Submit</Text>
        </TouchableHighlight>

        <Text>{'\n'}</Text>

        <Text> 
          Event Name:{'\n'}
           {this.state.eventName}{'\n'}{'\n'}
           {this.state.eventDatetime}{'\n'}{'\n'}
          Presenters: {'\n'}
           {this.state.participants.map(
            function(object, key) {
              return <Text>{key+1}) {object}{'\n'}</Text>
            })}{'\n'}{'\n'}
          Judges: {'\n'}
           {this.state.judges.map(
            function(object, key) {
              return <Text>{key+1}) {object}{'\n'}</Text>
            })}
        </Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});