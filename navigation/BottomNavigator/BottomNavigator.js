import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

/**
 * @author
 * @function BottomNavigator
 **/

import Diary from '../../screens/Diary';
import MyGoal from '../../screens/MyGoal';
import Nutrition from '../../screens/Nutrition';
import { withTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

const Tab = createMaterialBottomTabNavigator();

const BottomNavigator = (props) => {
  const { t } = useTranslation();
  const { colors } = props.theme;

  return (
    <Tab.Navigator
      initialRouteName="diary-tab"
      activeColor={colors.primary}
      barStyle={{ backgroundColor: colors.white }}
      shifting={true}>
      <Tab.Screen
        name="diary-tab"
        component={Diary}
        options={{
          tabBarLabel: t('Diary'),
          tabBarIcon: ({ color }) => (
            <Icon name="notebook" color={color} size={15} />
          ),
          title: 'Diary',
        }}
      />
      <Tab.Screen
        name="mygoal-tab"
        component={MyGoal}
        options={{
          tabBarLabel: t('My Goal'),
          tabBarIcon: ({ color }) => (
            <Icon name="trophy" color={color} size={15} />
          ),
          title: 'My Goal',
        }}
      />
      <Tab.Screen
        name="nutrition-tab"
        component={Nutrition}
        options={{
          tabBarLabel: t('Nutrition'),
          tabBarIcon: ({ color }) => (
            <Icon name="nutrition" color={color} size={15} />
          ),
          title: 'Nutrition',
        }}
      />
    </Tab.Navigator>
  );
};

export default withTheme(BottomNavigator);
