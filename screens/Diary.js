import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Dialog, Portal, withTheme, Button } from 'react-native-paper';

import FoodTable from '../components/FoodTable/FoodTable';

import CalendarSwipe from '../components/Calendar/CalendarSwipe';
import DiaryProgress from '../components/DiaryProgress/DiaryProgress';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import { countCalories, formatDate } from '../functions/functions';

/**
 * @author
 * @function Diary
 **/

const Diary = ({ theme }) => {
  const { colors, fonts } = theme;
  const [current, setCurrent] = useState({});
  const [diaries, setDiaries] = useState([]);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [selectedDate, setSelectedDate] = useState({
    '2020-09-22': { selected: true },
  });
  const [totalCalories, setTotalCalories] = useState(0);

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
    const calculateTotalCalories = (today) => {
      const { breakfast, lunch, dinner, snacks } = today;

      return (
        countCalories(breakfast) +
        countCalories(lunch) +
        countCalories(dinner) +
        countCalories(snacks)
      );
    };

    setTotalCalories(calculateTotalCalories(current));
  }, [current]);

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
        <Dialog
          visible={showCalendarModal}
          onDismiss={() => setShowCalendarModal(false)}>
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
        </Dialog>
        <Dialog
          visible={showDeleteDialog}
          onDismiss={() => setShowDeleteDialog(false)}>
          <Dialog.Title>Diary</Dialog.Title>
          <Dialog.Actions>
            <Button onPress={() => console.log('Cancel')}>Cancel</Button>
            <Button onPress={() => console.log('Remove')}>Remove</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <CalendarSwipe
        arrowLeftOnPress={() =>
          handleCalendarButton(Object.keys(selectedDate)[0], -1)
        }
        arrowRightOnPress={() =>
          handleCalendarButton(Object.keys(selectedDate)[0], 1)
        }
        dateOnPress={() => setShowCalendarModal(true)}
        date={Object.keys(selectedDate)[0]}
      />
      <ScrollView>
        <DiaryProgress progress={totalCalories} limit={2500} />
        <FoodTable
          name="Breakfast"
          foods={current.breakfast}
          onLongPress={() => setShowDeleteDialog(true)}
        />
        <FoodTable
          name="Lunch"
          foods={current.lunch}
          onLongPress={() => setShowDeleteDialog(true)}
        />
        <FoodTable
          name="Dinner"
          foods={current.dinner}
          onLongPress={() => setShowDeleteDialog(true)}
        />
        <FoodTable
          name="Snacks"
          backgroundColor={colors.triadic}
          foods={current.snacks}
          onLongPress={() => setShowDeleteDialog(true)}
        />
      </ScrollView>
    </React.Fragment>
  );
};

export default withTheme(Diary);
