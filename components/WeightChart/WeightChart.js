import { useIsFocused } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { ActivityIndicator, withTheme } from 'react-native-paper';
import StatsApi from '../../api/StatsApi';
import cookieContext from '../../context/cookie-context';
import { formatDate } from '../../functions/functions';

/**
 * @author
 * @function WeightChart
 **/
const WeightChart = ({ theme, ...props }) => {
  const { colors } = theme;
  const { token } = useContext(cookieContext);
  const [weights, setWeights] = useState(null);
  const isFocused = useIsFocused();
  const chartConfig = {
    // backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 1, // optional, defaults to 2dp
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
  };

  const datePrettier = (date) =>
    new Date(date).toLocaleDateString().slice(0, 5);

  const weightDateSorter = (data) =>
    data.sort((a, b) => new Date(a.date) - new Date(b.date));

  const arrayLimiter = (arr, limit) => {
    if (arr.length < limit) return arr;

    return arr.slice(arr.length - limit, arr.length);
  };

  useEffect(() => {
    if (isFocused) {
      StatsApi.fetchWeights(token).then(({ data }) => {
        // console.log(data[0].weights);
        // console.log(data[0].weights);
        let labels = [];
        let datasets = [{ data: [] }];

        // for (let i = 0; i < 31; i++) {
        //   // labels.push('11/22');
        //   datasets[0].data.push(Math.random() * 100);
        // }
        data[0].weights = weightDateSorter(data[0].weights);

        arrayLimiter(data[0].weights, 10).map(({ date, weight }) => {
          labels.push(datePrettier(date));
          datasets[0].data.push(weight);
        });
        // console.log(labels, datasets);

        setWeights({ labels, datasets });
      });
    }
  }, [token, isFocused]);
  const screenWidth = Dimensions.get('window').width;
  return (
    <View style={styles.weightChart}>
      {weights ? (
        <LineChart
          data={weights}
          width={screenWidth}
          height={220}
          yAxisSuffix="kg"
          yAxisInterval={1}
          chartConfig={chartConfig}
          bezier
          style={{
            margin: 10,
            borderRadius: 5,
          }}
        />
      ) : (
        <ActivityIndicator size="large" />
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
  weightChart: {
    // height: 200,
    // padding: 20,
  },
});
export default withTheme(WeightChart);
