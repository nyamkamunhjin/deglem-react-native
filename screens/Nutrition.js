import { useIsFocused } from '@react-navigation/native';
import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ProgressBarAndroid } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { ScrollView } from 'react-native-gesture-handler';
import {
  ActivityIndicator,
  Dialog,
  Divider,
  Portal,
  ProgressBar,
  Title,
  withTheme,
} from 'react-native-paper';
import DiaryAPI from '../api/DiaryAPI';
import CalendarSwipe from '../components/Calendar/CalendarSwipe';
import cookieContext from '../context/cookie-context';
import { formatDate, getNutritionProgress } from '../functions/functions';
import globalStyles from '../global-styles';

/**
 * @author
 * @function Nutrition
 **/
const Nutrition = ({ navigation, theme }) => {
  const { colors } = theme;

  const [nutritionProgress, setNutritionProgress] = useState([]);
  const { getSelectedDate, setSelectedDate, token } = useContext(cookieContext);
  const [loading, setLoading] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  const isFocused = useIsFocused();

  const handleDateSelect = (day) => {
    let pair = {};
    pair[day.dateString] = { selected: true };

    setSelectedDate(pair);
    setShowCalendarModal(false);
  };

  const handleCalendarButton = (date, to) => {
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() + to);
    newDate = formatDate(newDate);

    let pair = {};
    pair[newDate] = { selected: true };

    setSelectedDate(pair);
  };

  useEffect(() => {
    const getProgress = async () => {
      setLoading(false);
      // console.log('getProgress');
      const { data, err } = await DiaryAPI.fetchDiary(token, getSelectedDate());

      if (err) {
        console.error(err);
        setLoading(true);
      } else {
        console.log({ data, err, token });
        if (data) {
          // console.log(data[0]);
          // console.log(getNutritionProgress(data[0]));
          setNutritionProgress(getNutritionProgress(data[0]));
          setLoading(true);
        }
      }
    };

    if (isFocused) {
      // console.log(isFocused);
      getProgress();
    }
  }, [getSelectedDate, isFocused, token]);

  return (
    <React.Fragment>
      <Portal>
        <Dialog
          visible={showCalendarModal}
          onDismiss={() => setShowCalendarModal(false)}>
          <Calendar
            pagingEnabled={true}
            markedDates={getSelectedDate(true)}
            onDayPress={handleDateSelect}
            theme={{
              selectedDayBackgroundColor: colors.primary,
              selectedDayTextColor: '#ffffff',
            }}
            enableSwipeMonths={true}
          />
        </Dialog>
      </Portal>

      <CalendarSwipe
        arrowLeftOnPress={() => handleCalendarButton(getSelectedDate(), -1)}
        arrowRightOnPress={() => handleCalendarButton(getSelectedDate(), 1)}
        dateOnPress={() => setShowCalendarModal(true)}
        date={getSelectedDate()}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <Title style={globalStyles.center}>Nutrition progress</Title>
        {loading ? (
          Object.entries(nutritionProgress).map(([key, value], index) => {
            console.log(key, value);
            return (
              <React.Fragment key={index}>
                <Text style={styles.text}>{_.startCase(key)}</Text>
                <View style={styles.progress}>
                  <View style={styles.progressBar}>
                    <ProgressBar progress={0.5} />
                  </View>
                  <Text style={styles.value}>{value}</Text>
                </View>
              </React.Fragment>
            );
          })
        ) : (
          <View style={styles.activityIndicator}>
            <ActivityIndicator />
          </View>
        )}
      </ScrollView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'grey',
    // borderRadius: 10,
    // margin: 5,
    // marginBottom: 100,
    // paddingBottom: 30,
  },
  progress: {
    ...globalStyles.row,
    justifyContent: 'center',
    margin: 10,
  },
  text: {
    marginHorizontal: 20,
  },
  value: {
    flex: 1,
    marginHorizontal: 20,
    // marginBottom: 1000,
  },
  progressBar: {
    marginHorizontal: 10,
    flex: 9,
  },
  activityIndicator: {
    marginTop: 20,
  },
});

export default withTheme(Nutrition);
