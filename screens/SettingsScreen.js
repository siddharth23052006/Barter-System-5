import React, {Component} from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, TouchableOpacity, Alert, TextInput, Modal } from 'react-native';
import { Avatar } from 'react-native-elements';
import db from '../Config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';
import { SafeAreaProvider } from 'react-native-safe-area-context';
 
/*#212F3C -> navy-ish blue
  #2ECC71 -> green
  #ECECEC -> darker than white but whitish*/

export default class SettingsScreen extends Component{
  constructor(){
    super();
    this.state = {
      firstName: '',
      lastName: '',
      contactNo: '',
      address: '',
      currentUser: firebase.auth().currentUser,
      docID: ''
    }
  }

  /* This gets the data of the current logged in user as soon
  as the function is called */
  getData = ()=>{
    var user = this.state.currentUser;
    db.collection("users").where("email_id", "==", user.email)
    .get()
    .then(snapshot=>{
      snapshot.forEach(doc=>{
        this.setState({
          firstName: doc.data().first_name,
          lastName: doc.data().last_name,
          address: doc.data().address,
          contactNo: doc.data().contact_no,
          docID: doc.id
        });
      });
    })
    .catch(error=>{
      console.log("Error getting documents: ", error)
    });
  }

  /* When the button is pressed, this function updates the data
  that the user entered, into the database */
  updateData = ()=>{
    console.log('UPDATEDATA() IS CALLED.');
    var user = this.state.currentUser;
    db.collection("users").doc(this.state.docID).update({
      address: this.state.address,
      contact_no: this.state.contactNo,
      first_name: this.state.firstName,
      last_name: this.state.lastName
    });
  }

  /* Calls the getData() function when the settings screen is loaded */
  componentDidMount(){
    this.getData();
  }

  render(){
    return(
      <SafeAreaProvider>
        <View style = {styles.container}>

          {/* Displays the title of the screen using a header component */}
          <MyHeader title = "Settings"/>

          {/* First Name Text Input */}
          <TextInput
            placeholder = "Enter First Name"
            style = {styles.input}
            maxLength = {15}
            onChangeText = {text=>{
              this.setState({firstName:text});
            }}
            value = {this.state.firstName}
          />

          {/* Last Name Text Input */}
          <TextInput
            placeholder = "Enter Last Name"
            style = {styles.input}
            maxLength = {20}
            onChangeText = {text=>{
              this.setState({lastName:text});
            }}
            value = {this.state.lastName}
          />

          {/* Contact Number Text Input */}
          <TextInput
            placeholder = "Enter Contact Number"
            style = {styles.input}
            maxLength = {10}
            keyboardType = "numeric"
            onChangeText = {text=>{
              this.setState({contactNo:text});
            }}
            value = {this.state.contactNo}
          />

          {/* Address Text Input */}
          <TextInput
            placeholder = "Enter Address"
            style = {[styles.input, {height: 100}]}
            multiline = {true}
            onChangeText = {text=>{
              this.setState({address:text});
            }}
            value = {this.state.address}
          />

          {/* Save button */}
          <TouchableOpacity
            style = {styles.button}
            onPress = {()=>{this.updateData()}}>
            <Text style = {styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#212F3C',
  },
  button:{
    width: 200,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 12,
    borderColor: '#ECECEC',    
    margin: 12.5,
    backgroundColor: '#2ECC71',
    alignSelf: "center"
  },
  buttonText:{
    fontSize: 15,
    color: '#212F3C',
    textAlign: "center",
    fontWeight: "bold"
  },
  input:{
    width: '80%',
    height: 30,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#2ECC71',
    alignSelf: 'center',
    backgroundColor: '#ECECEC',
    margin: 10,
    padding: 7.5
  }
});