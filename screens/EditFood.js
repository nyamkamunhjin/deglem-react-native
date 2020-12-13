import React, { useContext, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import { Button, DataTable, Text } from 'react-native-paper';
import DiaryAPI from '../api/DiaryAPI';
import cookieContext from '../context/cookie-context';

import _ from 'lodash';

import FoodStats from '../components/FoodStats/FoodStats';
import { useTranslation } from 'react-i18next';

import { cleanUpFood } from '../functions/functions';

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
    <View style={styles.container}>
      {food && (
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
        </DataTable>
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
  circles: {
    margin: 10,
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
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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

export default EditFood;
