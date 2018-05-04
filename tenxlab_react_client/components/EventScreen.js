/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* EventScreen.js
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableHighlight
} from 'react-native';
import PeopleList from './PeopleList'
import Style from './Style'
import Moment from 'moment'
import ConnectionInput from './ConnectionInput'
import TenXEvents from '../provider/MockEvent'
import CapitalizedText from './CapitalizedText'


export default class EventScreen extends Component {

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Constructor
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
  constructor (props) {
    super(props);
    
    // define default states
    this.state = {
      event: TenXEvents[0]
    };

  }

  render () {

    // declare to be used in render
    const { event } = this.state;

    return (
      <ScrollView style={Style.scrollScreen}>

        // title
        <View style={Style.center}>
          <CapitalizedText style={Style.h1}>{event.type + ' 10x'}</CapitalizedText>
          <Text>
            { Moment(event.datetime).format('dddd, MMM d @ hh:mm a') }
          </Text>
        </View>

        // presenters
        <View style={Style.center}><Text>Presenters</Text></View>
        <View style={[Style.center, Style.row]}>
           {event.presenters.map(
            function(object, key) {
              var url = 'https://apps.api.nextjump.com/v1/topten/user/'+object.id+'/image';
              return <Image
                style={Style.eventIcon}
                resizeMode={'contain'}
                source={{uri: url}}
              />
            })}
        </View>

        // judges
        <View style={Style.center}><Text>Judges</Text></View>
        <View style={[Style.center, Style.row]}>
           {event.judges.map(
            function(object, key) {
              var url = 'https://apps.api.nextjump.com/v1/topten/user/'+object.id+'/image';
              return <Image
                style={Style.eventIcon}
                resizeMode={'contain'}
                source={{uri: url}}
              />
            })}
        </View>

        <ConnectionInput/>

      </ScrollView>
    )
  }
}