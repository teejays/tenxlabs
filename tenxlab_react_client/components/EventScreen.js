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
import Title from './Title'
import Style from './Style'
import Moment from 'moment'
import PeopleList from './PeopleList'
import ConnectionInput from './ConnectionInput'
import TenXEvents from '../provider/MockEvent'


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
        <View style={[Style.center]}>
          <Title text={event.type + ' 10x'}></Title>
          <Text>
            {'\n'}
            { Moment(event.datetime).format('dddd, MMM d @ hh:mm a') }
            {'\n\n'}
          </Text>
        </View>

        // presenters
        <View style={[Style.center,Style.section]}><Text>Presenters</Text></View>
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
        <View style={[Style.center,Style.section]}><Text>Judges</Text></View>
        <View style={[Style.center, Style.row]}>
           {event.judges.map(
            function(object, key) {
              var url = 'https://apps.api.nextjump.com/v1/topten/user/'+object.id+'/image';
              return <Image
                style={Style.eventIconJudge}
                resizeMode={'contain'}
                source={{uri: url}}
              />
            })}
        </View>

        <View style={Style.section}> 
          <ConnectionInput/>
        </View>

      </ScrollView>
    )
  }
}