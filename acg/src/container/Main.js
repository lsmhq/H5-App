//主页
import React, { Component } from 'react';
import { View, StyleSheet, Text} from 'react-native';
export default class Main extends Component {
    render() {
        return (
            <View>
                <View>
                    <Text style = {styles.text}>{'This is Main'}</Text>
                </View>
            </View>
        )
    }
}

let styles = StyleSheet.create({
    text:{
        fontSize:20,
        color:'pink',
        textAlign:'center',
        backgroundColor:'gray'
    }
})