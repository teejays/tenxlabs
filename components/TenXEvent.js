/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  ListView,
  TouchableOpacity
} from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';
import Timer from './Timer';
import { UserImage } from './UserImage';


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Constants
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
const subEvents = ["Presentation", "Audience Feedback", "Judges Feedback"];

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* TenXEvent Component
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// props should be the event details
export default class TenXEvent extends Component {
  
  constructor (props) {
    super(props);
    
    // define default states
    this.state = {
      eventDetails: props.eventDetails,
      isRunning: false,
      searchText: '',
    };

  }
  
  // function that runs when button is pressed
  toggleEventRunningStatus() {
    this.setState(previousState => {
        return { isRunning: !previousState.isRunning };
      });

  }

  // function that runs when button is pressed
  searchUser() {
    console.log("search user");
  }

  handlePress() {
    console.log("handling press");
  }

  render() {
    let titlePaddingTop = 0;
    if (this.props.Team) {
      [subtitle] = this.props.Team;
    } else {
      titlePaddingTop = 18;
    }
    return (
      <View>
      <View style={styles.container}>

        <Text style={styles.time}>
          Welcome to {this.state.eventDetails.Name}
        </Text>

        {'\n'}
        <Text> 
          Presenters: {'\n'} {'\n'}
           {this.state.eventDetails.presenters.map(
            function(object, key) {
              return <Text>{key+1}.{object}{'\n'}</Text>
            })}
        </Text>
        </View>
        <SearchBar
          platform={Platform.OS === 'ios' ? 'ios' : 'android'}
          ref={(ref) => { this.searchBar = ref; }}
          placeholder="Search"
          onChangeText={this.searchUser}
          value={this.state.searchText}
          lightTheme
          inputStyle={{ fontSize: 16, padding: 10 }}
          autoCorrect={false}
          allowFontScaling={false}
          containerStyle={
            Platform.OS === 'android' ? { backgroundColor: '#ececec' } : {}
          }
        />
       <TouchableOpacity onPress={this.handlePress} style={{ borderLeftWidth: 1, borderRightWidth: 1, borderColor: '#e8e8e8' }}>
          <ListItem
            title='meeting title'
            titleStyle={styles.meetingTitle}
            subtitle={
              <View style={styles.avatarRow}>
                <View style={{ marginRight: 5 }}>
                  <UserImage
                    imgSize={30}
                    userId={0}
                    fullName='Nina Sabado'
                    imageUrl='https://www.candy.com/media/wysiwyg/candyByColor.jpg'
                  />
                </View>
              </View>
            }
            style={styles.container}
            containerStyle={{ borderBottomColor: '#e8e8e8' }}
          />
        </TouchableOpacity>

      <TouchableOpacity onPress={this.handlePress}>
        <ListItem
          title='Nina Sabado'
          titleContainerStyle={{ paddingLeft: 5, paddingTop: titlePaddingTop }}
          titleStyle={{ fontSize: 16 }}
          subtitle='Senior Event Organizer'
          subtitleContainerStyle={{ paddingLeft: 5, paddingBottom: 4 }}
          subtitleStyle={[{ fontSize: 12 }, Platform.OS === 'android' ? { fontWeight: '300' } : {}]}
          avatar={<UserImage
            imgSize={60}
            userId={0}
            fullName='Nina Sabado'
            imageUrl='https://www.candy.com/media/wysiwyg/candyByColor.jpg'
          />
          }
          containerStyle={{
            backgroundColor: 'white', borderBottomColor: '#ddd', paddingTop: 6, paddingBottom: 6,
          }}
        />
      </TouchableOpacity>
        <Button title={this.state.isRunning? "Pause": "Start"} color="#841584" onPress={this.toggleEventRunningStatus.bind(this)} />
        <Timer seconds="90" isRunning={this.state.isRunning}/>
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
  avatarRow: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingVertical: 5,
  },
  meetingTitle: {
    textAlignVertical: 'center',
    fontWeight: '300',
    marginBottom: 5,
    fontSize: 17,
    color: 'black',
  },
});