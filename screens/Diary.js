import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Modal, Portal, Text, withTheme } from 'react-native-paper';

import FoodTable from '../components/FoodTable/FoodTable';
import Swiper from 'react-native-swiper';
import CalendarSwipe from '../components/Calendar/CalendarSwipe';
import DiaryProgress from '../components/DiaryProgress/DiaryProgress';
import { Calendar, CalendarList } from 'react-native-calendars';
import axios from 'axios';
/**
 * @author
 * @function Diary
 **/

const Diary = ({ navigation, theme }) => {
  const { colors, fonts } = theme;
  const [current, setCurrent] = useState({});
  const [diaries, setDiaries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState({
    '2020-09-22': { selected: true },
  });

  const handleDateSelect = (day) => {
    // console.log(day)
    let pair = {};
    pair[day.dateString] = { selected: true };
    // console.log(pair);
    setSelectedDate(pair);
    setDiaryByDate(day.dateString, diaries);

    setShowModal(false);
  };

  const setDiaryByDate = (date, diaries) => {
    // console.log(diaries);
    const diary = diaries.find((diary) => {
      return diary.date === date;
    });
    console.log('filtering diary: ', diary);
    if (diary) setCurrent(diary);
    else setCurrent({})
    console.log('current:', current);
  };

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(
          'https://deglem-api.herokuapp.com/api/users/dailylog?id=5f607f85a586e00e416f2124',
        )
        .then((res) => {
          // console.log(res.data);
          setDiaries(res.data);
          setDiaryByDate(Object.keys(selectedDate)[0], res.data);
        });
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <View>
        <Portal>
          <Modal visible={showModal} onDismiss={() => setShowModal(false)}>
            <CalendarList
              horizontal={true}
              pagingEnabled={true}
              // current={selectedDate}
              markedDates={selectedDate}
              onDayPress={handleDateSelect}
              // markingType='period'
              theme={{
                selectedDayBackgroundColor: colors.primary,
                selectedDayTextColor: '#ffffff',
              }}
            />
          </Modal>
        </Portal>
        <CalendarSwipe
          arrowLeftOnPress={null}
          arrowRightOnPress={null}
          dateOnPress={() => setShowModal(true)}
          date={Object.keys(selectedDate)[0]}
        />
        <ScrollView style={{ marginBottom: 50 }}>
          <DiaryProgress progress={2400 / 2500} />
          <FoodTable name="Breakfast" foods={current.breakfast} />
          <FoodTable name="Lunch" foods={current.lunch} />
          <FoodTable name="Dinner" foods={current.dinner} />
          <FoodTable
            name="Snacks"
            backgroundColor={colors.triadic}
            foods={current.snacks}
          />
        </ScrollView>
      </View>
    </React.Fragment>
  );
};

export default withTheme(Diary);
