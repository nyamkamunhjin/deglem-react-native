import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import {
  Avatar,
  Drawer,
  Title,
  Caption,
  Text,
  Switch,
  withTheme,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import cookieContext from '../../context/cookie-context';
import { useTranslation } from 'react-i18next';

import color from 'color';

/**
 * @author
 * @function DrawerContent
 **/
const DrawerContent = (props) => {
  const { colors, fonts } = props.theme;
  // console.log(fonts);
  const { token, user, logOut, setLanguage, lang } = useContext(cookieContext);
  // console.log(lang);
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');

  // const [isSwitchOn, setIsSwitchOn] = useState(lang);

  const onToggleSwitch = () => {
    // setIsSwitchOn(!isSwitchOn);
    setLanguage(lang === 'mn' ? 'en' : 'mn');
  };

  const { navigation } = props;
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (user) {
      setTitle(`${user.userInfo.firstName} ${user.userInfo.lastName}`);
      setCaption(user.userInfo.username);
    }

    return () => {
      setTitle('');
      setCaption('');
      console.log('hello from unmount DrawerContent.js');
    };
  }, [token, user]);

  return token ? (
    <View style={styles.drawerContainer}>
      <DrawerContentScrollView {...props}>
        <View style={styles.userInfo}>
          <Avatar.Image
            source={{
              uri:
                'https://pbs.twimg.com/profile_images/1198779570427703296/sWN8DRoR_400x400.jpg',
            }}
            size={50}
          />
          <View style={{ flexDirection: 'column' }}>
            <Title style={styles.title}>{title}</Title>
            <Caption style={styles.caption}>@{caption}</Caption>
          </View>
        </View>
        <Drawer.Section>
          <Drawer.Item
            icon={({ color, size }) => (
              <Icon name="notebook" color={color} size={size} />
            )}
            label={t('Diary')}
            onPress={() => {
              navigation.navigate('diary-tab');
            }}
          />
          <Drawer.Item
            icon={({ color, size }) => (
              <Icon name="trophy" color={color} size={size} />
            )}
            label={t('My Goal')}
            onPress={() => {
              navigation.navigate('mygoal-tab');
            }}
          />
          <Drawer.Item
            icon={({ color, size }) => (
              <Icon name="nutrition" color={color} size={size} />
            )}
            label={t('Nutrition')}
            onPress={() => {
              navigation.navigate('nutrition-tab');
            }}
          />
          <Drawer.Item
            icon={({ color, size }) => (
              <Icon name="account-edit" color={color} size={size} />
            )}
            label={t('Edit Info')}
            onPress={() => {
              navigation.navigate('account-info');
            }}
          />
        </Drawer.Section>
      </DrawerContentScrollView>
      <Drawer.Section title={t('Language Title')}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 12,
            paddingHorizontal: 16,
          }}>
          <Text
            style={{
              fontFamily: fonts.medium.fontFamily,
              color: color(colors.text).alpha(0.68).rgb().string(),
            }}>
            {t('Language')}
          </Text>
          <Switch value={lang === 'mn'} onValueChange={onToggleSwitch} />
        </View>
      </Drawer.Section>
      <Drawer.Section title="Authorization">
        <Drawer.Item
          icon={({ color, size }) => (
            <Icon name="location-exit" color={color} size={size} />
          )}
          label={t('Sign Out')}
          onPress={() => {
            logOut();
            navigation.closeDrawer();
          }}
        />
      </Drawer.Section>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  userInfo: {
    marginTop: 20,
    marginBottom: 20,
    // paddingLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default withTheme(DrawerContent);
