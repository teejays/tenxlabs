/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './components/HomeScreen'
import DetailScreen from './components/DetailScreen'
import SetUpScreen from './components/SetUpScreen'
import ControlScreen from './components/ControlScreen'
import LaunchScreen from './components/LaunchScreen'

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Root Component
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

export default class App extends Component {
  render() {
    return <RootStack />
  }
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Navigation
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const RootStack = StackNavigator({
  Launch: {
    screen: LaunchScreen,
  },
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: "Home Screen",
      header: {
        left: null,
      }
    }
  },
  Details: {
    screen: DetailScreen,
  },
  SetUp: {
    screen: SetUpScreen,
  },
  Control:{
    screen: ControlScreen,
  }
},
{
  initialRouteName: 'Launch',
}
);
