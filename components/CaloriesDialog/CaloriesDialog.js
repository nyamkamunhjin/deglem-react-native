import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  ActivityIndicator,
  Button,
  Dialog,
  TextInput,
  withTheme,
} from 'react-native-paper';
import globalStyles from '../../global-styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import UserAPI from '../../api/UserAPI';
import flatten from 'flat';

/**
 * @author
 * @function CaloriesDialog
 **/
const CaloriesDialog = ({
  nutritionGoals,
  loading,
  setLoading,
  setShowDialog,
  setUser,
  theme,
  token,
}) => {
  const { colors } = theme;
  const [calories, setCalories] = useState(nutritionGoals.calories.value);
  const [protein, setProtein] = useState(nutritionGoals.protein.value);
  const [carbohydrates, setCarbohydrates] = useState(
    nutritionGoals.totalCarbohydrates.value,
  );
  const [fat, setFat] = useState(nutritionGoals.totalFat.value);

  const getSum = () => {
    const p = isNaN(parseInt(protein, 10)) ? 0 : parseInt(protein, 10);
    const c = isNaN(parseInt(carbohydrates, 10))
      ? 0
      : parseInt(carbohydrates, 10);
    const f = isNaN(parseInt(fat, 10)) ? 0 : parseInt(fat, 10);

    return p + c + f;
  };
  const handleChange = async () => {
    setLoading(true);
    let change = {
      nutritionGoals: {
        calories: {
          value: calories,
        },
        protein: {
          value: protein,
        },
        totalCarbohydrates: {
          value: carbohydrates,
        },
        totalFat: {
          value: fat,
        },
      },
    };

    console.log(flatten(change), token);
    const { data, err } = await UserAPI.updateUser(token, flatten(change));

    if (err) {
      setLoading(false);
      console.error(err);
    } else {
      setLoading(false);
      setShowDialog(false);
      setUser(data);
    }
  };
  const styles = StyleSheet.create({
    input: {
      height: 35,
      borderRadius: 5,
      // marginBottom: 5,
    },
    green: {
      color: 'green',
      textAlign: 'center',
      fontSize: 30,
      marginBottom: 20,
    },
    red: {
      color: 'red',
      textAlign: 'center',
      fontSize: 30,
      marginBottom: 20,
    },
    inputTitle: {
      backgroundColor: colors.primary,
      borderTopRightRadius: 3,
      borderTopLeftRadius: 3,
      // padding: 3,
      paddingLeft: 5,
    },
    form: {
      margin: 5,
      marginBottom: 20,
    },
  });
  return (
    <React.Fragment>
      <Dialog.Content>
        <View style={styles.form}>
          <Text style={styles.inputTitle}>Calories (cal)</Text>
          <TextInput
            style={styles.input}
            value={calories.toString()}
            onChangeText={(num) => setCalories(num)}
          />
        </View>
        <Text style={getSum() === 100 ? styles.green : styles.red}>
          {`${getSum()} %`}{' '}
        </Text>
        <View style={globalStyles.row}>
          <View style={globalStyles.flex}>
            <Text style={styles.inputTitle}>Protein (%)</Text>
            <TextInput
              style={styles.input}
              value={protein.toString()}
              onChangeText={(num) => setProtein(num)}
            />
          </View>
          <View style={globalStyles.flex}>
            <Text style={styles.inputTitle}>Carbs (%)</Text>
            <TextInput
              style={styles.input}
              value={carbohydrates.toString()}
              onChangeText={(num) => setCarbohydrates(num)}
            />
          </View>
          <View style={globalStyles.flex}>
            <Text style={styles.inputTitle}>Fats (%)</Text>
            <TextInput
              style={styles.input}
              value={fat.toString()}
              onChangeText={(num) => setFat(num)}
            />
          </View>
        </View>
      </Dialog.Content>
      <Dialog.Actions>
        {!loading ? (
          getSum() === 100 && (
            <Button onPress={handleChange}>
              <Icon name="check" size={30} style={{ padding: 10 }} />
            </Button>
          )
        ) : (
          <ActivityIndicator style={{ padding: 10 }} size={30} />
        )}
      </Dialog.Actions>
    </React.Fragment>
  );
};

export default withTheme(CaloriesDialog);
