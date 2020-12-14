import { useIsFocused } from '@react-navigation/native';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Title } from 'react-native-paper';
import CaloriesChart from '../components/CaloriesChart/CaloriesChart';

import WeightChart from '../components/WeightChart/WeightChart';
import cookieContext from '../context/cookie-context';
import globalStyles from '../global-styles';

/**
 * @author
 * @function Progress
 **/
const Progress = ({ theme, ...props }) => {
  const { container } = styles;

  const { t } = useTranslation();
  return (
    <ScrollView>
      <Title style={globalStyles.center}>{t('Last logged weights')}</Title>
      <WeightChart />
      <Title style={globalStyles.center}>{t('Last logged calories')}</Title>
      <CaloriesChart />
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
