import {DrawerItems} from 'react-navigation-drawer';
import React, {Component} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import firebase from 'firebase';
import db from '../Config';

/*#212F3C -> navy-ish blue
  #2ECC71 -> green
  #ECECEC -> darker than white but whitish*/

export default class SideBarMenu extends Component{  
  render(){
    return(
      /* The main View */
      <View style = {{flex:1}}>

        {/*<DrawerItems {...this.props}/>*/}

        {/* The button view */}
        <View style = {{flex:0.2,justifyContent:'flex-end',paddingBottom:30}}>
          {/* Log out button */}
          <TouchableOpacity
          style = {styles.logOutButton}
          onPress = {()=>{
            this.props.navigation.navigate('HomeScreen');
            firebase.auth().signOut();
          }}>
            <Text style = {{fontSize:30,fontWeight:'bold'}}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logOutButton:{
    height: 30,
    width: '100%',
    justifyContent: 'center',
    padding: 10,
    marginBottom: 100
  }
});