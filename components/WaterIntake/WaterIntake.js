/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet } from 'react-native';
import {
  Button,
  TextInput,
  Text,
  withTheme,
  ActivityIndicator,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DiaryAPI from '../../api/DiaryAPI';
import cookieContext from '../../context/cookie-context';

/**
 * @author
 * @function WaterIntake
 **/
const WaterIntake = ({ diary }) => {
  const { t } = useTranslation();
  const [value, setValue] = useState('0');
  const { getSelectedDate, token } = useContext(cookieContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    DiaryAPI.getWater(token, getSelectedDate()).then(({ data }) => {
      // console.log('water', data);
      setValue(data ? data.toString() : '0');
    });
  }, [token, diary, getSelectedDate]);

  const handleWater = () => {
    setLoading(true);
    DiaryAPI.setWater(token, {
      date: getSelectedDate(),
      water: parseInt(value, 10),
    }).then(({ data }) => {
      setValue(data.toString());
      setLoading(false);
    });
  };
  const { container } = styles;
  return (
    <View
      style={{
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 10,
        padding: 10,
        backgroundColor: 'white',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowColor: '#000',
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 1,
      }}>
      <Text>{t('Daily water intake')} </Text>
      <View
        style={{
          // backgroundColor: 'green',
          width: 200,
          height: 50,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TextInput
            // placeholder="0"
            value={value}
            // defaultValue={value.toString()}
            dense={true}
            // selectionColor={'green'}
            style={{
              height: 30,
              width: 15,
              paddingHorizontal: 3,
              paddingVertical: 0,
              margin: 0,
              textAlign: 'center',
              // backgroundColor: 'inherit',
              borderBottomColor: 'inherit',
              color: 'green',
            }}
            underlineColor={'inherit'}
            keyboardType={'numeric'}
            mode="flat"
            editable={true}
            onChangeText={(val) => {
              // if (isNaN(val)) val = 0;
              setValue(val);
            }}
          />
          <Text style={{ fontSize: 16, paddingBottom: 4 }}>
            {' '}
            /8
            <Icon name="cup-water" size={20} color="#9cd3db" />
          </Text>
        </View>
        {!loading ? (
          <Button
            compact={true}
            icon={({ color }) => <Icon name="check" size={25} color={color} />}
            onPress={handleWater}
          />
        ) : (
          <ActivityIndicator />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default withTheme(WaterIntake);
