import { Formik } from 'formik';
import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  ActivityIndicator,
  Button,
  Text,
  TextInput,
  Title,
} from 'react-native-paper';
import CookieContext from '../context/cookie-context';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import UserAPI from '../api/UserAPI';
import { useTranslation } from 'react-i18next';
import globalStyles from '../global-styles';

/**
 * @author
 * @function SignIn
 **/

const signInSchema = yup.object({
  email: yup.string().email().required('Email is required').min(4),
  password: yup.string().required('Password is required').min(4),
});

const SignIn = (props) => {
  const { t } = useTranslation();
  const { logIn } = useContext(CookieContext);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Title>{t('Sign in')}</Title>

      <Formik
        validationSchema={signInSchema}
        initialValues={{
          email: 'nyamkamunhjin@gmail.com',
          password: '12345678',
          // email: '',
          // password: '',
        }}
        onSubmit={async (values, actions) => {
          setLoading(true);

          console.log(values);

          const { data, err } = await UserAPI.signIn(values);

          if (err) {
            console.error(err);
          } else {
            if (data) {
              logIn(data);
            }
          }
        }}>
        {(formikProps) => (
          <View style={styles.form}>
            {/* <Text>Email</Text> */}

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

            {/* <Text>Password</Text> */}

            <TextInput
              label={t('Password')}
              mode={'outlined'}
              style={styles.input}
              // error={formikProps.errors.password}
              secureTextEntry
              onChangeText={formikProps.handleChange('password')}
              value={formikProps.values.password}
              onBlur={formikProps.handleBlur('password')}
            />

            <Text style={styles.error}>
              {formikProps.touched.password && formikProps.errors.password}
            </Text>

            <View style={styles.button}>
              {!loading ? (
                <>
                  <Button
                    style={styles.button}
                    mode={'contained'}
                    uppercase={false}
                    onPress={formikProps.handleSubmit}>
                    {t('Sign in')}
                  </Button>
                  <Button
                    style={styles.button}
                    mode={'contained'}
                    uppercase={false}
                    onPress={() => navigation.navigate('sign-up')}>
                    {t('Sign up')}
                  </Button>
                </>
              ) : (
                <ActivityIndicator size={30} />
              )}
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    // backgroundColor: 'green',
  },
});
export default SignIn;
