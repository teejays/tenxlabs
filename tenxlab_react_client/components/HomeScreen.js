/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* HomeScreen.js
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import Style from './Style'

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Constants
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Home Screen Component
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

type Props = {};
export default class HomeScreen extends Component<Props> {
  render() {
    return (
      <View style={Style.screen}>
        
        <Button
          title="Set Up A 10x"
          onPress={() => this.props.navigation.navigate('SetUp')}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});