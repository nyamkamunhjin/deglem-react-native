import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { withTheme, DataTable, Button } from 'react-native-paper';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

/**
 * @author
 * @function FoodTable
 **/

const FoodTable = (props) => {
  const { name, backgroundColor } = props;
  const { colors } = props.theme;
  const { foods } = props;

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',

      margin: 5,
      borderRadius: 10,
    },
    foodTable: {
      backgroundColor: backgroundColor || colors.accent,
      margin: 5,
      borderRadius: 10,
    },
    addButton: {
      alignSelf: 'flex-end',
      width: 150,
      textAlign: 'right',
      borderBottomRightRadius: 10,
    },
  });

  const { foodTable, addButton } = styles;

  return (
    <View style={foodTable}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>{name}</DataTable.Title>
          <DataTable.Title numeric>Serving</DataTable.Title>
          <DataTable.Title numeric>
            {foods.reduce((acc, obj) => acc + obj.food.calories, 0)}
          </DataTable.Title>
        </DataTable.Header>
        {foods.map((data) => {
          return (
            <DataTable.Row
              key={data._id}
              onPress={() => console.log('pressed Row')}>
              <DataTable.Cell>{data.food.name}</DataTable.Cell>
              <DataTable.Cell numeric>{data.serving}</DataTable.Cell>
              <DataTable.Cell numeric>{data.food.calories}</DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </DataTable>
      <Button
        compact={true}
        style={addButton}
        mode="contained"
        icon={({ color }) => <Icon name="plus" size={15} color={color} />}
        onPress={() => console.log('food')}
        uppercase={false}>
        Add
      </Button>
    </View>
  );
};

export default withTheme(FoodTable);
