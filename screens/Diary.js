import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Modal, Portal, Text, withTheme } from 'react-native-paper';

import FoodTable from '../components/FoodTable/FoodTable';
import Swiper from 'react-native-swiper';
import CalendarSwipe from '../components/Calendar/CalendarSwipe';
import DiaryProgress from '../components/DiaryProgress/DiaryProgress';
import { Calendar, CalendarList } from 'react-native-calendars';
import axios from 'axios';
import { formatDate } from '../functions/functions';

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

  // refs
  // const swiper = useRef(null);

  const handleDateSelect = (day) => {
    // console.log(day)
    let pair = {};
    pair[day.dateString] = { selected: true };
    // console.log(pair);
    setSelectedDate(pair);
    // setDiaryByDate(day.dateString, diaries);

    setShowModal(false);
  };

  const handleCalendarButton = (date, to) => {
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() + to);
    newDate = formatDate(newDate);

    let pair = {};
    pair[newDate] = { selected: true };
    // console.log(pair);
    setSelectedDate(pair);
    // setDiaryByDate(newDate, diaries);

    // swipe animation
    // swiper.current.scrollBy(to);
  };

  useEffect(() => {
    const setDiaryByDate = (date, diaries) => {
      // console.log(diaries);
      const diary = diaries.find((diary) => {
        return diary.date === date;
      });
      console.log('filtering diary: ', diary);
      if (diary) {
        setCurrent(diary);
      } else {
        setCurrent({});
      }
      console.log('current:', current);
    };

    setDiaryByDate(Object.keys(selectedDate)[0], diaries);
  }, [selectedDate, diaries]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        'https://deglem-api.herokuapp.com/api/users/dailylog?id=5f607f85a586e00e416f2124',
      );
      setDiaries(result.data);
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Portal>
        <Modal visible={showModal} onDismiss={() => setShowModal(false)}>
          <Calendar
            // horizontal={true}
            pagingEnabled={true}
            // current={selectedDate}
            markedDates={selectedDate}
            onDayPress={handleDateSelect}
            // markingType='period'
            theme={{
              selectedDayBackgroundColor: colors.primary,
              selectedDayTextColor: '#ffffff',
            }}
            enableSwipeMonths={true}
          />
        </Modal>
      </Portal>
      <CalendarSwipe
        arrowLeftOnPress={() =>
          handleCalendarButton(Object.keys(selectedDate)[0], -1)
        }
        arrowRightOnPress={() =>
          handleCalendarButton(Object.keys(selectedDate)[0], 1)
        }
        dateOnPress={() => setShowModal(true)}
        date={Object.keys(selectedDate)[0]}
      />

      <ScrollView>
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
    </React.Fragment>
  );
};

export default withTheme(Diary);
