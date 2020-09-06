import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Appbar, Avatar } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Diary from '../../screens/Diary';
import MyGoal from '../../screens/MyGoal';
import Nutrition from '../../screens/Nutrition';
import AccountInfo from '../../screens/AccountInfo';
import BottomNavigator from '../BottomNavigator/BottomNavigator';

/**
 * @author
 * @function StackNavigator
 **/

const Stack = createStackNavigator();

const Header = ({ scene, previous, navigation }) => {
  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  return (
    <Appbar.Header>
      {previous ? (
        <Appbar.BackAction
          onPress={navigation.goBack}
          // color={theme.colors.primary}
        />
      ) : (
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}>
          <Avatar.Image
            size={40}
            source={{
              uri:
                'https://pbs.twimg.com/profile_images/1198779570427703296/sWN8DRoR_400x400.jpg',
            }}
          />
        </TouchableOpacity>
      )}
      <Appbar.Content
        title={previous ? title : <Icon name="twitter" size={40} />}
      />
    </Appbar.Header>
  );
};

const StackNavigator = (props) => {
  return (
    <Stack.Navigator
      initialRouteName="bottom-tabs"
      headerMode="screen"
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <Header scene={scene} previous={previous} navigation={navigation} />
        ),
      }}
      >
      <Stack.Screen name="bottom-tabs" component={BottomNavigator}/>
      <Stack.Screen name="diary" component={Diary} />
      <Stack.Screen name="account-info" component={AccountInfo} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
