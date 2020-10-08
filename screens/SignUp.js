import { Formik } from 'formik';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
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
  gender: yup.mixed().oneOf(['male', 'female']).required('Choose your gender'),
  dateOfBirth: yup.date().required('Birthday is required'),
});

const SignUp = (props) => {
  const navigation = useNavigation();
  const { theme } = props;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <Title>Sign up</Title>
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
          gender: 'male',
          dateOfBirth: '1998-11-09',
        }}
        onSubmit={(values, actions) => {
          console.log(values);
          const userData = values;
          delete userData.confirmPassword;

          axios
            .post(`${BACKEND_URL}/auth/register`, { userInfo: { ...userData } })
            .then(({ data }) => {
              console.log(data);
              if (data) {
                navigation.dispatch(StackActions.popToTop());
              }
            })
            .catch((err) => {
              console.error(err);
            });
        }}>
        {(formikProps) => (
          <View style={styles.form}>
            <TextInput
              label="Username"
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
              label="Password"
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
              label="Confirm Password"
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
              label="Email"
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
              label="First Name"
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
              label="Last Name"
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
              <Text>Gender</Text>
              <View style={styles.gender}>
                <Checkbox
                  status={
                    formikProps.values.gender === 'male'
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() => formikProps.setFieldValue('gender', 'male')}
                  color={theme.colors.primary}
                />
                <Text>Man</Text>
              </View>
              <View style={styles.gender}>
                <Checkbox
                  status={
                    formikProps.values.gender === 'female'
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() => formikProps.setFieldValue('gender', 'female')}
                  color={theme.colors.primary}
                />
                <Text>Woman</Text>
              </View>
            </View>

            <Text style={styles.error}>
              {formikProps.touched.gender && formikProps.errors.gender}
            </Text>

            <TextInput
              label="Birthday"
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
              <Button
                style={styles.button}
                mode={'contained'}
                uppercase={false}
                onPress={formikProps.handleSubmit}>
                Sign up
              </Button>
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
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 5,
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
