import React, {Component} from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, TouchableOpacity, Alert, TextInput, Modal } from 'react-native';
import db from '../Config';
import firebase from 'firebase';
 
/*#212F3C -> navy-ish blue
  #2ECC71 -> green
  #ECECEC -> darker than white but whitish*/

export default class LoginScreen extends Component{
  constructor(){
    super();
    this.state = {
      emailID: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      contactNo: '',
      address: '',
      isModalVisible: false
    }
  }

  /* When the sign up button is pressed, this function
  is called and user is added to the database */
  userSignUp = (newEmail, newPassword, newConfirmPassword)=>{
    if(newPassword !== newConfirmPassword){
      return Alert.alert('Passwords do not match. \n Check your password.')
    }
    else{
      console.log("passwords match")
      firebase.auth()
      .createUserWithEmailAndPassword(newEmail, newPassword)
      .then(()=>{
        console.log("inside .then of createUserWithEmailAndPassword.")
        db.collection("users").add({
          first_name: this.state.firstName,
          last_name: this.state.lastName,
          contact_no:this.state.contactNo,
          address:this.state.address,
          email_id:newEmail
        });
        return Alert.alert("User Added successfully","", [
          {
            text: 'OK',
            onPress: ()=>this.setState({isModalVisible:false}),
          }
        ]);
      })
      .catch((error)=>{
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage);
      });
    }
  }

  /* When the login button is pressed, this function
  is called and it logs in to the user with the
  credentials which were inputted into the TextInputs */
  userLogin = (emailID, password)=>{
    if (emailID !== ''){
      if (password!==''){
        firebase.auth().signInWithEmailAndPassword(emailID, password)
        .then(()=>{
          this.props.navigation.navigate('HomeScreen');
          return Alert.alert('Successfully logged in!');
        })
        .catch((error)=>{
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage);
        });
      }
    }
    else{
      return Alert.alert('Please enter both email and password.');
    }
  }

  componentDidMount(){
    //console.log(this.props.navigation.navigate);
  }

  /* Creates the Modal for Sign Up pop-up. */
  showModal = ()=>{
    return (
      <Modal
      animationType = 'fade'
      transparent = {true}
      visible = {this.state.isModalVisible}>
        <View style = {styles.modalView}>
          <ScrollView style ={{width: '100%'}}>
            <KeyboardAvoidingView style = {{flex:1, justifyContent: "center", alignItems: "center"}}> 
              {/* Modal Title */}
              <Text
              style={{color: '#212F3C', fontSize: 25, fontWeight: '400', margin: 10}}
                >Sign Up
              </Text>

              {/* First Name input */}
              <TextInput
                style = {styles.modalTextInput}
                placeholderTextColor = '#212F3C'
                placeholder = "First Name"
                maxLength = {15}
                onChangeText = {text=>{
                  this.setState({firstName:text});
                }}
              />
    
              {/* Last Name input */}
              <TextInput
                style = {styles.modalTextInput}
                placeholderTextColor = '#212F3C'
                placeholder = "Last Name"
                maxLength = {20}
                onChangeText = {text=>{
                  this.setState({lastName:text});
                }}
              />
    
              {/* Contact/Phone number input */}
              <TextInput
                style = {styles.modalTextInput}
                placeholderTextColor = '#212F3C'
                placeholder = "Contact Number"
                maxLength = {10}
                keyboardType = "number-pad"
                onChangeText = {num=>{
                  this.setState({contactNo:num});
                }}
              />
    
              {/* Address input */}
                <TextInput
                style = {[styles.modalTextInput, {height:105}]}
                placeholderTextColor = '#212F3C'
                placeholder = "Enter Address"
                multiline = {true}
                onChangeText = {text=>{
                  this.setState({address:text});
                }}
              />
    
              {/* Email ID input */}
              <TextInput
                style = {styles.modalTextInput}
                placeholderTextColor = '#212F3C'
                keyboardType = "email-address"
                placeholder = "Enter email ID"
                onChangeText = {text=>{
                  this.setState({emailID:text});
                }}
              />
    
              {/* Password input */}
              <TextInput
                style = {styles.modalTextInput}
                placeholderTextColor = '#212F3C'
                placeholder = "Enter Password"
                secureTextEntry = {true}
                onChangeText = {text=>{
                  this.setState({password:text});
                }}
              />
    
              {/* Confirm Password input */}
              <TextInput
                style = {styles.modalTextInput}
                placeholderTextColor = '#212F3C'
                placeholder = "Confirm password"
                secureTextEntry = {true}
                onChangeText = {text=>{
                  this.setState({confirmPassword:text});
              }}
              />
    
              {/* Cancel Sign Up button */}
              <TouchableOpacity
              style = {[styles.button, {backgroundColor: '#212F3C'}]}
              onPress = {()=>{
                this.setState({isModalVisible:false});
              }}>
                <Text style = {[styles.buttonText, {color:'#ECECEC'}]}>Cancel</Text>
              </TouchableOpacity>
            
              {/* Final Sign Up button */}
              <TouchableOpacity
              style = {[styles.button, {backgroundColor: '#212F3C'}]}
              onPress = {()=>{
                this.userSignUp(
                  this.state.emailID,
                  this.state.password,
                  this.state.confirmPassword
                );
              }}>
                <Text style = {[styles.buttonText, {color:'#ECECEC'}]}>Sign Up</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    );
  }

  /* Screen Display */
  render(){
    return(

      /* Main container for the components in LoginScreen */
      <View style = {styles.container}>

        {/* This part of the container calls the showModal() function
        at all times which can make a user sign up.*/}
        <View style={{justifyContent: "center", alignItems: "center"}}>
          {this.showModal()}
        </View>

        {/* This part of the container creates the main login boxes. */}
        <View style = {{flex:1, justifyContent: "center", alignItems: "center"}}>
          
          {/* Shows the name of the app */}
          <Text style = {styles.title}>Barter System</Text>
          
          {/* Email Text Input */}
          <TextInput
            style = {styles.mainScreenTextInput}
            placeholder = "example@abcd.com"
            placeholderTextColor = '#ECECEC'
            keyboardType = "email-address"
            color = '#ECECEC'
            onChangeText = {text=>{
              this.setState({emailID:text});
            }}
          />

          {/* Password Text Input */}
          <TextInput
            style = {styles.mainScreenTextInput}
            secureTextEntry = {true}
            placeholder = "Enter Password"
            placeholderTextColor = "#ECECEC"
            color = '#ECECEC'
            onChangeText = {text=>{
              this.setState({password:text});
            }}
          />

          {/* Login Button */}
          <TouchableOpacity
          style = {[styles.button, {backgroundColor: '#2ECC71'}]}
          onPress = {()=>{
            this.userLogin(this.state.emailID, this.state.password);
          }}>
            <Text style = {[styles.buttonText, {color:'#212F3C'}]}>Login</Text>
          </TouchableOpacity>

          {/* Sign Up Button: redirects to modal */}
          <TouchableOpacity
          style = {[styles.button, {backgroundColor: '#2ECC71'}]}
          onPress = {()=>{
            this.setState({isModalVisible:true});
          }}>
            <Text style = {[styles.buttonText, {color:'#212F3C'}]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#212F3C',
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
    height: '100%'
  },
  mainScreenTextInput:{
    width: 300,
    height: 40,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#2ECC71',
    paddingLeft: 10,
    margin: 5
  }, 
  button:{
    width: 200,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 12,
    borderColor: '#ECECEC',    
    margin: 12.5
  },
  buttonText:{
    fontSize: 15,
    color: '#212F3C',
    textAlign: "center",
    fontWeight: "bold"
  },
  title:{
    color: '#ECECEC',
    fontSize: 47.5,
    fontWeight: '400',
    paddingBottom: 25
  },
  modalView:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    borderRadius: 10,
    borderColor: '#ECECEC',
    backgroundColor: '#2ECC71',
    marginRight: 30,
    marginLeft: 30,
    marginTop: 50,
    marginBottom: 50
  },
  modalTextInput:{
    width: '80%',
    height: 35,
    alignSelf: "center",
    borderColor: '#212F3C',
    borderWidth: 1.5,
    borderRadius: 5,
    margin: 10,
    padding: 7.5,
    backgroundColor: '#ECECEC'
  }
});