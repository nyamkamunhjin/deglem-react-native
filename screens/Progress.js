import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet } from 'react-native';
import { ContributionGraph } from 'react-native-chart-kit';
import { Title } from 'react-native-paper';
import { concat } from 'react-native-reanimated';
import FoodLogContribution from '../components/FoodLogContribution/FoodLogContribution';
import WeightChart from '../components/WeightChart/WeightChart';
import globalStyles from '../global-styles';

/**
 * @author
 * @function Progress
 **/
const Progress = (props) => {
  const { container } = styles;
  const { t } = useTranslation();
  return (
    <View style={container}>
      <Title style={globalStyles.center}>{t('Weight')}</Title>
      <WeightChart />
      <Title style={globalStyles.center}>{t('Activity Map')}</Title>
      <FoodLogContribution />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Progress;
