import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
/**
 * @author
 * @function CalendarSwipe
 **/
const CalendarSwipe = ({
  arrowLeftOnPress,
  arrowRightOnPress,
  dateOnPress,
  date,
}) => {
  return (
    <View style={styles.date}>
      <View style={{ overflow: 'hidden', borderRadius: 10 }}>
        <TouchableRipple onPress={arrowLeftOnPress} borderless={true}>
          <Icon name="arrow-left" style={{ padding: 15 }} size={15} />
        </TouchableRipple>
      </View>

      <View style={{ overflow: 'hidden', borderRadius: 10 }}>
        <TouchableRipple onPress={dateOnPress} borderless={true}>
          <Text
            style={{
              textAlign: 'center',
              textAlignVertical: 'center',
              padding: 15,
            }}>
            {date}
          </Text>
        </TouchableRipple>
      </View>
      <View style={{ overflow: 'hidden', borderRadius: 10 }}>
        <TouchableRipple onPress={arrowRightOnPress} borderless={true}>
          <Icon name="arrow-right" style={{ padding: 15 }} size={15} />
        </TouchableRipple>
      </View>
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
    padding: 5,
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
