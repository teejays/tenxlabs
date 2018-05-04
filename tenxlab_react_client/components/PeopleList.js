/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* PeopleList
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableHighlight
} from 'react-native';
import Style from './Style';
import People from '../provider/MockPeople'


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Constants
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* PeopleList Component
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

export default class PeopleList extends Component {
  
  constructor (props) {
    super(props);
    
    // define default states
    this.state = {
      people: People
    };

  }

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Internal Methods
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  render() {

    // declare to be used in render
    const { people } = this.state;

    return (
      <View style={[Style.row, Style.center]}>
        {people.map(
          function(object, key) {
            var url = 'https://apps.api.nextjump.com/v1/topten/user/'+object.id+'/image';
            return <Image
              style={Style.eventIcon}
              resizeMode={'contain'}
              source={{uri: url}}
            />
          })}
      </View>
    );
  }
}
