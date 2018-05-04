/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* TenXRemote
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

export default class TenXRemote extends Component {
  
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

      </ScrollView>
    );
  }
}
