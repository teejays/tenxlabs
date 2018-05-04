/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* TenXForm
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  ScrollView,
  View,
  Button,
  ListView,
  TouchableOpacity,
  Image,
  Slider
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
      isDateTimePickerVisible: false,
      date: new Date(),
      duration: 60
    };

  }

  // setters?
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
  _setDateTime = (datetime) => this.setState({ date: datetime });

  _handleDatePicked = (date) => {
    console.log(date)
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

  _setTenX = (type) => this.setState({ eventName: type + ' 10x' });

  _change(value) {
    this.setState(() => {
      return {
        duration: parseFloat(value),
      };
    });
  }

  render() {

    const {
      duration,
      eventName,
      participantInput,
      participants,
      judgeInput,
      judges,
      date,
      isDateTimePickerVisible,
      eventDatetime
    } = this.state;

    return (
      <ScrollView style={Style.scrollScreen}>

        <View style={Style.center}>
          <Text style={Style.h1}>
            SET UP 10X
            {'\n'}
          </Text>
        </View>

        <View style={Style.center}>
          <View style={Style.row}>
              <Image
                style={Style.iconCircle}
                resizeMode={'contain'}
                source={require('../images/icon-revenue.png')}
              />
              <Image
                style={Style.iconCircle}
                resizeMode={'contain'}
                source={require('../images/icon-leadership.png')}
              />
              <Image
                style={Style.iconCircle}
                resizeMode={'contain'}
                source={require('../images/icon-product.png')}
              />
          </View>

          <View style={Style.row}>
              <Image
                style={Style.iconCircle}
                resizeMode={'contain'}
                source={require('../images/icon-sales.png')}
              />
              <Image
                style={Style.iconCircle}
                resizeMode={'contain'}
                source={require('../images/icon-engineering.png')}
              />
          </View>
        </View>

        <View style={Style.center}>
          <Text>Duration</Text>
          <Slider
            step={1}
            maximumValue={parseInt(100)}
            onValueChange={this._change.bind(this)}
            value={duration}
          />
          <Text>{duration} minutes</Text>
        </View>

        <View style={Style.center}>
          <TouchableOpacity onPress={this._showDateTimePicker}>
            <Text>When is the event?</Text>
          </TouchableOpacity>
          <DateTimePicker
            isVisible={isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
            mode="datetime"
          />
          <Text>{ date.toString() }</Text>
        </View>

        <Text>Name of Event:</Text>
        <TextInput
          style={Style.textInput}
          ref="eventName"
          onChangeText={(eventName) => this.setState({eventName})} 
          value={eventName} />
        <Text>{'\n'}</Text>

        <Text>{'\n'}</Text>

        <Text>Presenters:</Text>
        <TextInput 
          style={Style.textInput} 
          ref="participantInput" 
          onChangeText={(participantInput) => this.setState({participantInput})} 
          value={participantInput} />

        <Text>{'\n'}</Text>

        <Text>Judges:</Text>
        <TextInput 
          style={Style.textInput} 
          ref="judgeInput" 
          onChangeText={(judgeInput) => this.setState({judgeInput})} 
          value={judgeInput} />

        <Text>{'\n'}</Text>

        <TouchableHighlight onPress={this._submitForm.bind()}>
            <Text>Submit</Text>
        </TouchableHighlight>

        <Text>{'\n'}</Text>

        <Text> 
          Event Name:{'\n'}
           {eventName}{'\n'}{'\n'}
           {eventDatetime}{'\n'}{'\n'}
          Presenters: {'\n'}
           {participants.map(
            function(object, key) {
              return <Text>{key+1}) {object}{'\n'}</Text>
            })}{'\n'}{'\n'}
          Judges: {'\n'}
           {judges.map(
            function(object, key) {
              return <Text>{key+1}) {object}{'\n'}</Text>
            })}
        </Text>

      </ScrollView>
    );
  }
}
