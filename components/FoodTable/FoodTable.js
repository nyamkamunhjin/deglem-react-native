import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet } from 'react-native';
import {
  withTheme,
  DataTable,
  Button,
  Portal,
  Dialog,
  Text,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DiaryAPI from '../../api/DiaryAPI';
import cookieContext from '../../context/cookie-context';
import { countCalories } from '../../functions/functions';

/**
 * @author
 * @function FoodTable
 **/

const FoodTable = (props) => {
  const { t } = useTranslation();
  const { name, backgroundColor, fetchData } = props;
  const { token } = useContext(cookieContext);

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

  const handleDeleteFood = async (item) => {
    console.log(item.name, item._id);

    const { data, err } = await DiaryAPI.removeFood(token, item);

    if (err) {
      console.error(err);
    } else {
      console.log({ data });
      fetchData();
    }
    setShowDeleteDialog(false);
  };

  const { foodTable, addButton } = styles;
  return (
    <View style={foodTable}>
      <Portal>
        <Dialog
          visible={showDeleteDialog}
          onDismiss={() => setShowDeleteDialog(false)}>
          <Dialog.Title>{t('Diary')}</Dialog.Title>
          <Dialog.Actions>
            <Button onPress={() => setShowDeleteDialog(false)}>
              {t('Cancel')}
            </Button>
            <Button onPress={() => handleDeleteFood(deleteItem)}>
              {t('Remove')}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>{t(name)}</DataTable.Title>
          <DataTable.Title numeric>{t('Serving')}</DataTable.Title>
          <DataTable.Title numeric>
            {countCalories(foods)} {t('kcal')}
          </DataTable.Title>
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
                  {parseInt(data.food.calories * data.serving, 10)}
                </DataTable.Cell>
              </DataTable.Row>
            );
          })}
      </DataTable>
      <Button
        compact={true}
        // color={colors.triadic}
        style={addButton}
        mode="contained"
        icon={({ color }) => <Icon name="plus" size={15} color={color} />}
        onPress={
          props.onPress ||
          (() =>
            navigation.navigate('search-food', {
              name,
              selectedDate: props.selectedDate,
            }))
        }
        uppercase={false}>
        <Text>{t('Add')}</Text>
      </Button>
    </View>
  );
};

export default withTheme(FoodTable);
