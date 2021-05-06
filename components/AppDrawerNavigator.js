import {createDrawerNavigator} from 'react-navigation-drawer';
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {AppTabNavigator} from './AppTabNavigator';
import SideBarMenu from './SideBarMenu';

export const AppDrawerNavigator = createDrawerNavigator(
  {Home:{screen: AppTabNavigator}},
  {contentComponent: SideBarMenu},
  {initialRouteName: 'Home'}
);