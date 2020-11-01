import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
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
import cookieContext from '../context/cookie-context';
import { formatDate } from '../functions/functions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MultiChoice from '../components/MultiChoice/MultiChoice';
import UserAPI from '../api/UserAPI';
import { useTranslation } from 'react-i18next';

/**
 * @author
 * @function AccountInfo
 **/
const AccountInfo = ({ navigation, theme }) => {
  const { t } = useTranslation();
  const { token, user, setUser } = useContext(cookieContext);

  // const [user, setUser] = useState(null);
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

  const { colors } = theme;

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
    }
  };

  const handleChange = async () => {
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
            <Subheading style={styles.heading}>
              {t('My Information')}
            </Subheading>
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
                <DataTable.Cell>{t('Username')}</DataTable.Cell>
                <DataTable.Cell numeric>
                  {user.userInfo.username || ''}
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row onPress={() => console.log('pressed.')}>
                <DataTable.Cell>{t('Avatar')}</DataTable.Cell>
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
                <DataTable.Cell>{t('Email')}</DataTable.Cell>
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
                <DataTable.Cell>{t('First Name')}</DataTable.Cell>
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
                <DataTable.Cell>{t('Last Name')}</DataTable.Cell>
                <DataTable.Cell numeric>
                  {user.userInfo.lastName || ''}
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row
                onPress={() => {
                  // setInput(gender);
                  setShowDialog(true);
                  setDialog({
                    path: 'userInfo.gender',
                    name: 'Gender',
                    type: 'gender',
                  });
                }}>
                <DataTable.Cell>{t('Gender')}</DataTable.Cell>
                <DataTable.Cell numeric>
                  {t(user.userInfo.gender) || ''}
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row
                onPress={() => {
                  setInput(formatDate(user.userInfo.dateOfBirth));
                  setShowDialog(true);
                  setDialog({
                    path: 'userInfo.dateOfBirth',
                    name: 'Date of birth',
                    type: 'date',
                  });
                }}>
                <DataTable.Cell>{t('Date of birth')}</DataTable.Cell>
                <DataTable.Cell numeric>
                  {user.userInfo ? formatDate(user.userInfo.dateOfBirth) : ''}
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          </View>

          <View>
            <DataTable>
              <DataTable.Row onPress={() => navigation.navigate('mygoal-tab')}>
                <DataTable.Cell>{t('Nutrition Goals')}</DataTable.Cell>
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

export default withTheme(AccountInfo);
