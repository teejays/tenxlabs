/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* SetUpScreen.js
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  Button
} from 'react-native';
import Form from './Form'
import Title from './Title'
import Style from './Style'

export default class SetUpScreen extends Component {
  render() {
    return (
      <ScrollView style={Style.scrollScreen}>
        <Title text="Set Up 10x"></Title>
        <Form/>
      </ScrollView>
    );
  }
}