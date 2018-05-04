/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* EventScreen.js
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  ScrollView,
  TouchableHighlight
} from 'react-native';
import Style from './Style'
import Moment from 'moment'
import Remote from './Remote'
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
      event: TenXEvents[0],
      code: 'CNTS'
    };

  }

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Internal Methods
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
  _spitCode = () => {
    console.log(this.state.code);
  }

  render () {

    // declare to be used in render
    const { event, code } = this.state;

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

        // judges
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

        // text input + button - TODO: Make into a component
        <View style={[Style.center,Style.section]}>
          <TextInput
            style={[Style.textInput,Style.eventCode]}
            ref="code"
            onChangeText={(code) => this.setState({code})} 
            value={code} />
        </View>

        <View style={[Style.center,Style.section]}>
          <TouchableHighlight 
            style={Style.button}
            onPress={this._spitCode}
          >
            <Text>Connect</Text>
          </TouchableHighlight>
        </View>

      </ScrollView>
    )
  }
}