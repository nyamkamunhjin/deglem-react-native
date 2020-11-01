import { StackActions } from '@react-navigation/native';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import NumericInput from 'react-native-numeric-input';
import { Button, DataTable } from 'react-native-paper';
import DiaryAPI from '../api/DiaryAPI';
import cookieContext from '../context/cookie-context';
import { BACKEND_URL } from '../env.config';
import _ from 'lodash';
import FoodStats from '../components/FoodStats/FoodStats';
import { useTranslation } from 'react-i18next';
/**
 * @author
 * @function AddFood
 **/
const AddFood = ({ route, navigation }) => {
  const { t } = useTranslation();
  // console.log(route.params);
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
    <View>
      {food && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <DataTable>
            <DataTable.Row>
              <DataTable.Cell>{food.name}</DataTable.Cell>
              <DataTable.Cell numeric>
                <Button
                  mode="contained"
                  onPress={handleFoodAdd}
                  color={'white'}>
                  Add
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

            <View style={styles.main}>
              <FoodStats food={food} serving={serving} />
              <DataTable>
                {Object.entries(getAdditionalNutrients(food)).map(
                  ([key, value], index) => (
                    <DataTable.Row key={index}>
                      <DataTable.Cell>{t(_.startCase(key))}</DataTable.Cell>
                      <DataTable.Cell numeric>
                        {parseInt(value, 10)}
                      </DataTable.Cell>
                    </DataTable.Row>
                  ),
                )}
              </DataTable>
            </View>
          </DataTable>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    margin: 5,

    alignItems: 'center',
  },

  cell: {
    justifyContent: 'center',
  },
});

export default AddFood;
