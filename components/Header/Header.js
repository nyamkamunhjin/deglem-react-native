import React, { useEffect } from 'react';
import { Appbar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Header = ({ scene, previous, navigation, colors }) => {
  const { options } = scene.descriptor;

  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  // useEffect(() => {
  //   console.log(options);
  // }, []);

  return (
    <Appbar.Header style={{ backgroundColor: colors.primary }} st>
      {previous ? (
        <Appbar.BackAction
          onPress={navigation.goBack}
          // color={theme.colors.primary}
        />
      ) : (
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}>
          <Icon name="menu" size={30} />
        </TouchableOpacity>
      )}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};

export default Header;
