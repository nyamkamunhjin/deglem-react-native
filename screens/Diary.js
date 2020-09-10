import React, { useEffect } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Text, withTheme } from 'react-native-paper';

/**
 * @author
 * @function Diary
 **/
const Diary = ({ navigation, theme }) => {

  const { container } = styles;
  return (
    <View style={container}>
      <Text>Diary</Text>
      {/* <Button
        title="Go to My Goal"
        onPress={() => navigation.navigate('mygoal-tab')} 
      /> */}
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

export default withTheme(Diary);
