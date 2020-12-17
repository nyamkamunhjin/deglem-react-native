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
  Text,
  TextInput,
  withTheme,
} from 'react-native-paper';
import MultiChoice from '../components/MultiChoice/MultiChoice';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  MifflinStJourFormula,
  calculateAge,
  formatDate,
} from '../functions/functions';
import UserAPI from '../api/UserAPI';
import { useTranslation } from 'react-i18next';
import CaloriesDialog from '../components/CaloriesDialog/CaloriesDialog';
import StatsApi from '../api/StatsApi';
/**
import CaloriesDialog from '../components/CaloriesDialog/CaloriesDialog';

 * @author
 * @function MyGoal
 **/
const MyGoal = ({ navigation, theme }) => {
  const { t } = useTranslation();
  const { token, user, setUser } = useContext(cookieContext);
  const { colors } = theme;
  // const [user, setUser] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [dialog, setDialog] = useState({
    path: '',
    name: '',
    type: '',
  });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line no-shadow
  const updateCalories = (user) => {
    let calories = {};
    calories['nutritionGoals.calories.value'] = MifflinStJourFormula({
      age: calculateAge(user.userInfo.dateOfBirth) || 22,
      gender: user.userInfo.gender || 'Male',
      height: user.goalInfo.height || 185,
      currentWeight: user.goalInfo.currentWeight || 78,
      weeklyGoal: user.goalInfo.weeklyGoal || 0,
      activityLevel: user.goalInfo.activityLevel || 'Sedentary',
    });

    UserAPI.updateUser(token, calories).then(({ err, data }) => {
      if (err) {
        console.error(err);
      } else {
        setUser(data);
      }
    });
  };

  const handleChange = async (setCalories) => {
    setLoading(true);

    let update = {};
    update[dialog.path] = input;

    if (dialog.path === 'goalInfo.currentWeight') {
      StatsApi.addWeights(token, {
        date: formatDate(new Date()),
        weight: parseInt(input, 10),
      });
    }

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
            <MultiChoice input={input} setInput={setInput} data={dialog.data} />
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
              <Dialog.Title>{t(dialog.name)}</Dialog.Title>
              {renderSwitch()}
            </Dialog>
          </Portal>

          <View>
            <Subheading style={styles.heading}>{t('My Goals')}</Subheading>
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
                <DataTable.Cell>
                  <Text style={user.goalInfo.height ? null : { color: 'red' }}>
                    {t('Height')}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {user.goalInfo
                    ? user.goalInfo.height
                      ? `${user.goalInfo.height} cm`
                      : ''
                    : ''}
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
                <DataTable.Cell>
                  <Text
                    style={
                      user.goalInfo.currentWeight ? null : { color: 'red' }
                    }>
                    {t('Current Weight')}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {user.goalInfo
                    ? user.goalInfo.currentWeight
                      ? `${user.goalInfo.currentWeight} kg`
                      : ''
                    : ''}
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
                    type: 'multi-choice',
                    data: [
                      { value: -1, desc: 'lose kg' },
                      { value: -0.75, desc: 'lose kg' },
                      { value: -0.5, desc: 'lose kg' },
                      { value: -0.25, desc: 'lose kg' },
                      { value: 0, desc: 'gain kg', sub: 'Maintain' },
                      { value: 0.25, desc: 'gain kg' },
                      { value: 0.5, desc: 'gain kg' },
                    ],
                    setCalories: true,
                  });
                }}>
                <DataTable.Cell>
                  <Text>{t('Weekly Goal')}</Text>
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {user.goalInfo
                    ? user.goalInfo.weeklyGoal === 0
                      ? t('Maintain')
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
                    data: [
                      { value: 'Sedentary' },
                      { value: 'Lightly Active' },
                      { value: 'Active' },
                      { value: 'Very Active' },
                    ],
                    setCalories: true,
                  });
                }}>
                <DataTable.Cell>{t('Activity Level')}</DataTable.Cell>
                <DataTable.Cell numeric>
                  {user.goalInfo ? t(user.goalInfo.activityLevel) : ''}
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable>

            <Subheading style={styles.heading}>
              {t('Nutrition Goals')}
            </Subheading>
            <DataTable>
              <DataTable.Row
                onPress={() => {
                  setInput(
                    user.nutritionGoals
                      ? user.nutritionGoals.calories.value
                      : '',
                  );
                  setShowDialog(true);
                  setDialog({
                    path: 'nutritionGoals.calories.value',
                    name: 'Calories',
                    type: 'calories',
                  });
                }}>
                <DataTable.Cell>{t('Calories')}</DataTable.Cell>
                <DataTable.Cell numeric>
                  {user.nutritionGoals
                    ? user.nutritionGoals.calories.value
                    : '-'}{' '}
                  {t('kcal')}
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row
                onPress={() => {
                  setInput(
                    user.nutritionGoals
                      ? user.nutritionGoals.protein.value
                      : '',
                  );
                  setShowDialog(true);
                  setDialog({
                    path: 'nutritionGoals.protein.value',
                    name: 'Protein',
                    type: 'calories',
                  });
                }}>
                <DataTable.Cell>
                  <Text style={{ color: colors.protein }}>{t('Protein')}</Text>
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {user.nutritionGoals &&
                    (user.nutritionGoals.protein.value || '-')}{' '}
                  %
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row
                onPress={() => {
                  setInput(
                    user.nutritionGoals
                      ? user.nutritionGoals.totalCarbohydrates.value
                      : '',
                  );
                  setShowDialog(true);
                  setDialog({
                    path: 'nutritionGoals.totalCarbohydrates.value',
                    name: 'Carbs',
                    type: 'calories',
                  });
                }}>
                <DataTable.Cell>
                  <Text style={{ color: colors.carbs }}>{t('Carbs')}</Text>
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {user.nutritionGoals &&
                    (user.nutritionGoals.totalCarbohydrates.value || '-')}{' '}
                  %
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row
                onPress={() => {
                  setInput(
                    user.nutritionGoals
                      ? user.nutritionGoals.totalFat.value
                      : '',
                  );
                  setShowDialog(true);
                  setDialog({
                    path: 'nutritionGoals.totalFat.value',
                    name: 'Fats',
                    type: 'calories',
                  });
                }}>
                <DataTable.Cell>
                  <Text style={{ color: colors.fat }}>{t('Fats')}</Text>
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {user.nutritionGoals &&
                    (user.nutritionGoals.totalFat.value || '-')}{' '}
                  %
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
