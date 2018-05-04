/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* LaunchScreen.js
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import React, { Component } from 'react';
import {
  View,
  Image,
  Text
} from 'react-native';
import Style from './Style'


export default class LaunchScreen extends Component {
  componentDidMount() {    
    // hardcode loading delay
    this.props.navigation.navigate('Control');
    // setTimeout(function(navigation){
      
    // }, 1500); 
  }
  render () {
    return (
      <View style={Style.screen}>
        <Image
          style={{height:200}}
          resizeMode={'contain'}
          source={require('../images/loading.gif')}
        />
        <Image
          style={{width:150}}
          resizeMode={'contain'}
          source={require('../images/nextjump.png')}
        />
      </View>
    )
  }
}