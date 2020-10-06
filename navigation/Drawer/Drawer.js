import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './DrawerContent';

import StackNavigator from '../StackNavigator/StackNavigator';

import { withTheme } from 'react-native-paper';

const Drawer = createDrawerNavigator();

const RootNavigator = (props) => {
  const { colors } = props.theme;
  return (
    <Drawer.Navigator
      initialRouteName="stack"
      drawerContent={(drawerProps) => <DrawerContent {...drawerProps} />}

      // drawerStyle={{ backgroundColor: colors.accent}}
      // drawerType={'permanent'}
    >
      <Drawer.Screen name="stack" component={StackNavigator} />
    </Drawer.Navigator>
  );
};

export default withTheme(RootNavigator);
