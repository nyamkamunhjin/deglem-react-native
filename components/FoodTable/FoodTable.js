import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  withTheme,
  DataTable,
  Button,
  Portal,
  Dialog,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BACKEND_URL } from '../../env.config';
import { countCalories } from '../../functions/functions';

/**
 * @author
 * @function FoodTable
 **/

const FoodTable = (props) => {
  const { name, backgroundColor, fetchData } = props;
  const navigation = useNavigation();
  const { colors } = props.theme;
  const { foods } = props;

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);

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

  const handleDeleteFood = (item) => {
    console.log(item.name, item._id);

    axios
      .delete(`${BACKEND_URL}/api/users/dailylog/food/delete`, {
        headers: {
          Authorization: 'Bearer 123',
        },
        params: {
          name: item.name,
          _id: item._id,
        },
      })
      .then((res) => console.log({ data: res.data }))
      .catch((err) => {
        console.error({ err });
      });

    // console.log(data);
    setShowDeleteDialog(false);
    fetchData();
  };

  const { foodTable, addButton } = styles;
  return (
    <View style={foodTable}>
      <Portal>
        <Dialog
          visible={showDeleteDialog}
          onDismiss={() => setShowDeleteDialog(false)}>
          <Dialog.Title>Diary</Dialog.Title>
          <Dialog.Actions>
            <Button onPress={() => setShowDeleteDialog(false)}>Cancel</Button>
            <Button onPress={() => handleDeleteFood(deleteItem)}>Remove</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
                onLongPress={() => {
                  setShowDeleteDialog(true);
                  setDeleteItem({
                    name,
                    _id: data._id,
                  });
                }}
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
