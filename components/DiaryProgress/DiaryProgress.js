import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
// import * as Progress from 'react-native-progress';
import { Text, withTheme, ProgressBar, Button } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import {
  Grid,
  LineChart,
  ProgressCircle,
  YAxis,
} from 'react-native-svg-charts';
import { getNutritionProgress } from '../../functions/functions';
import cookieContext from '../../context/cookie-context';
import { percentageToGram } from '../../functions/nutritionList';
import _ from 'lodash';
import globalStyles from '../../global-styles';

/**
 * @author
 * @function DiaryProgress
 **/
const DiaryProgress = ({ theme, progress, limit, diary }) => {
  const { colors, fonts } = theme;

  const { user } = useContext(cookieContext);

  const [macros, setMacros] = useState({});
  const { t } = useTranslation();

  useEffect(() => {
    const extractMacros = () => {
      // console.log(getNutritionProgress(diary));
      const { protein, totalCarbohydrates, totalFat } = getNutritionProgress(
        diary,
      );
      setMacros({ protein, totalCarbohydrates, totalFat });
    };
    extractMacros();
  }, [diary, user]);
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      borderRadius: 10,
    },
    pieChart: { height: 150 },
    circles: {
      margin: 10,
      height: 150,
    },
    left: {
      padding: 10,

      flex: 5,
    },
    right: {
      padding: 10,
      justifyContent: 'center',
      flex: 5,
    },
    calories: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    macros: {
      margin: 10,
    },
    button: {
      width: 20,
    },
    weightChart: {
      height: 200,
      flexDirection: 'row',
      margin: 15,
    },
  });

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.left}>
          <ProgressCircle
            style={styles.circles}
            progress={progress / limit || 0}
            progressColor={colors.protein}>
            <View style={styles.calories}>
              <Text style={{ fontSize: 14 }}>
                {`${progress}/${limit} ${t('kcal')}`}
              </Text>
            </View>
          </ProgressCircle>
        </View>
        <View style={styles.right}>
          {macros &&
            user &&
            Object.entries(macros).map(([key, value], index) => {
              const convert = percentageToGram(
                key,
                user.nutritionGoals.calories.value,
                user.nutritionGoals[key].value,
              );

              return (
                <View style={styles.macros} key={index}>
                  <View style={globalStyles.rowSpaceBetween}>
                    <Text>{t(_.startCase(key))}</Text>
                    <Text>
                      {value || 0}/{convert} {user.nutritionGoals[key].unit}
                    </Text>
                  </View>

                  <ProgressBar
                    color={
                      key === 'protein'
                        ? colors.protein
                        : key === 'totalFat'
                        ? colors.fat
                        : key === 'totalCarbohydrates'
                        ? colors.carbs
                        : colors.primary
                    }
                    style={{ borderRadius: 10 }}
                    progress={value / convert}
                  />
                </View>
              );
            })}
        </View>
      </View>
      <View style={{ margin: 15 }}>
        <View style={globalStyles.rowSpaceBetween}>
          <Text>{t('Days left')}</Text>
          <Text>
            {28 || 0}/{90} {t('Day')}
          </Text>
        </View>
        <ProgressBar style={{ borderRadius: 10 }} progress={0.3} />
      </View>
    </View>
  );
};

export default withTheme(DiaryProgress);
