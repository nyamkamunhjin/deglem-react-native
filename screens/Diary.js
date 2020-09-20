import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Modal, Portal, Text, withTheme } from 'react-native-paper';

import FoodTable from '../components/FoodTable/FoodTable';
import Swiper from 'react-native-swiper';
import CalendarSwipe from '../components/Calendar/CalendarSwipe'
import DiaryProgress from '../components/DiaryProgress/DiaryProgress';
import { Calendar, CalendarList } from 'react-native-calendars';

/**
 * @author
 * @function Diary
 **/

const testData = {
  _id: '5f60875bfa98a9ewq10d541160a',
  date: '2020-09-15',
  user_id: '5f607f85a5eqw86e00e416f2124',
  breakfast: [
    {
      _id: '5f608ed34eqwc7b1910ecfd3e2f',
      serving: 5,
      food: {
        serving: { size: 100, unit: 'gram', servingPerContainer: 1 },
        _id: '5f6082d1ewq467bac0f6bd69686',
        name: 'Milk, Cow',
        calories: 70,
        protein: 1.03,
        totalCarbohydrates: 6.89,
        sugars: 6.89,
        dietaryFibers: 0,
        totalFat: 4.38,
        saturatedFat: 2.009,
        monoUnsaturatedFat: 1.658,
        polyUnsaturatedFat: 0.497,
        cholestrol: 14,
        vitaminA: 61,
        vitaminC: 5,
        vitaminD: 0.1,
        calcium: 32,
        iron: 0.03,
        potassium: 51,
        sodium: 17,
        __v: 0,
      },
    },
    {
      _id: '5f608f17e95df4111071ed5b0',
      serving: 5.6,
      food: {
        serving: { size: 100, unit: 'gram', servingPerContainer: 1 },
        _id: '5f6082d1wq467bac0f6bd69686',
        name: 'Chocolate cake',
        calories: 700,
        protein: 1.03,
        totalCarbohydrates: 6.89,
        sugars: 6.89,
        dietaryFibers: 0,
        totalFat: 4.38,
        saturatedFat: 2.009,
        monoUnsaturatedFat: 1.658,
        polyUnsaturatedFat: 0.497,
        cholestrol: 14,
        vitaminA: 61,
        vitaminC: 5,
        vitaminD: 0.1,
        calcium: 32,
        iron: 0.03,
        potassium: 51,
        sodium: 17,
        __v: 0,
      },
    },
  ],
  lunch: [
    {
      _id: '5f608ed34eqwc7b1910ecfd3e2f',
      serving: 5,
      food: {
        serving: { size: 100, unit: 'gram', servingPerContainer: 1 },
        _id: '5f6082d1ewq467bac0f6bd69686',
        name: 'Milk, Cow',
        calories: 70,
        protein: 1.03,
        totalCarbohydrates: 6.89,
        sugars: 6.89,
        dietaryFibers: 0,
        totalFat: 4.38,
        saturatedFat: 2.009,
        monoUnsaturatedFat: 1.658,
        polyUnsaturatedFat: 0.497,
        cholestrol: 14,
        vitaminA: 61,
        vitaminC: 5,
        vitaminD: 0.1,
        calcium: 32,
        iron: 0.03,
        potassium: 51,
        sodium: 17,
        __v: 0,
      },
    },
    {
      _id: '5f608f17e95df4111071ed5b0',
      serving: 5.6,
      food: {
        serving: { size: 100, unit: 'gram', servingPerContainer: 1 },
        _id: '5f6082d1wq467bac0f6bd69686',
        name: 'Chocolate cake',
        calories: 700,
        protein: 1.03,
        totalCarbohydrates: 6.89,
        sugars: 6.89,
        dietaryFibers: 0,
        totalFat: 4.38,
        saturatedFat: 2.009,
        monoUnsaturatedFat: 1.658,
        polyUnsaturatedFat: 0.497,
        cholestrol: 14,
        vitaminA: 61,
        vitaminC: 5,
        vitaminD: 0.1,
        calcium: 32,
        iron: 0.03,
        potassium: 51,
        sodium: 17,
        __v: 0,
      },
    },
  ],
  dinner: [
    {
      _id: '5f608ed34eqwc7b1910ecfd3e2f',
      serving: 5,
      food: {
        serving: { size: 100, unit: 'gram', servingPerContainer: 1 },
        _id: '5f6082d1ewq467bac0f6bd69686',
        name: 'Milk, Cow',
        calories: 70,
        protein: 1.03,
        totalCarbohydrates: 6.89,
        sugars: 6.89,
        dietaryFibers: 0,
        totalFat: 4.38,
        saturatedFat: 2.009,
        monoUnsaturatedFat: 1.658,
        polyUnsaturatedFat: 0.497,
        cholestrol: 14,
        vitaminA: 61,
        vitaminC: 5,
        vitaminD: 0.1,
        calcium: 32,
        iron: 0.03,
        potassium: 51,
        sodium: 17,
        __v: 0,
      },
    },
    {
      _id: '5f608f17e95df4111071ed5b0',
      serving: 5.6,
      food: {
        serving: { size: 100, unit: 'gram', servingPerContainer: 1 },
        _id: '5f6082d1wq467bac0f6bd69686',
        name: 'Chocolate cake',
        calories: 700,
        protein: 1.03,
        totalCarbohydrates: 6.89,
        sugars: 6.89,
        dietaryFibers: 0,
        totalFat: 4.38,
        saturatedFat: 2.009,
        monoUnsaturatedFat: 1.658,
        polyUnsaturatedFat: 0.497,
        cholestrol: 14,
        vitaminA: 61,
        vitaminC: 5,
        vitaminD: 0.1,
        calcium: 32,
        iron: 0.03,
        potassium: 51,
        sodium: 17,
        __v: 0,
      },
    },
  ],
  snacks: [
    {
      _id: '5f608f179e5df4111071ed5b0',
      serving: 5.6,
      food: {
        serving: { size: 100, unit: 'gram', servingPerContainer: 1 },
        _id: '5f6082ed1467bac0f6bd69686',
        name: 'Chocolate cake',
        calories: 700,
        protein: 1.03,
        totalCarbohydrates: 6.89,
        sugars: 6.89,
        dietaryFibers: 0,
        totalFat: 4.38,
        saturatedFat: 2.009,
        monoUnsaturatedFat: 1.658,
        polyUnsaturatedFat: 0.497,
        cholestrol: 14,
        vitaminA: 61,
        vitaminC: 5,
        vitaminD: 0.1,
        calcium: 32,
        iron: 0.03,
        potassium: 51,
        sodium: 17,
        __v: 0,
      },
    },
    {
      _id: '5f608f1795df4q111071ed5b0',
      serving: 5.6,
      food: {
        serving: { size: 100, unit: 'gram', servingPerContainer: 1 },
        _id: '5f6082d1467baqc0f6bd69686',
        name: 'Chocolate cake',
        calories: 700,
        protein: 1.03,
        totalCarbohydrates: 6.89,
        sugars: 6.89,
        dietaryFibers: 0,
        totalFat: 4.38,
        saturatedFat: 2.009,
        monoUnsaturatedFat: 1.658,
        polyUnsaturatedFat: 0.497,
        cholestrol: 14,
        vitaminA: 61,
        vitaminC: 5,
        vitaminD: 0.1,
        calcium: 32,
        iron: 0.03,
        potassium: 51,
        sodium: 17,
        __v: 0,
      },
    },
    {
      _id: '5f608f1795df4q1110w71ed5b0',
      serving: 5.6,
      food: {
        serving: { size: 100, unit: 'gram', servingPerContainer: 1 },
        _id: '5f6082d1467qbac0f6bd69686',
        name: 'Chocolate cake',
        calories: 700,
        protein: 1.03,
        totalCarbohydrates: 6.89,
        sugars: 6.89,
        dietaryFibers: 0,
        totalFat: 4.38,
        saturatedFat: 2.009,
        monoUnsaturatedFat: 1.658,
        polyUnsaturatedFat: 0.497,
        cholestrol: 14,
        vitaminA: 61,
        vitaminC: 5,
        vitaminD: 0.1,
        calcium: 32,
        iron: 0.03,
        potassium: 51,
        sodium: 17,
        __v: 0,
      },
    },
    {
      _id: '5f608f1795df4111071ded5b0',
      serving: 5.6,
      food: {
        serving: { size: 100, unit: 'gram', servingPerContainer: 1 },
        _id: '5f6082d1467bac0f6bd69686',
        name: 'Chocolate cake',
        calories: 700,
        protein: 1.03,
        totalCarbohydrates: 6.89,
        sugars: 6.89,
        dietaryFibers: 0,
        totalFat: 4.38,
        saturatedFat: 2.009,
        monoUnsaturatedFat: 1.658,
        polyUnsaturatedFat: 0.497,
        cholestrol: 14,
        vitaminA: 61,
        vitaminC: 5,
        vitaminD: 0.1,
        calcium: 32,
        iron: 0.03,
        potassium: 51,
        sodium: 17,
        __v: 0,
      },
    },
  ],
  __v: 0,
};

const Diary = ({ navigation, theme }) => {
  const { colors, fonts } = theme;
  const [current, setCurrent] = useState(testData);
  const [diaries, setDiaries] = useState([testData, testData, testData]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState({
    '2020-09-21': { selected: true },
  });

  const handleDateSelect = (day) => {
    // console.log(day)
    let pair = {};
    pair[day.dateString] = { selected: true };
    // console.log(pair);
    setSelectedDate(pair);
    setShowModal(false);
  };

  const getDiaryByDate = (date, diaries) => {
    diaries.filter((diary) => {
      return diary.date === date;
    });
  };

  useEffect(() => {}, []);

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
