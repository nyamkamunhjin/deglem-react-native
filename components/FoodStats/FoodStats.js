import { random } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet } from 'react-native';
import { Text, withTheme } from 'react-native-paper';
import { PieChart } from 'react-native-svg-charts';

/**
 * @author
 * @function FoodStats
 **/
const FoodStats = ({ food, serving, theme }) => {
  const { colors } = theme;
  const { t } = useTranslation();

  const styles = StyleSheet.create({
    pieChart: { height: 100 },

    calories: {
      fontSize: 25,
    },
    graph: {
      flex: 4.5,
      justifyContent: 'center',
    },
    stats: {
      flex: 5.5,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    temp: {
      flexDirection: 'row',
    },
    cell: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    protein: {
      justifyContent: 'center',
      alignItems: 'center',
      color: colors.protein,
      fontSize: 15,
      marginVertical: 10,
    },
    carbs: {
      justifyContent: 'center',
      alignItems: 'center',
      color: colors.carbs,
      fontSize: 15,
      marginVertical: 10,
    },
    fat: {
      justifyContent: 'center',
      alignItems: 'center',
      color: colors.fat,
      fontSize: 15,
      marginVertical: 10,
    },
  });

  return (
    <View style={styles.temp}>
      <View style={styles.graph}>
        <PieChart
          style={styles.pieChart}
          animate={true}
          outerRadius="100%"
          innerRadius="85%"
          data={[
            parseInt(food.protein, 10) !== 0 && {
              value: food.protein,
              svg: {
                fill: colors.protein,
              },
              key: `pie-stats-${1 + random() * 10}`,
              arc: { outerRadius: '100%', cornerRadius: 5 },
            },
            parseInt(food.totalCarbohydrates, 10) !== 0 && {
              value: food.totalCarbohydrates,
              svg: {
                fill: colors.carbs,
              },
              key: `pie-stats-${2 + random() * 10}`,
              arc: { outerRadius: '100%', cornerRadius: 5 },
            },
            parseInt(food.totalFat, 10) !== 0 && {
              value: food.totalFat,
              svg: {
                fill: colors.fat,
              },
              key: `pie-stats-${3 + random() * 10}`,
              arc: { outerRadius: '100%', cornerRadius: 5 },
            },
          ]}>
          <View style={styles.cell}>
            <Text style={styles.calories}>
              {parseInt(food.calories * serving, 10)}
            </Text>
            <Text style={{ fontSize: 15 }}>{t('kcal')}</Text>
          </View>
        </PieChart>
      </View>
      <View style={styles.stats}>
        <View style={styles.nutrition}>
          <Text style={styles.carbs}>{t('Carbs')}</Text>
          <Text style={{ fontSize: 15 }}>
            {parseInt(food.totalCarbohydrates * serving, 10) || 0} g
          </Text>
        </View>
        <View style={styles.nutrition}>
          <Text style={styles.fat}>{t('Fats')}</Text>
          <Text style={{ fontSize: 15 }}>
            {parseInt(food.totalFat * serving, 10) || 0} g
          </Text>
        </View>
        <View style={styles.nutrition}>
          <Text style={styles.protein}>{t('Protein')}</Text>
          <Text style={{ fontSize: 15 }}>
            {parseInt(food.protein * serving, 10) || 0} g
          </Text>
        </View>
      </View>
    </View>
  );
};

export default withTheme(FoodStats);
