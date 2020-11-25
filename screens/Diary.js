/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Dialog, Portal, withTheme } from 'react-native-paper';
import FoodTable from '../components/FoodTable/FoodTable';
import CalendarSwipe from '../components/Calendar/CalendarSwipe';
import DiaryProgress from '../components/DiaryProgress/DiaryProgress';
import { Calendar } from 'react-native-calendars';
import { countCalories, formatDate } from '../functions/functions';
import cookieContext from '../context/cookie-context';
import { useIsFocused } from '@react-navigation/native';
import DiaryAPI from '../api/DiaryAPI';

/**
 * @author
 * @function Diarys
 **/

const Diary = ({ navigation, theme }) => {
  const { colors } = theme;
  const { getSelectedDate, setSelectedDate, token, user } = useContext(
    cookieContext,
  );
  const [current, setCurrent] = useState({});
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [totalCalories, setTotalCalories] = useState(0);
  const [limitCalories, setLimitCalories] = useState(0);
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
  const calculateTotalCalories = (today) => {
    const { breakfast, lunch, dinner, snacks } = today;
    return (
      countCalories(breakfast) +
      countCalories(lunch) +
      countCalories(dinner) +
      countCalories(snacks)
    );
  };
  const setDiaryByDate = (date, diaries) => {
    // console.log('diaries:', diaries);
    const diary = diaries.find((item) => {
      return formatDate(item.date) === date;
    });
    setCurrent(diary || {});
    setTotalCalories(calculateTotalCalories(diary || {}));
  };

  const fetchDiary = async () => {
    const diary = await DiaryAPI.fetchDiary(token, getSelectedDate());

    if (diary.err) {
      // console.error(diary.err);
    } else {
      setDiaryByDate(getSelectedDate(), diary.data);
    }
  };

  useEffect(() => {
    if (isFocused && token) {
      fetchDiary();
      if (user) {
        setLimitCalories(user.nutritionGoals.calories.value);
      }
    }
  }, [getSelectedDate, isFocused, user]);

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
      <ScrollView showsVerticalScrollIndicator={false}>
        <DiaryProgress
          progress={totalCalories}
          limit={limitCalories}
          diary={current}
        />
        <FoodTable
          name="Breakfast"
          foods={current.breakfast}
          selectedDate={getSelectedDate()}
          fetchData={fetchDiary}
        />
        <FoodTable
          name="Lunch"
          foods={current.lunch}
          selectedDate={getSelectedDate()}
          fetchData={fetchDiary}
        />
        <FoodTable
          name="Dinner"
          foods={current.dinner}
          selectedDate={getSelectedDate()}
          fetchData={fetchDiary}
        />
        <FoodTable
          name="Snacks"
          backgroundColor={colors.triadic}
          foods={current.snacks}
          selectedDate={getSelectedDate()}
          fetchData={fetchDiary}
        />
      </ScrollView>
    </React.Fragment>
  );
};

export default withTheme(Diary);
