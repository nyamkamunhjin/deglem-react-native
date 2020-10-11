/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Dialog, Portal, withTheme, Button } from 'react-native-paper';
import FoodTable from '../components/FoodTable/FoodTable';
import CalendarSwipe from '../components/Calendar/CalendarSwipe';
import DiaryProgress from '../components/DiaryProgress/DiaryProgress';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import { countCalories, formatDate } from '../functions/functions';
import { BACKEND_URL } from '../env.config';
import cookieContext from '../context/cookie-context';
import { useIsFocused } from '@react-navigation/native';

/**
 * @author
 * @function Diarys
 **/

const Diary = ({ navigation, theme }) => {
  const { colors } = theme;
  const { cookies, getSelectedDate, setSelectedDate } = useContext(
    cookieContext,
  );
  const [current, setCurrent] = useState({});
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [totalCalories, setTotalCalories] = useState(0);

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

  const fetchData = () => {
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
    cookies
      .get(BACKEND_URL)
      .then((cookie) => {
        // console.log(cookie);
        if (Object.keys(cookie).length === 0) {
          throw new Error('cookie empty');
        }
        const {
          token: { value },
        } = cookie;
        axios
          .get(
            `${BACKEND_URL}/api/diary?user_id=5f607f85a586e00e416f2124&range=1&date=${
              Object.keys(getSelectedDate())[0]
            }`,
            {
              headers: {
                Authorization: `Bearer ${value}`,
              },
            },
          )
          .then(({ data }) => {
            setDiaryByDate(Object.keys(getSelectedDate())[0], data);
          })
          .catch((err) => {
            console.log('axios: ', err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // handle refresh
  // useFocusEffect(
  //   React.useCallback(() => {
  //     console.log({ selectedDate: getSelectedDate() });

  //     fetchData();
  //   }, [navigation]),
  // );

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [getSelectedDate, isFocused, current]);

  return (
    <React.Fragment>
      <Portal>
        <Dialog
          visible={showCalendarModal}
          onDismiss={() => setShowCalendarModal(false)}>
          <Calendar
            pagingEnabled={true}
            markedDates={getSelectedDate()}
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
        arrowLeftOnPress={() =>
          handleCalendarButton(Object.keys(getSelectedDate())[0], -1)
        }
        arrowRightOnPress={() =>
          handleCalendarButton(Object.keys(getSelectedDate())[0], 1)
        }
        dateOnPress={() => setShowCalendarModal(true)}
        date={Object.keys(getSelectedDate())[0]}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <DiaryProgress progress={totalCalories} limit={2500} />
        <FoodTable
          name="Breakfast"
          foods={current.breakfast}
          selectedDate={Object.keys(getSelectedDate())[0]}
          fetchData={fetchData}
        />
        <FoodTable
          name="Lunch"
          foods={current.lunch}
          selectedDate={Object.keys(getSelectedDate())[0]}
          fetchData={fetchData}
        />
        <FoodTable
          name="Dinner"
          foods={current.dinner}
          selectedDate={Object.keys(getSelectedDate())[0]}
          fetchData={fetchData}
        />
        <FoodTable
          name="Snacks"
          backgroundColor={colors.triadic}
          foods={current.snacks}
          selectedDate={Object.keys(getSelectedDate())[0]}
          fetchData={fetchData}
        />
      </ScrollView>
    </React.Fragment>
  );
};

export default withTheme(Diary);
