/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* ControlScreen.js -- probably won't be used
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import React, { Component } from 'react';
import {
  View,
  Image,
  Text
} from 'react-native';
import Style from './Style'
import Remote from './Remote'


export default class ControlScreen extends Component {
  render () {
    return (
      <View style={Style.screen}>
        <Image
          style={{width:150}}
          resizeMode={'contain'}
          source={require('../images/nextjump.png')}
        />
        <Remote/>
      </View>
    )
  }
}