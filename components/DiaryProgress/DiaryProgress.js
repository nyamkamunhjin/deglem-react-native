import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';
import { Text, withTheme } from 'react-native-paper';

/**
 * @author
 * @function DiaryProgress
 **/
const DiaryProgress = ({ theme, progress}) => {
  const { colors, fonts } = theme;
  const { container, circles } = styles;



  return (
    <View style={container}>
      <Progress.Circle
        // indeterminate={true}
        style={circles}
        progress={progress || 0}
        size={150}
        strokeCap={'round'}
        allowFontScaling={true}
        formatText={() => (
          <Text style={{ fontFamily: fonts.light.fontFamily, fontSize: 15 }}>
            567/2500
          </Text>
        )}
        showsText={true}
        thickness={5}
        animated={true}
        color={colors.triadic}
        // unfilledColor={colors.disabled}
        borderWidth={0}
        endAngle={0.5}
        // fill={colors.triadic}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
export default withTheme(DiaryProgress);
