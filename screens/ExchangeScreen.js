import React, {Component} from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, Alert, TextInput } from 'react-native';
import MyHeader from '../components/MyHeader';
import db from '../Config';
import firebase from 'firebase';
import { CardStyleInterpolators } from 'react-navigation-stack';

/*#212F3C -> navy-ish blue
  #2ECC71 -> green
  #ECECEC -> darker than white but whitish*/

export default class ExchangeScreen extends Component{
  constructor(){
    super();
    this.state = {
      userID:firebase.auth().currentUser.email,
      itemName: '',
      itemDescription: ''
    }
  }
  
  // Creates a unique ID for each item request 
  createUniqueID(){
    return Math.random().toString(36).substring(7);
  }

  /* This function adds the item and its description in database
  when it is called, which is when 'SUBMIT' is pressed */
  addItem = (itemName, itemDescription)=>{
    var randomRequestID = this.createUniqueID();
    db.collection("exchange_requests").add({
      user_id: this.state.userID,
      item_name: itemName,
      item_description: itemDescription,
      request_id: randomRequestID
    });
    this.setState({itemName: '', itemDescription: ''});

    return Alert.alert('Item exchange requested.', '',[
      {text: 'OK', onPress: ()=>{
        this.props.navigation.navigate('HomeScreen');
      }}
    ]);
  }

  render(){
    return(
      <View style = {styles.container}>
        {/* Header */}
        <MyHeader title = "Exchange Item"/>
        <KeyboardAvoidingView enabled>

          {/* Item Name Input */}
          <TextInput
          style = {[styles.textInput , {height: 40}]}
          placeholder = "Enter Item Name"
          color = "#212F3C"
          onChangeText = {text=>{
            this.setState({itemName:text});
          }}
          value = {this.state.itemName}
          />

          {/* Item Description Input */}
          <TextInput
          style = {[styles.textInput, {height: 240}]}
          placeholder = "Enter Item Description"
          color = "#212F3C"
          multiline = {true}
          onChangeText = {text=>{
            this.setState({itemDescription:text});
          }}
          value = {this.state.itemDescription}
          />

          {/* Submit Button */}
          <TouchableOpacity
          style = {styles.button}
          onPress = {()=>{
            this.addItem(this.state.itemName, this.state.itemDescription);
          }}>
            <Text style = {styles.buttonText}>SUBMIT</Text>
          </TouchableOpacity>

        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#212F3C'
  },
  textInput:{
    width: '80%',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#2ECC71',
    alignSelf: 'center',
    backgroundColor: '#ECECEC',
    margin: 10,
    padding: 7.5
  },
  button:{
    width: 200,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 12,
    borderColor: '#ECECEC',    
    margin: 15,
    alignSelf: "center",
    backgroundColor: '#2ECC71'
  },
  buttonText:{
    fontSize: 15,
    color: '#212F3C',
    textAlign: "center",
    fontWeight: "bold"
  }
});