import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, withTheme } from 'react-native-paper';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FoodTable from '../components/FoodTable/FoodTable';

/**
 * @author
 * @function Diary
 **/

const testData = {
  _id: '5f60875bfa98a910d541160a',
  date: '2020-09-15',
  user_id: '5f607f85a586e00e416f2124',
  breakfast: [
    {
      _id: '5f608ed34c7b1910ecfd3e2f',
      serving: 5,
      food: {
        serving: { size: 100, unit: 'gram', servingPerContainer: 1 },
        _id: '5f6082d1467bac0f6bd69686',
        name: 'Milk, human',
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
      _id: '5f608f1795df4111071ed5b0',
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
  lunch: [],
  dinner: [],
  snacks: [],
  __v: 0,
};

const Diary = ({ navigation, theme }) => {
  const { colors, fonts } = theme;
  const [current, setCurrent] = useState(testData)
  const [diaries, setDiaries] = useState([testData, testData, testData]);

  const getDiaryByDate = (date, diaries) => {
    diaries.filter(diary => {
      return diary.date === date;
    })
  }


  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      margin: 5,
      borderRadius: 10,
    },
    circles: {
      margin: 10,
      // height: 500
    },
    addButton: {
      alignSelf: 'flex-end',
      width: 150,
      textAlign: 'right',
      borderBottomRightRadius: 10,
    },
  });

  const {
    container,
    circles,
  } = styles;

  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setProgress(2400 / 2500);
  }, []);

  return (
    <View>
      <ScrollView>
        <View style={container}>
          <Progress.Circle
            // indeterminate={true}
            style={circles}
            progress={progress}
            size={150}
            strokeCap={'round'}
            allowFontScaling={true}
            formatText={() => (
              <Text
                style={{ fontFamily: fonts.light.fontFamily, fontSize: 15 }}>
                567/2500
              </Text>
            )}
            showsText={true}
            thickness={5}
            animated={true}
            color={colors.triadic}
            // unfilledColor={colors.disabled}
            borderWidth={0}
            endAngle={0.5}
            // fill={colors.triadic}
          />
        </View>
        <FoodTable name="Breakfast" foods={current.breakfast}/>
        <FoodTable name="Lunch" foods={current.lunch}/>
        <FoodTable name="Dinner" foods={current.dinner}/>
        <FoodTable name="Snacks" backgroundColor={colors.triadic} foods={current.snacks}/>
      </ScrollView>
    </View>
  );
};

export default withTheme(Diary);
