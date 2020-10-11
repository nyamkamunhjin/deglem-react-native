import { Formik } from 'formik';
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  Button,
  Caption,
  Headline,
  List,
  Subheading,
  TextInput,
  Title,
  ToggleButton,
  withTheme,
} from 'react-native-paper';
import * as yup from 'yup';
import axios from 'axios';
import { BACKEND_URL } from '../env.config';
import { StackActions, useNavigation } from '@react-navigation/native';
import globalStyles from '../global-styles';
import { ScrollView } from 'react-native-gesture-handler';
import cookieContext from '../context/cookie-context';

const createFoodSchema = yup.object({
  name: yup.string().required('Food name is required').min(2),
  size: yup.string().required('Unit size is required'),
  unit: yup.string().required('Required').min(1),
  servingPerContainer: yup.string().required('Serving size is required'),
  calories: yup.string().required('Calories is required'),
  totalFat: yup.string().required('nutrient info is required'),
  totalCarbohydrates: yup.string().required('nutrient info is required'),
  protein: yup.string().required('nutrient info is required'),
});

/**
 * @author
 * @function CreateFood
 **/
const CreateFood = ({ navigation, route, theme }) => {
  const { cookies } = useContext(cookieContext);

  const { colors } = theme;
  const { barcode } = route.params;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 5,
    },
    form: {
      margin: 10,
    },
    input: {
      height: 35,
      borderRadius: 5,
      // marginBottom: 5,
    },
    button: {
      // flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      // borderRadius: 10,
      margin: 5,

      // width: 150,
      alignSelf: 'center',
    },
    error: {
      color: 'red',
      // marginBottom: 20,
      // backgroundColor: 'green',
    },
    inputTitle: {
      backgroundColor: colors.primary,
      borderTopRightRadius: 3,
      borderTopLeftRadius: 3,
      // padding: 3,
      paddingLeft: 5,
    },
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Subheading>Sorry product could not be found in database. </Subheading>
      <Caption>Help us by adding food to our database.</Caption>
      <Title>Create Food</Title>

      <Formik
        validationSchema={createFoodSchema}
        initialValues={{
          name: '',
          calories: '',
          protein: '',
          totalCarbohydrates: '',
          totalFat: '',
          size: '',
          unit: '',
          servingPerContainer: '',
        }}
        onSubmit={(values, actions) => {
          console.log(values);
          let food = { ...values };
          delete food.size;
          delete food.servingPerContainer;
          delete food.unit;
          food.barcode = barcode;
          food.serving = {
            size: values.size,
            unit: values.unit,
            servingPerContainer: values.servingPerContainer,
          };

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
                .post(`${BACKEND_URL}/api/foods/add`, food, {
                  headers: {
                    Authorization: `Bearer ${value}`,
                  },
                })
                .then(({ data, response }) => {
                  if (data) {
                    navigation.navigate('diary-tab');
                  }
                })
                .catch((err) => {
                  console.log('axios: ', err);
                });
            })
            .catch((err) => {
              console.error(err);
            });
        }}>
        {(formikProps) => (
          <View style={styles.form}>
            <Text style={styles.inputTitle}>Food Name</Text>
            <View>
              <TextInput
                // 3="Food Name"
                mode={'flat'}
                style={styles.input}
                error={formikProps.errors.name}
                onChangeText={formikProps.handleChange('name')}
                value={formikProps.values.name}
                onBlur={formikProps.handleBlur('name')}
              />
              <Text style={styles.error}>
                {formikProps.touched.name && formikProps.errors.name}
              </Text>
            </View>

            <Subheading>Servings</Subheading>
            <View style={globalStyles.row}>
              <View style={globalStyles.flex}>
                <Text style={styles.inputTitle}>Size</Text>
                <TextInput
                  // 3="Size"
                  keyboardType="numeric"
                  mode={'flat'}
                  style={styles.input}
                  error={formikProps.errors.size}
                  onChangeText={formikProps.handleChange('size')}
                  value={formikProps.values.size}
                  onBlur={formikProps.handleBlur('size')}
                />

                <Text style={styles.error}>
                  {formikProps.touched.size && formikProps.errors.size}
                </Text>
              </View>
              <View style={globalStyles.flex}>
                <Text style={styles.inputTitle}>Unit</Text>
                <TextInput
                  // 3="Unit"
                  mode={'flat'}
                  style={styles.input}
                  error={formikProps.errors.unit}
                  onChangeText={formikProps.handleChange('unit')}
                  value={formikProps.values.unit}
                  onBlur={formikProps.handleBlur('unit')}
                />

                <Text style={styles.error}>
                  {formikProps.touched.unit && formikProps.errors.unit}
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.inputTitle}>Serving Per Container</Text>
              <TextInput
                // 3="Serving Per Container"
                mode={'flat'}
                style={styles.input}
                keyboardType="numeric"
                error={formikProps.errors.servingPerContainer}
                onChangeText={formikProps.handleChange('servingPerContainer')}
                value={formikProps.values.servingPerContainer}
                onBlur={formikProps.handleBlur('servingPerContainer')}
              />

              <Text style={styles.error}>
                {formikProps.touched.servingPerContainer &&
                  formikProps.errors.servingPerContainer}
              </Text>
            </View>
            <View>
              <Text style={styles.inputTitle}>Calories</Text>
              <TextInput
                // 3="Serving Per Container"
                mode={'flat'}
                style={styles.input}
                keyboardType="numeric"
                error={formikProps.errors.calories}
                onChangeText={formikProps.handleChange('calories')}
                value={formikProps.values.calories}
                onBlur={formikProps.handleBlur('calories')}
              />

              <Text style={styles.error}>
                {formikProps.touched.calories && formikProps.errors.calories}
              </Text>
            </View>
            <Subheading>Nutrients</Subheading>
            <View>
              <Text style={styles.inputTitle}>Protein</Text>
              <TextInput
                keyboardType="numeric"
                // 3="Protein"
                mode={'flat'}
                style={styles.input}
                error={formikProps.errors.protein}
                onChangeText={formikProps.handleChange('protein')}
                value={formikProps.values.protein}
                onBlur={formikProps.handleBlur('protein')}
              />

              <Text style={styles.error}>
                {formikProps.touched.protein && formikProps.errors.protein}
              </Text>
            </View>
            <View>
              <Text style={styles.inputTitle}>Carbohydrates</Text>
              <TextInput
                keyboardType="numeric"
                // 3="Carbohydrates"
                mode={'flat'}
                style={styles.input}
                error={formikProps.errors.totalCarbohydrates}
                onChangeText={formikProps.handleChange('totalCarbohydrates')}
                value={formikProps.values.totalCarbohydrates}
                onBlur={formikProps.handleBlur('totalCarbohydrates')}
              />

              <Text style={styles.error}>
                {formikProps.touched.totalCarbohydrates &&
                  formikProps.errors.totalCarbohydrates}
              </Text>
            </View>
            <View>
              <Text style={styles.inputTitle}>Fats</Text>
              <TextInput
                keyboardType="numeric"
                // 3="Fats"
                mode={'flat'}
                style={styles.input}
                error={formikProps.errors.totalFat}
                onChangeText={formikProps.handleChange('totalFat')}
                value={formikProps.values.totalFat}
                onBlur={formikProps.handleBlur('totalFat')}
              />

              <Text style={styles.error}>
                {formikProps.touched.totalFat && formikProps.errors.totalFat}
              </Text>
            </View>
            <List.Accordion title="Optional">
              <View>
                <Text style={styles.inputTitle}>Sugars</Text>
                <TextInput
                  keyboardType="numeric"
                  mode={'flat'}
                  style={styles.input}
                  error={formikProps.errors.sugars}
                  onChangeText={formikProps.handleChange('sugars')}
                  value={formikProps.values.sugars}
                  onBlur={formikProps.handleBlur('sugars')}
                />

                <Text style={styles.error}>
                  {formikProps.touched.sugars && formikProps.errors.sugars}
                </Text>
              </View>

              <View>
                <Text style={styles.inputTitle}>Dietary Fibers</Text>
                <TextInput
                  keyboardType="numeric"
                  mode={'flat'}
                  style={styles.input}
                  error={formikProps.errors.dietaryFibers}
                  onChangeText={formikProps.handleChange('dietaryFibers')}
                  value={formikProps.values.dietaryFibers}
                  onBlur={formikProps.handleBlur('dietaryFibers')}
                />

                <Text style={styles.error}>
                  {formikProps.touched.dietaryFibers &&
                    formikProps.errors.dietaryFibers}
                </Text>
              </View>

              <View>
                <Text style={styles.inputTitle}>Saturated Fat</Text>
                <TextInput
                  keyboardType="numeric"
                  mode={'flat'}
                  style={styles.input}
                  error={formikProps.errors.saturatedFat}
                  onChangeText={formikProps.handleChange('saturatedFat')}
                  value={formikProps.values.saturatedFat}
                  onBlur={formikProps.handleBlur('saturatedFat')}
                />

                <Text style={styles.error}>
                  {formikProps.touched.saturatedFat &&
                    formikProps.errors.saturatedFat}
                </Text>
              </View>

              <View>
                <Text style={styles.inputTitle}>Monounsaturated Fat</Text>
                <TextInput
                  keyboardType="numeric"
                  mode={'flat'}
                  style={styles.input}
                  error={formikProps.errors.monoUnsaturatedFat}
                  onChangeText={formikProps.handleChange('monoUnsaturatedFat')}
                  value={formikProps.values.monoUnsaturatedFat}
                  onBlur={formikProps.handleBlur('monoUnsaturatedFat')}
                />

                <Text style={styles.error}>
                  {formikProps.touched.monoUnsaturatedFat &&
                    formikProps.errors.monoUnsaturatedFat}
                </Text>
              </View>
              <View>
                <Text style={styles.inputTitle}>Polyunsaturated Fat</Text>
                <TextInput
                  keyboardType="numeric"
                  mode={'flat'}
                  style={styles.input}
                  error={formikProps.errors.polyUnsaturatedFat}
                  onChangeText={formikProps.handleChange('polyUnsaturatedFat')}
                  value={formikProps.values.polyUnsaturatedFat}
                  onBlur={formikProps.handleBlur('polyUnsaturatedFat')}
                />

                <Text style={styles.error}>
                  {formikProps.touched.polyUnsaturatedFat &&
                    formikProps.errors.polyUnsaturatedFat}
                </Text>
              </View>
              <View>
                <Text style={styles.inputTitle}>Cholestrol</Text>
                <TextInput
                  keyboardType="numeric"
                  mode={'flat'}
                  style={styles.input}
                  error={formikProps.errors.cholestrol}
                  onChangeText={formikProps.handleChange('cholestrol')}
                  value={formikProps.values.cholestrol}
                  onBlur={formikProps.handleBlur('cholestrol')}
                />

                <Text style={styles.error}>
                  {formikProps.touched.cholestrol &&
                    formikProps.errors.cholestrol}
                </Text>
              </View>
              <View>
                <Text style={styles.inputTitle}>Vitamin A</Text>
                <TextInput
                  keyboardType="numeric"
                  mode={'flat'}
                  style={styles.input}
                  error={formikProps.errors.vitaminA}
                  onChangeText={formikProps.handleChange('vitaminA')}
                  value={formikProps.values.vitaminA}
                  onBlur={formikProps.handleBlur('vitaminA')}
                />

                <Text style={styles.error}>
                  {formikProps.touched.vitaminA && formikProps.errors.vitaminA}
                </Text>
              </View>
              <View>
                <Text style={styles.inputTitle}>Vitamin C</Text>
                <TextInput
                  keyboardType="numeric"
                  mode={'flat'}
                  style={styles.input}
                  error={formikProps.errors.vitaminC}
                  onChangeText={formikProps.handleChange('vitaminC')}
                  value={formikProps.values.vitaminC}
                  onBlur={formikProps.handleBlur('vitaminC')}
                />

                <Text style={styles.error}>
                  {formikProps.touched.vitaminC && formikProps.errors.vitaminC}
                </Text>
              </View>
              <View>
                <Text style={styles.inputTitle}>Vitamin D</Text>
                <TextInput
                  keyboardType="numeric"
                  mode={'flat'}
                  style={styles.input}
                  error={formikProps.errors.vitaminD}
                  onChangeText={formikProps.handleChange('vitaminD')}
                  value={formikProps.values.vitaminD}
                  onBlur={formikProps.handleBlur('vitaminD')}
                />

                <Text style={styles.error}>
                  {formikProps.touched.vitaminD && formikProps.errors.vitaminD}
                </Text>
              </View>
              <View>
                <Text style={styles.inputTitle}>Calcium</Text>
                <TextInput
                  keyboardType="numeric"
                  mode={'flat'}
                  style={styles.input}
                  error={formikProps.errors.calcium}
                  onChangeText={formikProps.handleChange('calcium')}
                  value={formikProps.values.calcium}
                  onBlur={formikProps.handleBlur('calcium')}
                />

                <Text style={styles.error}>
                  {formikProps.touched.calcium && formikProps.errors.calcium}
                </Text>
              </View>
              <View>
                <Text style={styles.inputTitle}>Iron</Text>
                <TextInput
                  keyboardType="numeric"
                  mode={'flat'}
                  style={styles.input}
                  error={formikProps.errors.iron}
                  onChangeText={formikProps.handleChange('iron')}
                  value={formikProps.values.iron}
                  onBlur={formikProps.handleBlur('iron')}
                />

                <Text style={styles.error}>
                  {formikProps.touched.iron && formikProps.errors.iron}
                </Text>
              </View>
              <View>
                <Text style={styles.inputTitle}>Potassium</Text>
                <TextInput
                  keyboardType="numeric"
                  mode={'flat'}
                  style={styles.input}
                  error={formikProps.errors.potassium}
                  onChangeText={formikProps.handleChange('potassium')}
                  value={formikProps.values.potassium}
                  onBlur={formikProps.handleBlur('potassium')}
                />

                <Text style={styles.error}>
                  {formikProps.touched.potassium &&
                    formikProps.errors.potassium}
                </Text>
              </View>
              <View>
                <Text style={styles.inputTitle}>Sodium</Text>
                <TextInput
                  keyboardType="numeric"
                  mode={'flat'}
                  style={styles.input}
                  error={formikProps.errors.sodium}
                  onChangeText={formikProps.handleChange('sodium')}
                  value={formikProps.values.sodium}
                  onBlur={formikProps.handleBlur('sodium')}
                />

                <Text style={styles.error}>
                  {formikProps.touched.sodium && formikProps.errors.sodium}
                </Text>
              </View>
            </List.Accordion>
            <View style={styles.button}>
              <Button
                style={styles.button}
                mode={'contained'}
                uppercase={false}
                onPress={formikProps.handleSubmit}>
                Create
              </Button>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default withTheme(CreateFood);
