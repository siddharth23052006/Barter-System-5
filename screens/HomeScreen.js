import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import MyHeader from '../components/MyHeader';
import { ListItem } from 'react-native-elements';
import db from '../Config';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import firebase from 'firebase';

/*#212F3C -> navy-ish blue
  #2ECC71 -> green
  #ECECEC -> darker than white but whitish*/

export default class HomeScreen extends Component{
  constructor(){
    super();
    this.state = {allRequests: []}
    this.requestReference = null;
  }

  /* Gets all the item requests from the database */
  getAllRequests = ()=>{
    this.requestReference = db.collection("exchange_requests")
    .onSnapshot((snapshot)=>{
      var allRequests = snapshot.docs.map(doc=>doc.data());
      this.setState({allRequests:allRequests});
    });
  }

  /* Calls the getAllRequests() function
  when the component is mounted */
  componentDidMount(){
    this.getAllRequests();
    //console.log(...this.props);
  }

  /* Resets the request reference to null when the 
  component in unmounted, to avoid excess memory usage */
  componentWillUnmount(){
    this.requestReference = null;
  }

  /* Extracts a key from each item from the given data set */
  keyExtractor = (item, index)=>index.toString();

  /* Creates each item's format */
  renderItem = ({item, i})=>{
    return(
      <ListItem key={i} bottomDivider
      containerStyle = {{backgroundColor:'#212F3C'}}>
        <ListItem.Content>
          <ListItem.Title style = {styles.listItemTitle}>{item.item_name}</ListItem.Title>
          <ListItem.Subtitle style = {{color: '#2ECC71'}}>{item.item_description}</ListItem.Subtitle>
          <TouchableOpacity
          style = {styles.button}>
            <Text style = {{color: '#212F3C'}}>View</Text>
          </TouchableOpacity>
        </ListItem.Content>
      </ListItem>
    );
  }
  render(){
    return(
      <SafeAreaProvider>
        <View style = {{flex:1, backgroundColor:'#212F3C'}}>
          {/* Title of the screen */}
          <MyHeader title = "Home"/>

          {/* This View creates either "No Data Available" or a
          FlatList with all barter requests and its information */}
          <View style = {{flex:1}}>

            {this.state.allRequests.length === 0?(

              /* Condition applies when there are no requests */
              <View style = {styles.subContainer}>
                <Text style = {{fontSize:20}}>No Data Available</Text>
              </View>

            ):(

              /* This creates a FlatList of all the requests */
              <SafeAreaView>
                <FlatList
                  data = {this.state.allRequests}
                  keyExtractor = {this.keyExtractor}
                  renderItem = {this.renderItem}
                />
              </SafeAreaView>

            )}
          </View>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  listItemTitle:{
    color: '#ECECEC',
    fontWeight: "bold"
  },
  button:{
    width: 50,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#2ECC71',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#ECECEC',
    margin: 5
  },
  subContainer:{
    flex: 1,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center"
  }
});