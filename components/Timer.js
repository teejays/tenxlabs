/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Constants
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Home Screen Component
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

export default class Timer extends Component {
  constructor (props) {
    super(props);
    // define default states
    this.state = {
      secondsRemaining: props.seconds
    };

    // change state every second
    setInterval(() => {
      console.log(this.props.isRunning);
      if (this.props.isRunning) {
        this.setState(previousState => {
        return { secondsRemaining: previousState.secondsRemaining - 1 };
      });  
      }
      
    }, 1000);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.time}>
          {this.state.secondsRemaining}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  time: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: "bold",
    color: "red",
  },
});