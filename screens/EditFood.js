import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import NumericInput from 'react-native-numeric-input';
import { Button, DataTable } from 'react-native-paper';
import DiaryAPI from '../api/DiaryAPI';
import cookieContext from '../context/cookie-context';

import _ from 'lodash';

import FoodStats from '../components/FoodStats/FoodStats';
import { useTranslation } from 'react-i18next';
/**
 * @author
 * @function EditFood
 **/
const EditFood = ({ route, navigation }) => {
  // console.log(route.params.food.serving);
  const { user } = useContext(cookieContext);

  const { t } = useTranslation();
  const {
    food: { _id },
    food: { food },
    addTo,
  } = route.params;

  const [serving, setServing] = useState(route.params.food.serving || 1);
  const { token } = useContext(cookieContext);

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
      {food && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <DataTable>
            <DataTable.Row>
              <DataTable.Cell>{food.name}</DataTable.Cell>
              <DataTable.Cell numeric>
                <Button
                  mode="contained"
                  onPress={handleFoodUpdate}
                  color={'white'}>
                  {t('Change')}
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
                  ([key, value], index) => {
                    const { unit } = user.nutritionGoals[key];
                    return (
                      <DataTable.Row key={index}>
                        <DataTable.Cell>{t(_.startCase(key))}</DataTable.Cell>
                        <DataTable.Cell numeric>
                          {parseInt(value * serving, 10)} {unit}
                        </DataTable.Cell>
                      </DataTable.Row>
                    );
                  },
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
  circles: {
    margin: 10,
    // height: 500
  },
  graph: {
    flex: 4.5,
    justifyContent: 'center',
  },
  stats: {
    flex: 5.5,
  },
  temp: {
    flexDirection: 'row',
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
