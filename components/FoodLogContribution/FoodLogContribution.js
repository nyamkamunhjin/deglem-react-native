import { useIsFocused } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { ContributionGraph } from 'react-native-chart-kit';
import DiaryAPI from '../../api/DiaryAPI';
import cookieContext from '../../context/cookie-context';
import { formatDate } from '../../functions/functions';

/**
 * @author
 * @function FoodLogContribution
 **/
const FoodLogContribution = (props) => {
  const { container } = styles;
  const { t } = useTranslation();
  const { token } = useContext(cookieContext);
  const isFocused = useIsFocused();
  const [commits, setCommits] = useState([]);
  const commitsData = [
    { date: '2017-01-02', count: 1 },
    { date: '2017-01-03', count: 2 },
    { date: '2017-01-04', count: 3 },
    { date: '2017-01-05', count: 4 },
    { date: '2017-01-06', count: 5 },
    { date: '2017-01-30', count: 2 },
    { date: '2017-01-31', count: 3 },
    { date: '2017-03-01', count: 2 },
    { date: '2017-04-02', count: 4 },
    { date: '2017-03-05', count: 2 },
    { date: '2017-02-30', count: 4 },
  ];

  useEffect(() => {
    if (isFocused) {
      DiaryAPI.getStats(token).then(({ data }) => {
        // console.log(data);
        const commitos = data.map(({ date }) => ({
          date: formatDate(date),
          count: 4,
        }));
        console.log(commitos);
        setCommits(commitos);
      });
    }
  }, [token, isFocused]);

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
    <View style={container}>
      <ContributionGraph
        values={commits}
        endDate={new Date('2021-01-01')}
        numDays={105}
        width={screenWidth}
        height={220}
        // horizontal={false}
        chartConfig={chartConfig}
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
});
export default FoodLogContribution;
