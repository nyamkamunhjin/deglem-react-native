import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
/**
 * @author
 * @function CalendarSwipe
 **/
const CalendarSwipe = (props) => {
  return (
    <View style={styles.date}>
      <TouchableRipple onPress={() => console.log('calendar arrow left')}>
        <Icon name="arrow-left" style={{ padding: 15 }} size={15} />
      </TouchableRipple>
      <TouchableRipple onPress={() => console.log('pressed date')}>
        <Text
          style={{
            textAlign: 'center',
            textAlignVertical: 'center',
            padding: 15,
          }}>
          Sunday, Sep 20
        </Text>
      </TouchableRipple>
      <TouchableRipple
        onPress={() => console.log('calendar arrow right')}
        borderless={true}>
        <Icon
          name="arrow-right"
          style={{
            padding: 15,
          }}
          size={15}
        />
      </TouchableRipple>
    </View>
  );
};

const styles = StyleSheet.create({
  date: {
    backgroundColor: 'white',
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 0,
    height: 50,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 1,
  },
});
export default CalendarSwipe;
