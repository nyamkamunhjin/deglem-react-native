import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { RootNavigator } from './components/drawer/drawer';

/**
 * @author
 * @function App
 **/
const App = (props) => {
  const { container } = styles;
  return <RootNavigator />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default App;
