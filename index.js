/**
 * @format
 */
import React from 'react';
import { AppRegistry, StatusBar } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import {
  DefaultTheme,
  Provider as PaperProvider,
  configureFonts,
} from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';

const fontConfig = {
  default: {
    regular: {
      fontFamily: 'Montserrat-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Montserrat-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Montserrat-Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Montserrat-Thin',
      fontWeight: 'normal',
    },
  },
};

export const theme = {
  ...DefaultTheme,
  roundness: 2,
  myOwnProperty: true,
  fonts: configureFonts(fontConfig),
  colors: {
    ...DefaultTheme.colors,
    primary: '#ffa202',
    accent: '#85cdff',
    triadic: '#8bff58',
    white: '#ffffff',
    protein: '#82c758',
    carbs: '#79c0d1',
    fat: '#f77272',
    // icons: '',
    // text: '#ffffff'
  },
};

function Main() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <StatusBar backgroundColor={theme.colors.primary} />
        <App />
      </NavigationContainer>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
