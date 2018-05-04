import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  ScrollView
} from 'react-native';
import Style from './Style'
import Moment from 'moment'
import TenXRemote from './TenXRemote'
import TenXEvents from '../provider/MockEvent'


export default class EventScreen extends Component {

  // constructor
  constructor (props) {
    super(props);
    
    // define default states
    this.state = {
      event: TenXEvents[0],
      code: 'CNTS'
    };

  }

  render () {
    const { event, code } = this.state;

    return (
      <ScrollView style={Style.scrollScreen}>
        <View style={Style.center}>
          <Text style={Style.h1}>
            { event.type } 10x
          </Text>
          <Text>
            { Moment(event.datetime).format('dddd, MMM d @ hh:mm a') }
          </Text>
        </View>

        <View style={[Style.center, Style.row]}>
          <Text>
            Presenters
          </Text>
           {event.presenters.map(
            function(object, key) {
              var url = 'https://apps.api.nextjump.com/v1/topten/user/'+object.uid+'/image';
              return <Image
                style={Style.eventIcon}
                resizeMode={'contain'}
                source={{uri: url}}
              />
            })}
        </View>

        <View style={[Style.center, Style.row]}>
          <Text>
            Judges
          </Text>
           {event.judges.map(
            function(object, key) {
              var url = 'https://apps.api.nextjump.com/v1/topten/user/'+object.uid+'/image';
              return <Image
                style={Style.eventIcon}
                resizeMode={'contain'}
                source={{uri: url}}
              />
            })}
        </View>

        <View style={[Style.center,Style.section]}>
          <TextInput
            style={[Style.textInput,Style.eventCode]}
            ref="code"
            onChangeText={(code) => this.setState({code})} 
            value={code} />
        </View>

      </ScrollView>
    )
  }
}