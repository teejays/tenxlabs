/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './components/HomeScreen'
import DetailScreen from './components/DetailScreen'

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
  Home: {
    screen: HomeScreen,
  },
  Details: {
    screen: DetailScreen,
  },
},
{
  initialRouteName: 'Home',
}
);
