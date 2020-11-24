import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { withTheme } from 'react-native-paper';

/**
 * @author
 * @function WeightChart
 **/
const WeightChart = ({ theme, ...props }) => {
  const { colors } = theme;
  const chartConfig = {
    // backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 2, // optional, defaults to 2dp
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

  const screenWidth = Dimensions.get('window').width;
  return (
    <View style={styles.weightChart}>
      <LineChart
        data={{
          labels: [
            'Day 1',
            'Day 2',
            'Day 3',
            'Day 4',
            'Day 5',
            'Day 6',
            'Day 7',
          ],
          datasets: [
            {
              data: [77.8, 77.7, 77.5, 76.9, 77.3, 77.1, 76.8, 80],
            },
          ],
        }}
        width={screenWidth} // from react-native
        height={220}
        // yAxisLabel="$"
        yAxisSuffix="kg"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
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
    // borderRadius: 10,
    backgroundColor: '#efefef',
  },
});
export default withTheme(WeightChart);
