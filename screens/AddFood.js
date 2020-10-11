import { StackActions } from '@react-navigation/native';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import NumericInput from 'react-native-numeric-input';
import { Button, DataTable } from 'react-native-paper';
import cookieContext from '../context/cookie-context';
import { BACKEND_URL } from '../env.config';

/**
 * @author
 * @function AddFood
 **/
const AddFood = ({ route, navigation }) => {
  // console.log(route.params);
  const [serving, setServing] = useState(1);
  const { addTo, selectedDate, food } = route.params;
  const { cookies } = useContext(cookieContext);

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

    return temp;
  };

  const handleFoodAdd = async () => {
    let data = {
      user_id: '5f607f85a586e00e416f2124',
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
          .post(`${BACKEND_URL}/api/diary/food/add`, data, {
            headers: {
              Authorization: `Bearer ${value}`,
            },
          })
          .then((res) => {
            console.log(res.data);
            navigation.navigate('diary-tab');
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
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
              <View style={styles.temp} />

              <DataTable>
                <DataTable.Header>
                  <DataTable.Title style={styles.cell}>Carbs</DataTable.Title>
                  <DataTable.Title style={styles.cell}>Fat</DataTable.Title>
                  <DataTable.Title style={styles.cell}>Protein</DataTable.Title>
                </DataTable.Header>
                <DataTable.Row>
                  <DataTable.Cell style={styles.cell}>
                    {food.totalCarbohydrates || 0}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.cell}>
                    {food.totalFat || 0}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.cell}>
                    {food.protein || 0}
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
  temp: {
    width: 150,
    height: 150,
    backgroundColor: 'orange',
  },
  cell: {
    justifyContent: 'center',
  },
});

export default AddFood;
