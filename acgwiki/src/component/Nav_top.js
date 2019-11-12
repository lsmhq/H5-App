//顶部栏

import React, { Component } from 'react'
import { View, StyleSheet, Image } from 'react-native';
import { url } from 'inspector';
export default class Nav_top extends Component {
    render() {
        return (
            <View style={styles.nav}>
                <Image source={{uri:data.img_url}}/>
            </View>
        )
    }
}

let styles = StyleSheet.create({
    nav:{
        backgroundColor:'#ff4081'
    }
});
