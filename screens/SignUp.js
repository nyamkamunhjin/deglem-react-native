import { Formik } from 'formik';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  ActivityIndicator,
  Button,
  Checkbox,
  Text,
  TextInput,
  Title,
  withTheme,
} from 'react-native-paper';
import * as yup from 'yup';
import { StackActions, useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { BACKEND_URL } from '../env.config';
import UserAPI from '../api/UserAPI';
import { useTranslation } from 'react-i18next';
import globalStyles from '../global-styles';

/**
 * @author
 * @function SignUp
 **/

const signUpSchema = yup.object({
  username: yup.string().required('Username is required').min(4),
  email: yup.string().email().required('Email is required').min(4),
  password: yup.string().required('Password is required').min(8),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password must match')
    .required('Confirm Password is required'),
  firstName: yup.string().required('First Name is required').min(4),
  lastName: yup.string().required('Last Name is required').min(4),
  gender: yup.mixed().oneOf(['Male', 'Female']).required('Choose your gender'),
  dateOfBirth: yup.date().required('Birthday is required'),
});

const SignUp = (props) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const { theme } = props;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <Title>{t('Sign up')}</Title>
      <Formik
        enableReinitialize={true}
        validationSchema={signUpSchema}
        initialValues={{
          username: 'nyamkamunhjin',
          password: '12345678',
          confirmPassword: '12345678',
          email: 'nyamkamunhjin@gmail.com',
          firstName: 'Munkhjin',
          lastName: 'Nyamdorj',
          gender: 'Male',
          dateOfBirth: '1998-11-09',
        }}
        onSubmit={async (values, actions) => {
          setLoading(true);
          console.log(values);
          const userData = values;
          delete userData.confirmPassword;

          const { data, err } = await UserAPI.signUp(userData);
          setLoading(false);

          if (err) {
            console.error(err);
          } else {
            console.log(data);
            if (data) {
              navigation.dispatch(StackActions.popToTop());
            }
          }
        }}>
        {(formikProps) => (
          <View style={styles.form}>
            <TextInput
              label={t('Username')}
              mode={'outlined'}
              style={styles.input}
              error={formikProps.errors.username}
              onChangeText={formikProps.handleChange('username')}
              value={formikProps.values.username}
              onBlur={formikProps.handleBlur('username')}
            />

            <Text style={styles.error}>
              {formikProps.touched.username && formikProps.errors.username}
            </Text>

            <TextInput
              label={t('Password')}
              mode={'outlined'}
              style={styles.input}
              secureTextEntry
              onChangeText={formikProps.handleChange('password')}
              value={formikProps.values.password}
              onBlur={formikProps.handleBlur('password')}
            />

            <Text style={styles.error}>
              {formikProps.touched.password && formikProps.errors.password}
            </Text>

            <TextInput
              label={t('Confirm Password')}
              mode={'outlined'}
              style={styles.input}
              secureTextEntry
              onChangeText={formikProps.handleChange('confirmPassword')}
              value={formikProps.values.confirmPassword}
              onBlur={formikProps.handleBlur('confirmPassword')}
            />

            <Text style={styles.error}>
              {formikProps.touched.confirmPassword &&
                formikProps.errors.confirmPassword}
            </Text>

            <TextInput
              label={t('Email')}
              mode={'outlined'}
              style={styles.input}
              error={formikProps.errors.email}
              onChangeText={formikProps.handleChange('email')}
              value={formikProps.values.email}
              onBlur={formikProps.handleBlur('email')}
            />

            <Text style={styles.error}>
              {formikProps.touched.email && formikProps.errors.email}
            </Text>

            <TextInput
              label={t('First Name')}
              mode={'outlined'}
              style={styles.input}
              onChangeText={formikProps.handleChange('firstName')}
              value={formikProps.values.firstName}
              onBlur={formikProps.handleBlur('firstName')}
            />

            <Text style={styles.error}>
              {formikProps.touched.firstName && formikProps.errors.firstName}
            </Text>
            <TextInput
              label={t('Last Name')}
              mode={'outlined'}
              style={styles.input}
              error={formikProps.errors.lastName}
              onChangeText={formikProps.handleChange('lastName')}
              value={formikProps.values.lastName}
              onBlur={formikProps.handleBlur('lastName')}
            />

            <Text style={styles.error}>
              {formikProps.touched.lastName && formikProps.errors.lastName}
            </Text>

            <View>
              <Text>{t('Gender')}</Text>
              <View style={styles.gender}>
                <Checkbox
                  status={
                    formikProps.values.gender === 'Male'
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() => formikProps.setFieldValue('gender', 'Male')}
                  color={theme.colors.primary}
                />
                <Text>{t('Male')}</Text>
              </View>
              <View style={styles.gender}>
                <Checkbox
                  status={
                    formikProps.values.gender === 'Female'
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() => formikProps.setFieldValue('gender', 'Female')}
                  color={theme.colors.primary}
                />
                <Text>{t('Female')}</Text>
              </View>
            </View>

            <Text style={styles.error}>
              {formikProps.touched.gender && formikProps.errors.gender}
            </Text>

            <TextInput
              label={t('Birthday')}
              mode={'outlined'}
              style={styles.input}
              onChangeText={(value) => {
                let formatted = value;
                if (formatted.length > 4 && formatted[4] !== '-') {
                  formatted =
                    formatted.substring(0, 4) + '-' + formatted.substr(4);
                }

                if (formatted.length > 7 && formatted[7] !== '-') {
                  formatted =
                    formatted.substring(0, 7) + '-' + formatted.substr(7);
                }

                formikProps.setFieldValue('dateOfBirth', formatted);
              }}
              value={formikProps.values.dateOfBirth}
              placeholder={'yyyy-mm-dd'}
              onBlur={formikProps.handleBlur('dateOfBirth')}
            />

            <Text style={styles.error}>
              {formikProps.touched.dateOfBirth &&
                formikProps.errors.dateOfBirth}
            </Text>
            <View style={styles.button}>
              {!loading ? (
                <Button
                  style={styles.button}
                  mode={'contained'}
                  uppercase={false}
                  onPress={formikProps.handleSubmit}>
                  {t('Sign up')}
                </Button>
              ) : (
                <ActivityIndicator size={30} />
              )}
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    margin: 10,
  },
  input: {
    width: 300,
    height: 45,
    borderRadius: 10,
    marginBottom: 5,
  },
  button: {
    ...globalStyles.buttons,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
  gender: {
    flexDirection: 'row',

    alignItems: 'center',
  },
});
export default withTheme(SignUp);
