import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import RootNavigator from './navigation/Drawer/Drawer';
import BottomNavigator from './navigation/BottomNavigator/BottomNavigator';
import { withTheme } from 'react-native-paper';

/**
 * @author
 * @function App
 **/
const App = (props) => {
  return <RootNavigator />;
};

export default App;
