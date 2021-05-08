import {createDrawerNavigator} from 'react-navigation-drawer';
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {AppTabNavigator} from './AppTabNavigator';
import SettingsScreen from '../screens/SettingsScreen';
import SideBarMenu from './SideBarMenu';

export const AppDrawerNavigator = createDrawerNavigator(
  {
    Home:{screen: AppTabNavigator},
    Settings:{screen: SettingsScreen}
  },
  {contentComponent: SideBarMenu},
  {initialRouteName: 'Home'}
);