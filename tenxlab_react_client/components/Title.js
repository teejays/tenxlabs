/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Title.js
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import Style from './Style'
import CapitalizedText from './CapitalizedText'


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Title Component
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

export default class Title extends Component {
  constructor (props) {
    console.log(props)
    super(props);

    // define default states
    this.state = {
      text: props.text ? props.text : '',
    };
  }
  render() {
    const { text } = this.state;
    return (
      <View style={[Style.title,Style.center]}>
        <CapitalizedText style={Style.h1}>{text}</CapitalizedText>
      </View>
    );
  }
}