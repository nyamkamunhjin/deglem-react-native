import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  Avatar,
  Button,
  DataTable,
  Dialog,
  Divider,
  Portal,
  Subheading,
  TextInput,
  Title,
  withTheme,
} from 'react-native-paper';
import cookieContext from '../context/cookie-context';
import axios from 'axios';
import { BACKEND_URL } from '../env.config';
import { formatDate } from '../functions/functions';
import { useTheme } from '@react-navigation/native';

/**
 * @author
 * @function AccountInfo
 **/
const AccountInfo = ({ navigation, theme }) => {
  const [user, setUser] = useState(null);
  const { cookies } = useContext(cookieContext);
  const [showDialog, setShowDialog] = useState(false);
  const [dialog, setDialog] = useState({
    path: '',
    name: '',
    type: '',
  });
  const [input, setInput] = React.useState('');

  const { colors } = theme;

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
          <React.Fragment>
            <Dialog.Title>{dialog.name}</Dialog.Title>
            <Dialog.Content>
              <TextInput
                style={styles.input}
                value={input}
                onChangeText={(text) => setInput(text)}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={handleChange}>Change</Button>
            </Dialog.Actions>
          </React.Fragment>
        );
      case 'numeric':
        return (
          <React.Fragment>
            <Dialog.Title>{dialog.name}</Dialog.Title>
            <Dialog.Content>
              <TextInput
                style={styles.input}
                keyboardType={'numeric'}
                value={input ? input.toString() : input}
                onChangeText={(num) => setInput(num)}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={handleChange}>Change</Button>
            </Dialog.Actions>
          </React.Fragment>
        );
    }
  };

  const handleChange = () => {
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
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.error(err);
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
  });

  return (
    <View style={styles.container}>
      {user && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Portal>
            <Dialog visible={showDialog} onDismiss={() => setShowDialog(false)}>
              {renderSwitch()}
            </Dialog>
          </Portal>
          <View>
            <Subheading style={styles.heading}>My Account</Subheading>
            <DataTable>
              <DataTable.Row
                onPress={() => {
                  setInput(user.userInfo.username || '');
                  setShowDialog(true);
                  setDialog({
                    path: 'userInfo.username',
                    name: 'Username',

                    type: 'text',
                  });
                }}>
                <DataTable.Cell>Username</DataTable.Cell>
                <DataTable.Cell numeric>
                  {user.userInfo.username || ''}
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row onPress={() => console.log('pressed.')}>
                <DataTable.Cell>Avatar</DataTable.Cell>
                <DataTable.Cell numeric>
                  <View style={styles.avatar || ''}>
                    <Avatar.Image
                      source={{
                        uri:
                          'https://pbs.twimg.com/profile_images/1198779570427703296/sWN8DRoR_400x400.jpg',
                      }}
                      size={40}
                    />
                  </View>
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row
                onPress={() => {
                  setInput(user.userInfo.email || '');
                  setShowDialog(true);
                  setDialog({
                    path: 'userInfo.email',
                    name: 'Email',
                    type: 'text',
                  });
                }}
                style={{ marginTop: 0 }}>
                <DataTable.Cell>Email</DataTable.Cell>
                <DataTable.Cell numeric>
                  {user.userInfo.email || ''}
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row
                onPress={() => {
                  setInput(user.userInfo.firstName || '');
                  setShowDialog(true);
                  setDialog({
                    path: 'userInfo.firstName',
                    name: 'First Name',
                    type: 'text',
                  });
                }}>
                <DataTable.Cell>First Name</DataTable.Cell>
                <DataTable.Cell numeric>
                  {user.userInfo.firstName || ''}
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row
                onPress={() => {
                  setInput(user.userInfo.lastName || '');
                  setShowDialog(true);
                  setDialog({
                    path: 'userInfo.lastName',
                    name: 'Last Name',
                    type: 'text',
                  });
                }}>
                <DataTable.Cell>Last Name</DataTable.Cell>
                <DataTable.Cell numeric>
                  {user.userInfo.lastName || ''}
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row onPress={() => console.log('pressed.')}>
                <DataTable.Cell>Gender</DataTable.Cell>
                <DataTable.Cell numeric>
                  {user.userInfo.gender || ''}
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row
                onPress={() => {
                  setInput(user.userInfo.firstName || '');
                  setShowDialog(true);
                  setDialog({
                    path: 'userInfo.firstName',
                    name: 'First Name',
                    type: 'text',
                  });
                }}>
                <DataTable.Cell>Date of birth</DataTable.Cell>
                <DataTable.Cell numeric>
                  {user.userInfo ? formatDate(user.userInfo.dateOfBirth) : ''}
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          </View>

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
                  {user.goalInfo ? user.goalInfo.weeklyGoal : ''}
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row
                onPress={() => {
                  setInput(user.goalInfo ? user.goalInfo.activityLevel : '');
                  setShowDialog(true);
                  setDialog({
                    path: 'goalInfo.activityLevel',
                    name: 'Activity Level',
                    type: 'numeric',
                  });
                }}>
                <DataTable.Cell>Activity Level</DataTable.Cell>
                <DataTable.Cell numeric>
                  {user.goalInfo ? user.goalInfo.activityLevel : ''}
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row onPress={() => console.log('pressed.')}>
                <DataTable.Cell>Nutrition Goals</DataTable.Cell>
                {/* <DataTable.Cell numeric></DataTable.Cell> */}
              </DataTable.Row>
            </DataTable>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default withTheme(AccountInfo);
