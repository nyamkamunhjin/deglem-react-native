import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import WeekMN from '../../public/week-mn.json';
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
  const { i18n } = useTranslation();

  const datePrettier = (date) => {
    const tempDate = new Date(date);
    if (i18n.language === 'en') {
      return tempDate.toUTCString().split(' ').slice(0, 3).join(' ');
    }

    if (i18n.language === 'mn') {
      const weekDay = tempDate.toDateString().split(' ')[0];
      const month = tempDate.getMonth() + 1;
      const monthDay = tempDate.getDate();

      return `${month} сарын ${monthDay}, ${WeekMN[weekDay]}`;
    }
  };

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
            {datePrettier(date)}
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
    borderRadius: 10,
    margin: 5,
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
