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
import axios from 'axios'
import { StackNavigator } from 'react-navigation'


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

    //this.getEvents = this.getEvents.bind(this);
    this.logEvents = this.logEvents.bind(this);
    //this.getEvents();
  }

  capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  getEvents() {
    axios.get('http://34.211.129.88:3000/event')
      .then(response => {
        if(response.status == 200){
          this.setState({event: response.data[1]})
        }
      })
      .catch(error => console.log(error));
  }

  logEvents() {
    console.log(this.state.event);
  }

  // navigation options
  static navigationOptions =
    {
      title: 'Run 10x',
      headerStyle: {
        backgroundColor: '#F06023'
      },
      headerTintColor: '#fff',
      headerRight:<Text style={{color:'#fff',marginRight:20}}>Edit</Text>
    };

  render () {

    // declare to be used in render
    const { event } = this.state;

    // add to judgeArray
    var judgeArray = [];
    event.Judges.map((object, key) => {
      judgeArray.push(object.Name)
    })


    return (
      <View style={Style.screen}>

        <TouchableHighlight onPress={this.logEvents}>
          <Text></Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={this.getEvents}>
          <Text></Text>
        </TouchableHighlight>

        // title
        <View style={[Style.center]}>
          <Text style={Style.title}>{this.capitalize(event.Name)}</Text>
          <Text style={[{textAlign:'center'}]}>
            {'\n'}
            { Moment(event.DatetimeStart).format('dddd, MMM d') }
            {'\n'}
            { Moment(event.DatetimeStart).format('hh:mm a') }
            {'\n\n'}
          </Text>
        </View>


        // presenters
        <View style={[Style.center,Style.section]}>
          <View style={Style.alignRow}>
            <View style={Style.leftAlign}>
              <Text style={[{fontWeight:'bold'}]}>Presenters</Text>
            </View>
            <View style={Style.rightAlign}>
              <Text>3 minutes each</Text>
            </View>
          </View>
          <View style={[Style.row,Style.section]}>
          {event.Presenters.map((object, key) => {
            var url = 'https://apps.api.nextjump.com/v1/topten/user/'+object.Id+'/image';
             return (
               <Image
                style={Style.eventIcon}
                resizeMode={'contain'}
                source={{uri: url}}
                key={key}/>
             );
          })}
          </View>
        </View>

        // audience feedback
        <View style={[Style.center,Style.section]}>
          <View style={Style.alignRow}>
            <View style={Style.leftAlign}>
              <Text style={[{fontWeight:'bold'}]}>Audience Feedback</Text>
            </View>
            <View style={Style.rightAlign}>
              <Text>2 minutes</Text>
            </View>
          </View>
        </View>

        // judges
        <View style={[Style.center,Style.section]}>
          <View style={Style.alignRow}>
            <View style={Style.leftAlign}>
              <Text style={[{fontWeight:'bold'}]}>Judges</Text>
            </View>
            <View style={Style.rightAlign}>
              <Text>2 minutes each</Text>
            </View>
          </View>
          <View style={[Style.center,Style.section]}>
            <Text style={Style.judgeSubtitle}>{ judgeArray.join(', ') }</Text>
          </View>
        </View>
        
        
        <View style={Style.section}> 
          <Button title='Start Event' onPress={() => this.setState({visible: !this.visible})} />
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