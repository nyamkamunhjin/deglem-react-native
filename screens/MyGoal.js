import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import cookieContext from '../context/cookie-context';
import { BACKEND_URL } from '../env.config';
import axios from 'axios';
import {
  ActivityIndicator,
  Avatar,
  Button,
  DataTable,
  Dialog,
  Portal,
  RadioButton,
  Subheading,
  TextInput,
  withTheme,
} from 'react-native-paper';
import MultiChoice from '../components/MultiChoice/MultiChoice';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  formatDate,
  MifflinStJourFormula,
  calculateAge,
} from '../functions/functions';

/**
 * @author
 * @function MyGoal
 **/
const MyGoal = ({ navigation, theme }) => {
  const { cookies } = useContext(cookieContext);
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

  useEffect(() => {
    cookies
      .get(BACKEND_URL)
      .then((cookie) => {
        // console.log(cookie);
        if (Object.keys(cookie).length === 0) {
          throw new Error('cookie empty');
        }

        const {
          token: { value },
        } = cookie;

        axios
          .get(`${BACKEND_URL}/api/users`, {
            headers: {
              Authorization: `Bearer ${value}`,
            },
          })
          .then(({ data }) => {
            setUser(data);
            console.log;
          })
          .catch((err) => {
            console.log('axios: ', err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [cookies]);

  const renderSwitch = () => {
    switch (dialog.type) {
      case 'text':
        return (
          <Dialog.Content>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={(text) => setInput(text)}
            />
          </Dialog.Content>
        );
      case 'numeric':
        return (
          <Dialog.Content>
            <TextInput
              style={styles.input}
              keyboardType={'numeric'}
              value={input ? input.toString() : input}
              onChangeText={(num) => setInput(num)}
            />
          </Dialog.Content>
        );
      case 'gender':
        return (
          <Dialog.Content>
            <View style={styles.row}>
              <RadioButton
                value="Male"
                status={input === 'Male' ? 'checked' : 'unchecked'}
                onPress={() => setInput('Male')}
                color={colors.primary}
              />
              <Text>Male</Text>
            </View>
            <View style={styles.row}>
              <RadioButton
                value="Male"
                status={input === 'Female' ? 'checked' : 'unchecked'}
                onPress={() => setInput('Female')}
                color={colors.primary}
              />
              <Text>Female</Text>
            </View>
          </Dialog.Content>
        );
      case 'date':
        return (
          <Dialog.Content>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={handleDateFormat}
            />
          </Dialog.Content>
        );
      case 'multi-choice':
        return <MultiChoice input={input} setInput={setInput} />;
      case 'calories':
        return (
          <Dialog.Content>
            <View>
              <Text>Calories</Text>
              <TextInput
                style={styles.input}
                value={input}
                onChangeText={(num) => setInput(num)}
              />
            </View>
            <View>
              <Text>Protein</Text>
              <TextInput
                style={styles.input}
                value={input}
                onChangeText={(num) => setInput(num)}
              />
            </View>
            <View>
              <Text>Calories</Text>
              <TextInput
                style={styles.input}
                value={input}
                onChangeText={(num) => setInput(num)}
              />
            </View>
            <View>
              <Text>Calories</Text>
              <TextInput
                style={styles.input}
                value={input}
                onChangeText={(num) => setInput(num)}
              />
            </View>
          </Dialog.Content>
        );
    }
  };

  const handleChange = () => {
    setLoading(true);

    let update = {};
    update[dialog.path] = input;

    cookies
      .get(BACKEND_URL)
      .then((cookie) => {
        // console.log(cookie);
        if (Object.keys(cookie).length === 0) {
          throw new Error('cookie empty');
        }

        const {
          token: { value },
        } = cookie;

        axios
          .post(`${BACKEND_URL}/api/users/update`, update, {
            headers: {
              Authorization: `Bearer ${value}`,
            },
          })
          .then(({ data }) => {
            setUser(data);
            setShowDialog(false);
            setInput('');

            let calories = {};
            calories['nutritionGoals.calories'] = MifflinStJourFormula({
              age: calculateAge(user.userInfo.dateOfBirth),
              gender: user.userInfo.gender,
              height: user.goalInfo.height,
              currentWeight: user.goalInfo.currentWeight,
              weeklyGoal: user.goalInfo.weeklyGoal,
              activityLevel: user.goalInfo.activityLevel,
            });
            console.log(calories);

            axios
              .post(`${BACKEND_URL}/api/users/update`, calories, {
                headers: {
                  Authorization: `Bearer ${value}`,
                },
              })
              .then(({ data }) => {
                setUser(data);
              });
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
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
              <Dialog.Actions>
                {!loading ? (
                  <Button onPress={handleChange}>
                    <Icon
                      name="check"
                      size={30}
                      style={{ padding: 10 }}
                      // color="white"
                    />
                  </Button>
                ) : (
                  <ActivityIndicator style={{ padding: 10 }} size={30} />
                )}
              </Dialog.Actions>
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
                  });
                }}>
                <DataTable.Cell>Goal Weight</DataTable.Cell>
                <DataTable.Cell numeric>
                  {user.goalInfo ? user.goalInfo.goalWeight : ''} kg
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row
                onPress={() => {
                  setInput(user.goalInfo ? user.goalInfo.weeklyGoal : '');
                  setShowDialog(true);
                  setDialog({
                    path: 'goalInfo.weeklyGoal',
                    name: 'Weekly Goal',
                    type: 'numeric',
                  });
                }}>
                <DataTable.Cell>Weekly Goal</DataTable.Cell>
                <DataTable.Cell numeric>
                  {user.goalInfo ? user.goalInfo.weeklyGoal : ''} kg
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
                    type: 'numeric',
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
                    type: 'numeric',
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
                    type: 'numeric',
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
                    type: 'numeric',
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
