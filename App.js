import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import  RootNavigator  from './components/Drawer/Drawer';
import BottomNavigator from './components/BottomNavigator/BottomNavigator';
import { withTheme } from 'react-native-paper';

/**
 * @author
 * @function App
 **/
const App = (props) => {
  return <RootNavigator />;
};

export default App;
