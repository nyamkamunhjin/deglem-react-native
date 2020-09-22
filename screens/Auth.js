import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * @author
 * @function Auth
 **/
const Auth = ({ navigation }) => {
  const { container } = styles;
  return (
    <View style={container}>
      <Text>Auth</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});
export default Auth;
