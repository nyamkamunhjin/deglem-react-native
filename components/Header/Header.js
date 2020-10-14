import React from 'react';
import { Appbar, TouchableRipple } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, StyleSheet } from 'react-native';

const Header = ({ scene, previous, navigation, colors }) => {
  const { options } = scene.descriptor;

  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  const styles = StyleSheet.create({
    header: {
      backgroundColor: colors.primary,
    },
  });

  return (
    <Appbar.Header style={styles.header}>
      {previous ? (
        <Appbar.BackAction
          onPress={() => navigation.goBack()}
          color="white"

          // color={theme.colors.primary}
        />
      ) : (
        <View style={{ borderRadius: 10, overflow: 'hidden' }}>
          <TouchableRipple
            onPress={() => {
              navigation.openDrawer();
            }}
            borderless={true}>
            <Icon name="menu" size={20} style={{ padding: 10 }} color="white" />
          </TouchableRipple>
        </View>
      )}
      <Appbar.Content
        title={title}
        titleStyle={{ marginLeft: -10 }}
        color="white"
      />
    </Appbar.Header>
  );
};

export default Header;
