/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import { render, fireEvent } from '@testing-library/react-native';
import BottomNavigator from '../navigation/BottomNavigator/BottomNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';

import { theme } from '../index';

describe('components', () => {
  test('BottomNavigator render test', async () => {
    const tree = render(
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <BottomNavigator />
        </NavigationContainer>
        ,
      </PaperProvider>,
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
