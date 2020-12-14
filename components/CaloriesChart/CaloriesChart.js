import { useIsFocused } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { ScrollView } from 'react-native-gesture-handler';
import {
  ActivityIndicator,
  Button,
  Divider,
  Menu,
  withTheme,
} from 'react-native-paper';
import StatsApi from '../../api/StatsApi';
import cookieContext from '../../context/cookie-context';
import { calculateTotalCalories } from '../../functions/functions';

/**
 * @author
 * @function CaloriesChart
 **/
const CaloriesChart = (props) => {
  const { token } = useContext(cookieContext);
  const { t } = useTranslation();

  const isFocused = useIsFocused();
  const [days, setDays] = useState(7);
  const [data, setData] = useState(null);
  const [visible, setVisible] = React.useState(false);
  const screenWidth = Dimensions.get('window').width;

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const datePrettier = (date) =>
    new Date(date).toLocaleDateString().slice(0, 5);

  // eslint-disable-next-line no-shadow
  const fetchDiaries = (days) => {
    StatsApi.fetchDiaries(token, new Date(), days).then(({ data: foods }) => {
      // console.log(foods);

      let labels = [];
      let datasets = [
        {
          data: [],
        },
      ];

      foods.map((food) => {
        labels.push(datePrettier(food.date));
        datasets[0].data.push(calculateTotalCalories(food));
      });

      setData({
        labels,
        datasets,
      });
    });
  };

  useEffect(() => {
    if (isFocused) {
      fetchDiaries(days);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, isFocused, days]);

  return (
    <View>
      <View
        style={{
          // paddingTop: 50,
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu}>...</Button>}>
          <Menu.Item
            onPress={() => {
              setDays(7);
              closeMenu();
            }}
            title={t('Week')}
          />
          <Menu.Item
            onPress={() => {
              setDays(31);
              closeMenu();
            }}
            title={t('Month')}
          />
          <Menu.Item
            onPress={() => {
              setDays(365);
              closeMenu();
            }}
            title={t('Year')}
          />
          {/* <Menu.Item onPress={() => setDays(7)} title={t('All')} /> */}
        </Menu>
      </View>
      <ScrollView
        style={styles.weightChart}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {data ? (
          <BarChart
            chartConfig={{
              // backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
              data: data.datasets,
            }}
            data={data}
            // yAxisInterval={1}
            fromZero={true}
            // withCustomBarColorFromData={true}
            // flatColor={true}
            // withInnerLines={false}
            style={{
              margin: 10,
              borderRadius: 5,
            }}
            // verticalLabelRotation={30}
            yAxisSuffix={`${t('kcal')}`}
            width={
              60 * data.labels.length > screenWidth
                ? 60 * data.labels.length
                : screenWidth
            }
            height={220}
            // showBarTops={false}
            showValuesOnTopOfBars={true}
          />
        ) : (
          <ActivityIndicator />
        )}
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
  weightChart: {
    // height: 200,
    // padding: 20,
  },
});
export default withTheme(CaloriesChart);
