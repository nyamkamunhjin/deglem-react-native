import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import cookieContext from '../context/cookie-context';

import {
  ActivityIndicator,
  Button,
  DataTable,
  Dialog,
  Portal,
  Subheading,
  TextInput,
  withTheme,
} from 'react-native-paper';
import MultiChoice from '../components/MultiChoice/MultiChoice';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { MifflinStJourFormula, calculateAge } from '../functions/functions';
import UserAPI from '../api/UserAPI';
import CaloriesDialog from '../components/CaloriesDialog/CaloriesDialog';

/**
 * @author
 * @function MyGoal
 **/
const MyGoal = ({ navigation, theme }) => {
  const { token } = useContext(cookieContext);
  const { colors } = theme;
  const [user, setUser] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [dialog, setDialog] = useState({
    path: '',
    name: '',
    type: '',
  });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDateFormat = (value) => {
    let formatted = value;
    if (formatted.length > 4 && formatted[4] !== '-') {
      formatted = formatted.substring(0, 4) + '-' + formatted.substr(4);
    }

    if (formatted.length > 7 && formatted[7] !== '-') {
      formatted = formatted.substring(0, 7) + '-' + formatted.substr(7);
    }
    setInput(formatted);
  };

  // eslint-disable-next-line no-shadow
  const updateCalories = (user) => {
    let calories = {};
    calories['nutritionGoals.calories'] = MifflinStJourFormula({
      age: calculateAge(user.userInfo.dateOfBirth),
      gender: user.userInfo.gender,
      height: user.goalInfo.height,
      currentWeight: user.goalInfo.currentWeight,
      weeklyGoal: user.goalInfo.weeklyGoal,
      activityLevel: user.goalInfo.activityLevel,
    });

    UserAPI.updateUser(token, calories).then(({ err, data }) => {
      if (err) {
        console.error(err);
      } else {
        setUser(data);
      }
    });
  };

  useEffect(() => {
    const getUser = async () => {
      const { data, err } = await UserAPI.getUser(token);

      if (err) {
        console.error(err);
      } else {
        // console.log(data);
        // console.log(flatten(data));
        setUser(data);
      }
    };

    getUser();
  }, [token]);

  const handleChange = async (setCalories) => {
    setLoading(true);

    let update = {};
    update[dialog.path] = input;

    const { data, err } = await UserAPI.updateUser(token, update);

    if (err) {
      console.error(err);
      setLoading(false);
    } else {
      setUser(data);
      setShowDialog(false);
      setInput('');
      setLoading(false);

      if (setCalories || false) {
        updateCalories(data);
      }
    }
  };

  const renderSwitch = () => {
    switch (dialog.type) {
      case 'numeric':
        return (
          <React.Fragment>
            <Dialog.Content>
              <TextInput
                style={styles.input}
                keyboardType={'numeric'}
                value={input ? input.toString() : input}
                onChangeText={setInput}
              />
            </Dialog.Content>
            <Dialog.Actions>
              {!loading ? (
                <Button onPress={() => handleChange(dialog.setCalories)}>
                  <Icon name="check" size={30} style={{ padding: 10 }} />
                </Button>
              ) : (
                <ActivityIndicator style={{ padding: 10 }} size={30} />
              )}
            </Dialog.Actions>
          </React.Fragment>
        );

      case 'multi-choice':
        return (
          <React.Fragment>
            <MultiChoice input={input} setInput={setInput} />
            <Dialog.Actions>
              {!loading ? (
                <Button onPress={() => handleChange(dialog.setCalories)}>
                  <Icon name="check" size={30} style={{ padding: 10 }} />
                </Button>
              ) : (
                <ActivityIndicator style={{ padding: 10 }} size={30} />
              )}
            </Dialog.Actions>
          </React.Fragment>
        );
      case 'calories':
        return (
          <CaloriesDialog
            nutritionGoals={user.nutritionGoals}
            loading={loading}
            setLoading={setLoading}
            setShowDialog={setShowDialog}
            setUser={setUser}
            token={token}
          />
        );
    }
  };

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      // alignItems: 'center',
      textAlign: 'center',
    },
    avatar: {
      padding: 5,
    },
    heading: {
      marginTop: 20,
      margin: 15,
      color: colors.primary,
    },
    input: {
      height: 35,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    loadingBar: {
      // flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: 'green',
      height: '100%',
    },
  });

  return (
    <View style={styles.container}>
      {user ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Portal>
            <Dialog visible={showDialog} onDismiss={() => setShowDialog(false)}>
              <Dialog.Title>{dialog.name}</Dialog.Title>
              {renderSwitch()}
            </Dialog>
          </Portal>

          <View>
            <Subheading style={styles.heading}>My Goals</Subheading>
            <DataTable>
              <DataTable.Row
                onPress={() => {
                  setInput(user.goalInfo ? user.goalInfo.height : '');
                  setShowDialog(true);
                  setDialog({
                    path: 'goalInfo.height',
                    name: 'Height',
                    type: 'numeric',
                    setCalories: true,
                  });
                }}>
                <DataTable.Cell>Height</DataTable.Cell>
                <DataTable.Cell numeric>
                  {user.goalInfo ? user.goalInfo.height : ''} cm
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row
                onPress={() => {
                  setInput(user.goalInfo ? user.goalInfo.currentWeight : '');
                  setShowDialog(true);
                  setDialog({
                    path: 'goalInfo.currentWeight',
                    name: 'Current Weight',
                    type: 'numeric',
                    setCalories: true,
                  });
                }}>
                <DataTable.Cell>Current Weight</DataTable.Cell>
                <DataTable.Cell numeric>
                  {user.goalInfo ? user.goalInfo.currentWeight : ''} kg
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row
                onPress={() => {
                  setInput(user.goalInfo ? user.goalInfo.goalWeight : '');
                  setShowDialog(true);
                  setDialog({
                    path: 'goalInfo.goalWeight',
                    name: 'Goal Weight',
                    type: 'numeric',
                    setCalories: true,
                  });
                }}>
                <DataTable.Cell>Goal Weight</DataTable.Cell>
                <DataTable.Cell numeric>
                  {user.goalInfo ? user.goalInfo.goalWeight : ''} kg
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row
                onPress={() => {
                  setInput(
                    user.goalInfo
                      ? user.goalInfo.weeklyGoal === 0
                        ? ''
                        : user.goalInfo.weeklyGoal
                      : '',
                  );
                  setShowDialog(true);
                  setDialog({
                    path: 'goalInfo.weeklyGoal',
                    name: 'Weekly Goal',
                    type: 'numeric',
                    setCalories: true,
                  });
                }}>
                <DataTable.Cell>Weekly Goal</DataTable.Cell>
                <DataTable.Cell numeric>
                  {user.goalInfo
                    ? user.goalInfo.weeklyGoal === ''
                      ? 'Maintain'
                      : `${user.goalInfo.weeklyGoal} kg`
                    : ''}
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row
                onPress={() => {
                  setInput(user.goalInfo ? user.goalInfo.activityLevel : '');
                  setShowDialog(true);
                  setDialog({
                    path: 'goalInfo.activityLevel',
                    name: 'Activity Level',
                    type: 'multi-choice',
                    setCalories: true,
                  });
                }}>
                <DataTable.Cell>Activity Level</DataTable.Cell>
                <DataTable.Cell numeric>
                  {user.goalInfo ? user.goalInfo.activityLevel : ''}
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable>

            <Subheading style={styles.heading}>Nutrition goals</Subheading>
            <DataTable>
              <DataTable.Row
                onPress={() => {
                  setInput(
                    user.nutritionGoals ? user.nutritionGoals.calories : '',
                  );
                  setShowDialog(true);
                  setDialog({
                    path: 'nutritionGoals.calories',
                    name: 'Calories',
                    type: 'calories',
                  });
                }}>
                <DataTable.Cell>Calories</DataTable.Cell>
                <DataTable.Cell numeric>
                  {user.nutritionGoals ? user.nutritionGoals.calories : '-'} cal
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row
                onPress={() => {
                  setInput(
                    user.nutritionGoals ? user.nutritionGoals.protein : '',
                  );
                  setShowDialog(true);
                  setDialog({
                    path: 'nutritionGoals.protein',
                    name: 'Protein',
                    type: 'calories',
                  });
                }}>
                <DataTable.Cell>Protein</DataTable.Cell>
                <DataTable.Cell numeric>
                  {user.nutritionGoals && (user.nutritionGoals.protein || '-')}{' '}
                  %
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row
                onPress={() => {
                  setInput(
                    user.nutritionGoals
                      ? user.nutritionGoals.carbohydrates
                      : '',
                  );
                  setShowDialog(true);
                  setDialog({
                    path: 'nutritionGoals.carbohydrates',
                    name: 'Carbs',
                    type: 'calories',
                  });
                }}>
                <DataTable.Cell>Carbs</DataTable.Cell>
                <DataTable.Cell numeric>
                  {user.nutritionGoals &&
                    (user.nutritionGoals.carbohydrates || '-')}{' '}
                  %
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row
                onPress={() => {
                  setInput(user.nutritionGoals ? user.nutritionGoals.fat : '');
                  setShowDialog(true);
                  setDialog({
                    path: 'nutritionGoals.fat',
                    name: 'Fats',
                    type: 'calories',
                  });
                }}>
                <DataTable.Cell>Fats</DataTable.Cell>
                <DataTable.Cell numeric>
                  {user.nutritionGoals && (user.nutritionGoals.fat || '-')} %
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.loadingBar}>
          <ActivityIndicator color={colors.primary} size={'large'} />
        </View>
      )}
    </View>
  );
};

export default withTheme(MyGoal);
