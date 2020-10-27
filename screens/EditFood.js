import { StackActions } from '@react-navigation/native';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import NumericInput from 'react-native-numeric-input';
import { Button, DataTable } from 'react-native-paper';
import DiaryAPI from '../api/DiaryAPI';
import cookieContext from '../context/cookie-context';
import { BACKEND_URL } from '../env.config';
import _ from 'lodash';
import * as Progress from 'react-native-progress';

import { Text } from 'react-native-paper';
import { PieChart } from 'react-native-svg-charts';
import FoodStats from '../components/FoodStats/FoodStats';
/**
 * @author
 * @function EditFood
 **/
const EditFood = ({ route, navigation }) => {
  // console.log(route.params);
  const [serving, setServing] = useState(1);
  const { token } = useContext(cookieContext);

  const {
    food: { _id },
    food: { food },
    addTo,
  } = route.params;
  // console.log(food);
  // console.log('addTo:', addTo);
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
  const handleFoodUpdate = async () => {
    let data = {
      filter: {},
      update: {},
    };

    data.filter[`${addTo.toLowerCase()}._id`] = _id;
    data.update[`${addTo.toLowerCase()}.$.serving`] = serving;

    console.log(data);

    const { data: foodData, err } = DiaryAPI.editFood(token, data);

    if (err) {
      console.error(err);
    } else {
      console.log(foodData);
      navigation.navigate('diary-tab');
    }
  };

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <DataTable>
          <DataTable.Row>
            <DataTable.Cell>{food.name}</DataTable.Cell>
            <DataTable.Cell numeric>
              <Button
                mode="contained"
                onPress={handleFoodUpdate}
                color={'white'}>
                change
              </Button>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Serving size</DataTable.Cell>
            <DataTable.Cell
              numeric>{`${food.serving.size} ${food.serving.unit}`}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Number of serving</DataTable.Cell>
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
                    <DataTable.Cell>{_.startCase(key)}</DataTable.Cell>
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
  circles: {
    margin: 10,
    // height: 500
  },
  graph: {
    flex: 4.5,
    justifyContent: 'center',
    // backgroundColor: 'orange',
  },
  stats: {
    flex: 5.5,
  },
  temp: {
    flexDirection: 'row',
    // height: 150,
    // backgroundColor: 'blue',
    // backgroundColor: 'orange',
  },
  calories: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cell: {
    justifyContent: 'center',
  },
});

export default EditFood;
