/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Request.js
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import React, { Component } from 'react';

import {
    Text, 
    TouchableHighlight, 
    View
} from 'react-native';
import axios from 'axios'


export default class Request extends Component {

    constructor (props) {
      super(props);

      this.state = {
        code: props.code
      }
      this.makeRequest = this.makeRequest.bind(this);
    }

    makeRequest() {
      axios.get('https://api.github.com/users/ninasabado')
        .then(response => console.log(response))
    }

    render () {
      return (
        <View>
          <TouchableHighlight onPress={this.makeRequest}>
            <Text>GO CALL API</Text>
          </TouchableHighlight>
        </View>
      )
    }

}