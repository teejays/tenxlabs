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

  constructor (props) {
    super(props);
    this.props.navigation.navigate('Event');    
  }

  static navigationOptions = {
    header: null,
  };

  render () {
    return (
      <View style={Style.launch}>
        <Image
          style={{height:200}}
          resizeMode={'contain'}
          source={require('../images/loading.gif')}
        />
      </View>
    )
  }
}