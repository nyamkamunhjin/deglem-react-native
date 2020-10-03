import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { withTheme, DataTable, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { countCalories } from '../../functions/functions';

/**
 * @author
 * @function FoodTable
 **/

const FoodTable = (props) => {
  const { name, backgroundColor } = props;
  const navigation = useNavigation();
  const { colors } = props.theme;
  const { foods } = props;

  const styles = StyleSheet.create({
    foodTable: {
      backgroundColor: backgroundColor || colors.accent,
      margin: 5,
      borderRadius: 10,
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowColor: '#000',
      shadowOpacity: 1,
      shadowRadius: 1,
      elevation: 1,
    },
    addButton: {
      alignSelf: 'flex-end',
      width: 150,
      textAlign: 'right',
      borderBottomRightRadius: 10,
      overflow: 'hidden',
    },
  });

  const { foodTable, addButton } = styles;
  return (
    <View style={foodTable}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>{name}</DataTable.Title>
          <DataTable.Title numeric>Serving</DataTable.Title>
          <DataTable.Title numeric>{countCalories(foods)}</DataTable.Title>
        </DataTable.Header>
        {foods &&
          foods.map((data, index) => {
            return (
              <DataTable.Row
                key={index}
                onLongPress={props.onLongPress || null}
                onPress={() =>
                  navigation.navigate('edit-food', {
                    addTo: name,
                    food: data,
                  })
                }>
                <DataTable.Cell>{data.food.name}</DataTable.Cell>
                <DataTable.Cell numeric>{data.serving}</DataTable.Cell>
                <DataTable.Cell numeric>
                  {parseInt(data.food.calories * data.serving)}
                </DataTable.Cell>
              </DataTable.Row>
            );
          })}
      </DataTable>
      <Button
        compact={true}
        style={addButton}
        mode="contained"
        icon={({ color }) => <Icon name="plus" size={15} color={color} />}
        onPress={() =>
          navigation.navigate('search-food', {
            name,
            selectedDate: props.selectedDate,
          })
        }
        uppercase={false}>
        Add
      </Button>
    </View>
  );
};

export default withTheme(FoodTable);
