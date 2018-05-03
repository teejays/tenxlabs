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
  Button,
  ListView
} from 'react-native';
import Timer from './Timer'


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Constants
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* TenXEvent Component
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// props should be the event details
export default class TenXEvent extends Component {
  
  constructor (props) {
    super(props);
    
    // define default states
    this.state = {
      eventDetails: props.eventDetails,
      isRunning: false,
    };

  }
  
  // function that runs when button is pressed
  toggleEventRunningStatus() {
    this.setState(previousState => {
        return { isRunning: !previousState.isRunning };
      });

    console.log("button pressed");
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.time}>
          Welcome to {this.state.eventDetails.Name}
        </Text>

        {'\n'}
        <Text> 
          Presenters: {'\n'} {'\n'}
           {this.state.eventDetails.Presenters.map(
            function(object, key) {
              return <Text>{key+1}.{object}{'\n'}</Text>
            })}
        </Text>

        <Button title={this.state.isRunning? "Pause": "Start"} color="#841584" onPress={this.toggleEventRunningStatus.bind(this)} />

        <Timer seconds="90" isRunning={this.state.isRunning}/>
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
});