import React, {Component} from 'react';
import {View} from 'react-native';
import {Header} from 'react-native-elements';

/*#212F3C -> navy-ish blue
  #2ECC71 -> green
  #ECECEC -> darker than white but whitish*/

export default class MyHeader extends Component{
  render(){
    return(
      <Header
      centerComponent = {{text: this.props.title, style:{
        color:'#ECECEC', fontSize:20, fontWeight:"bold"
      }}}
      backgroundColor = '#2ECC71'
      />
    );
  }
}