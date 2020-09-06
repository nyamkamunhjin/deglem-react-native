import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Avatar, Drawer, Title, Caption } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

/**
 * @author
 * @function DrawerContent
 **/
const DrawerContent = (props) => {

  const {navigation} = props;
  return (
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
            <Title style={styles.title}>Mangoni juus uuyaa</Title>
            <Caption style={styles.caption}>@nyamkamunhjin</Caption>
          </View>
        </View>
        <Drawer.Section>
          <Drawer.Item
            icon={({ color, size }) => (
              <Icon name="notebook" color={color} size={size} />
            )}
            label="Diary"
            onPress={() => {
              navigation.navigate('diary-tab');
            }}
          />
          <Drawer.Item
            icon={({ color, size }) => (
              <Icon name="trophy" color={color} size={size} />
            )}
            label="My Goal"
            onPress={() => {
              navigation.navigate('mygoal-tab');

            }}
          />
          <Drawer.Item
            icon={({ color, size }) => (
              <Icon name="nutrition" color={color} size={size} />
            )}
            label="Nutrition"
            onPress={() => {
              navigation.navigate('nutrition-tab');

            }}
          />
          <Drawer.Item
            icon={({ color, size }) => (
              <Icon name="account-edit" color={color} size={size} />
            )}
            label="Edit Info"
            onPress={() => {
              navigation.navigate('account-info');

            }}
          />
        </Drawer.Section>
      </DrawerContentScrollView>

      <Drawer.Section title="Authorization">
        <Drawer.Item
          icon={({ color, size }) => (
            <Icon name="location-exit" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {
            alert('signing out...');
          }}
        />
      </Drawer.Section>
    </View>
  );
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

export default DrawerContent;
