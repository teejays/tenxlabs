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


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Constants
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Home Screen Component
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// props should be the event details
export default class TenXEvent extends Component {
  
  constructor (props) {
    super(props);
    
    // define default states
    this.state = {eventDetails: props.eventDetails};

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
            function(object, i) {
              return <Text>{i+1}.{object}{'\n'}</Text>
            })}
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
});