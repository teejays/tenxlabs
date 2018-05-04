/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Remote
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import React, { Component } from 'react';
import {
  Platform,
  ScrollView,
  View,
  Text
} from 'react-native';
import Style from './Style';


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Constants
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Remote Component
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

export default class Remote extends Component {
  
  constructor (props) {
    super(props);
    
    // define default states
    this.state = {
      // whatever
    };

  }

  render() {

    return (
      <ScrollView style={Style.scrollScreen}>

        <View style={Style.center}>
          <Text style={Style.h1}>
            REMOTE
            {'\n'}
          </Text>
        </View>

        <View style={[Style.center,Style.row]}>
          <Text style={Style.remoteButton}>
            START
          </Text>

          <Text style={Style.remoteButton}>
            STOP
          </Text>
        </View>

        <View style={[Style.center,Style.row]}>
          <Text style={Style.remoteButton}>
            SKIP
          </Text>

          <Text style={Style.remoteButton}>
            PAUSE
          </Text>
        </View>

      </ScrollView>
    );
  }
}
