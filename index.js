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
import './i18n';

const fontConfig = {
  default: {
    regular: {
      fontFamily: 'Rubik-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Rubik-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Rubik-Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Rubik-Thin',
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
    accent: '#A1D1FE',
    triadic: '#e6e6e6',
    white: '#ffffff',
    protein: '#82c758',
    carbs: '#79c0d1',
    fat: '#f77272',
    // icons: '',
    // text: 'white',
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
