/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* SetUpScreen.js
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import React, { Component } from 'react';
import {
  Text,
  View,
  Button
} from 'react-native';
import Form from './Form'

export default class SetUpScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Form/>
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}