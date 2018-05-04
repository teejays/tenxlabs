/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Connection.js
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';

export default class Connection extends Component {

    constructor(props) {
        super(props);

        console.log(props);

        this.state = {
            open: false,
            code: props.code
        };
        this.socket = new WebSocket('ws://echo.websocket.org/');
        this.emit = this.emit.bind(this);
    }

    emit() {
        this.setState(prevState => ({
            open: !prevState.open
        }))
        this.socket.send("YAY!")
    }

    componentDidMount() {
        this.socket.onopen = () => this.socket.send(JSON.stringify({type: 'greet', payload: 'Hi ^-^'}));
        this.socket.onmessage = ({data}) => console.log(data);
    }

    render() {

        const LED = {
            backgroundColor: this.state.open
            ? 'lightgreen'
            : 'red',
            height: 30,
            position: 'absolute',
            flexDirection: 'row',
            bottom: 0,
            width: 100,
            height: 100,
            top: 120,
            borderRadius: 40,
            justifyContent: 'space-between'
        }

        const { code } = this.state;

        console.log(code);

        return (
            <View style={styles.container}>
                <Button onPress={this.emit} title={this.state.open
        ? "Turn off"
        : "Turn on"} color="#21ba45"/>
                <View style={LED}></View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});