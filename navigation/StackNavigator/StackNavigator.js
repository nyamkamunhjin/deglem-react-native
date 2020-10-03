import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AccountInfo from '../../screens/AccountInfo';
import BottomNavigator from '../BottomNavigator/BottomNavigator';
import { withTheme } from 'react-native-paper';
import Header from '../../components/Header/Header';
import { getHeaderTitle } from '../../functions/getHeaderTitle';
import SearchFood from '../../screens/SearchFood';
import AddFood from '../../screens/AddFood';
import EditFood from '../../screens/EditFood';

/**
 * @author
 * @function StackNavigator
 **/

const Stack = createStackNavigator();

const StackNavigator = (props) => {
  const { colors } = props.theme;

  return (
    <Stack.Navigator
      initialRouteName="Diary"
      headerMode="screen"
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <Header
            scene={scene}
            previous={previous}
            navigation={navigation}
            colors={colors}
          />
        ),
      }}>
      <Stack.Screen
        name="Diary"
        component={BottomNavigator}
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route),
        })}
      />
      <Stack.Screen
        name="account-info"
        component={AccountInfo}
        options={{ title: 'Edit Info' }}
      />
      <Stack.Screen
        name="search-food"
        component={SearchFood}
        options={{ title: 'Search Food' }}
      />
      <Stack.Screen
        name="add-food"
        component={AddFood}
        options={{ title: 'Add Food' }}
      />
      <Stack.Screen
        name="edit-food"
        component={EditFood}
        options={{ title: 'Edit Food' }}
      />
    </Stack.Navigator>
  );
};

export default withTheme(StackNavigator);
