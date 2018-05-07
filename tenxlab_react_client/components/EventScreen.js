/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* EventScreen.js
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableHighlight,
  Button
} from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';
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
      event: TenXEvents[0],
      visible: false,
      allowMomentum: true,
      showBackdrop: false
    };

  }

  capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  render () {

    // declare to be used in render
    const { event } = this.state;

    return (
      <View>

        // title
        <View style={[Style.center]}>
          <Text style={[Style.eventTitle]}>{this.capitalize(event.type + ' 10x')}</Text>
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
          <Button title='Start Event' onPress={() => this.setState({visible: true})} />
          <SlidingUpPanel
            visible={this.state.visible}
            showBackdrop={this.state.showBackdrop}
            allowMomentum={this.state.allowMomentum}
            onRequestClose={() => this.setState({visible: false})}>
            <View style={Style.eventPanel}>
              <ConnectionInput/>
            </View>
          </SlidingUpPanel>
        </View>

      </View>
    )
  }
}