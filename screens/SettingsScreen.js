import React, {Component} from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, TouchableOpacity, Alert, TextInput, Modal } from 'react-native';
import { Avatar } from 'react-native-elements';
import db from '../Config';
import firebase from 'firebase';
 
/*#212F3C -> navy-ish blue
  #2ECC71 -> green
  #ECECEC -> darker than white but whitish*/

export default class SettingsScreen extends Component{
  render(){
    return(
      <View>
        <Avatar/>
        <Text>Settings Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button:{
    
  }
});