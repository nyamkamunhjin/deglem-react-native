import { StackActions } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import NumericInput from 'react-native-numeric-input';
import { Button, DataTable } from 'react-native-paper';
import { BACKEND_URL } from '../env.config';

/**
 * @author
 * @function EditFood
 **/
const EditFood = ({ route, navigation }) => {
  // console.log(route.params);
  const [serving, setServing] = useState(1);
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

    return temp;
  };

  const handleFoodAdd = async () => {
    let data = {
      filter: {},
      update: {},
    };

    data.filter[`${addTo.toLowerCase()}._id`] = _id;
    data.update[`${addTo.toLowerCase()}.$.serving`] = serving;

    console.log(data);
    await axios
      .put(`${BACKEND_URL}/api/users/dailylog/food/update`, data)
      .then((res) => {
        console.log(res.data);
        navigation.dispatch(StackActions.popToTop());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View>
      <ScrollView>
        <DataTable>
          <DataTable.Row>
            <DataTable.Cell>{food.name}</DataTable.Cell>
            <DataTable.Cell numeric>
              <Button mode="contained" onPress={handleFoodAdd} color={'white'}>
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
            <View style={styles.temp}></View>

            <DataTable>
              <DataTable.Header>
                <DataTable.Title style={styles.cell}>Carbs</DataTable.Title>
                <DataTable.Title style={styles.cell}>Fat</DataTable.Title>
                <DataTable.Title style={styles.cell}>Protein</DataTable.Title>
              </DataTable.Header>
              <DataTable.Row>
                <DataTable.Cell style={styles.cell}>
                  {food.totalCarbohydrates}
                </DataTable.Cell>
                <DataTable.Cell style={styles.cell}>
                  {food.totalFat}
                </DataTable.Cell>
                <DataTable.Cell style={styles.cell}>
                  {food.protein}
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable>

            <DataTable>
              {Object.entries(getAdditionalNutrients(food)).map(
                (entry, index) => (
                  <DataTable.Row key={index}>
                    <DataTable.Cell>{entry[0]}</DataTable.Cell>
                    <DataTable.Cell numeric>{entry[1]}</DataTable.Cell>
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
  temp: {
    width: 150,
    height: 150,
    backgroundColor: 'orange',
  },
  cell: {
    justifyContent: 'center',
  },
});

export default EditFood;