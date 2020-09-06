import React from 'react';
import { Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './DrawerContent';

import Diary from '../../screens/Diary';
import MyGoal from '../../screens/MyGoal';
import Nutrition from '../../screens/Nutrition';
import AccountInfo from '../../screens/AccountInfo';
import StackNavigator from '../StackNavigator/StackNavigator';
import BottomNavigator from '../BottomNavigator/BottomNavigator';

const Drawer = createDrawerNavigator();

export const RootNavigator = (props) => {
  return (
    <Drawer.Navigator
      initialRouteName="tab"
      drawerContent={props => <DrawerContent {...props} />}
      // drawerType={'permanent'}
    >
      <Drawer.Screen name="stack" component={StackNavigator} />

    </Drawer.Navigator>
  );
};
