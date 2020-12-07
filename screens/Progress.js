import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Title } from 'react-native-paper';

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
    <ScrollView>
      <Title style={globalStyles.center}>{t('Weight')}</Title>
      <WeightChart />
      {/* <Title style={globalStyles.center}>{t('Activity Map')}</Title> */}
      {/* <FoodLogContribution /> */}
    </ScrollView>
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
