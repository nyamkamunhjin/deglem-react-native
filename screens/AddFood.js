import { StackActions } from '@react-navigation/native';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import NumericInput from 'react-native-numeric-input';
import { Button, DataTable, Text } from 'react-native-paper';
import DiaryAPI from '../api/DiaryAPI';
import cookieContext from '../context/cookie-context';

import _ from 'lodash';
import FoodStats from '../components/FoodStats/FoodStats';
import { useTranslation } from 'react-i18next';
import { addToRecentFoods } from '../functions/recentFoods';
import { cleanUpFood } from '../functions/functions';
/**
 * @author
 * @function AddFood
 **/
const AddFood = ({ route, navigation }) => {
  const { t } = useTranslation();
  // console.log(route.params);
  const { user } = useContext(cookieContext);
  const [serving, setServing] = useState(1);
  const { addTo, selectedDate, food } = route.params;
  const { token } = useContext(cookieContext);

  // console.log({ food });

  // console.log();
  const getAdditionalNutrients = (doc) => {
    let temp = {
      ...doc,
    };
    delete temp._id;
    delete temp.name;
    delete temp.protein;
    delete temp.totalCarbohydrates;
    delete temp.totalFat;
    delete temp.serving;
    delete temp.__v;
    delete temp.barcode;
    delete temp.creator;
    delete temp.calories;
    delete temp.recipe;
    delete temp.recipeDescription;
    delete temp.ingredients;

    return temp;
  };

  const handleFoodAdd = async () => {
    let data = {
      diary: {
        date: selectedDate,
        push: {},
      },
    };

    data.diary.push[addTo.toLowerCase()] = [
      {
        serving: serving,
        food: food._id,
      },
    ];

    console.log(data);

    const {
      data: { foodData },
      err,
    } = await DiaryAPI.addFood(token, data);

    if (err) {
      console.error(err);
    } else {
      console.log(foodData);

      navigation.navigate('diary-tab');
    }
  };

  return (
    <View style={styles.container}>
      {food && (
        // <ScrollView showsVerticalScrollIndicator={false}>
        <DataTable>
          <DataTable.Row>
            <DataTable.Cell>{food.name}</DataTable.Cell>
            <DataTable.Cell numeric>
              <Button mode="contained" onPress={handleFoodAdd} color={'white'}>
                {t('Add')}
              </Button>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>{t('Serving size')}</DataTable.Cell>
            <DataTable.Cell numeric>{`${food.serving.size} ${t(
              food.serving.unit,
            )}`}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>{t('Number of serving')}</DataTable.Cell>
            <DataTable.Cell numeric>
              <NumericInput
                // type="up-down"
                valueType="real"
                step={0.1}
                totalWidth={100}
                totalHeight={35}
                rounded
                value={serving}
                onChange={(num) => setServing(num)}
              />
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
        // </ScrollView>
      )}
      <View style={styles.main}>
        <FoodStats food={food} serving={serving} />

        <FlatList
          showsVerticalScrollIndicator={false}
          data={Object.entries(cleanUpFood(food))}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item: [key, value] }) => {
            const { unit } = user.nutritionGoals[key];
            return (
              <View style={styles.nutrients}>
                <Text style={styles.nutrientsText}>{t(_.startCase(key))}</Text>
                <Text style={styles.nutrientsText}>
                  {parseInt(value * serving, 10)} {unit}
                </Text>
              </View>
            );
          }}
          ListEmptyComponent={() => (
            <Text style={{ alignSelf: 'center', marginTop: 20 }}>
              {t('No additional nutrition info added')}
            </Text>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    margin: 5,
    flex: 1,
  },

  cell: {
    justifyContent: 'center',
  },
  nutrients: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'green',
    marginVertical: 15,
    marginHorizontal: 5,
  },
  nutrientsText: {
    fontSize: 14,
  },
});

export default AddFood;
