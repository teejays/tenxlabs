/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Request.js
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import React, { Component } from 'react';

import {
    Text, 
    TouchableHighlight, 
    View
} from 'react-native';
import axios from 'axios';
import Style from './Style';

export default class Request extends Component {

    constructor (props) {
      super(props);

      this.state = {
        code: props.code ? props.code : "",
        text: props.text ? props.text : "YO",
        eventId: props.eventId ? props.eventId : 1
      }
      this.makeRequest = this.makeRequest.bind(this);
    }

    makeRequest() {
      axios.get('http://localhost:3000/events')
        .then(response => console.log(response))
    }

    render () {
      const { 
        code, 
        text 
      } = this.state;
      return (
        <View style={Style.center}>
          <TouchableHighlight style={Style.button} onPress={this.makeRequest}>
            <Text style={Style.buttonText}>{ text }</Text>
          </TouchableHighlight>
        </View>
      )
    }

}