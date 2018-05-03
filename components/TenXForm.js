/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Form
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  Button,
  ListView
} from 'react-native';
import ValidationComponent from '../node_modules/react-native-form-validator'

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Constants
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Form Component
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

export default class Form extends ValidationComponent {
  
  constructor (props) {
    super(props);
    
    // define default states
    this.state = {
      participantInput: "ENTER PARTICIPANT NAME HERE",
      participants: [],
      judgeInput: "ENTER JUDGE NAME HERE",
      judges: []
    };

  }

// something() {
//   console.log('SUBMITTED!');
//   console.log(this.state.participants);
//   //console.log('SUBMITTED!');

//   //this.state.participants.push(this.state.participantInput);

// }

submitParticipant = () => {
  const { participantInput, participants } = this.state;
  participants.push(participantInput);
}

submitJudge = () => {
  const { judgeInput, judges } = this.state;
  judges.push(judgeInput);
}


  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.text}>
          SET UP 10X
        </Text>

        <Text>{'\n'}</Text>

        <Text>Presenters:</Text>
        <TextInput ref="participantInput" onChangeText={(participantInput) => this.setState({participantInput})} value={this.state.participantInput} />

        <TouchableHighlight onPress={this.submitParticipant.bind()}>
            <Text>Submit</Text>
        </TouchableHighlight>

        <Text>{'\n'}</Text>

        <Text>Judges:</Text>
        <TextInput ref="judgeInput" onChangeText={(judgeInput) => this.setState({judgeInput})} value={this.state.judgeInput} />

        <TouchableHighlight onPress={this.submitJudge.bind()}>
            <Text>Submit</Text>
        </TouchableHighlight>

        <Text>{'\n'}</Text>

        <Text> 
          Presenters: {'\n'} {'\n'}
           {this.state.participants.map(
            function(object, key) {
              return <Text>{key+1}) {object}{'\n'}</Text>
            })}
          Judges: {'\n'} {'\n'}
           {this.state.judges.map(
            function(object, key) {
              return <Text>{key+1}) {object}{'\n'}</Text>
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
  text:{
    color: 'blue'
  }
});