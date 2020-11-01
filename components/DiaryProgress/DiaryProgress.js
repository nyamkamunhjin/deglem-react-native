import React from 'react';
import { View, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';
import { Text, withTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

/**
 * @author
 * @function DiaryProgress
 **/
const DiaryProgress = ({ theme, progress, limit }) => {
  const { colors, fonts } = theme;
  const { t } = useTranslation();
  const styles = StyleSheet.create({
    container: {
      // backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      margin: 5,
      borderRadius: 10,
    },
    circles: {
      margin: 10,
      // height: 500
    },
  });
  const { container, circles } = styles;

  return (
    <View style={container}>
      <Progress.Circle
        // indeterminate={true}
        style={circles}
        progress={progress / limit || 0}
        size={200}
        strokeCap={'round'}
        allowFontScaling={true}
        formatText={() => (
          <Text style={{ fontFamily: fonts.light.fontFamily, fontSize: 15 }}>
            {`${progress}/${limit} ${t('kcal')}`}
          </Text>
        )}
        showsText={true}
        thickness={5}
        animated={true}
        color={colors.protein}
        unfilledColor={colors.disabled}
        borderWidth={0}
        endAngle={0.5}
        // fill={colors.triadic}
      />
    </View>
  );
};

export default withTheme(DiaryProgress);
