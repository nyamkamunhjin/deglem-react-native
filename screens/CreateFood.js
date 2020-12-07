import { Formik } from 'formik';
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  ActivityIndicator,
  Button,
  Caption,
  Checkbox,
  DataTable,
  List,
  Searchbar,
  Subheading,
  TextInput,
  Title,
  withTheme,
} from 'react-native-paper';
import * as yup from 'yup';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import globalStyles from '../global-styles';
import { ScrollView } from 'react-native-gesture-handler';
import cookieContext from '../context/cookie-context';
import FoodAPI from '../api/FoodAPI';
import { useTranslation } from 'react-i18next';
import FoodTable from '../components/FoodTable/FoodTable';
import SearchFood from './SearchFood';
import NumericInput from 'react-native-numeric-input';
import { calculateNutrition } from '../functions/functions';
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

const recipeSchema = yup.object({
  name: yup.string().required('Food name is required').min(2),
  size: yup.string().required('Unit size is required'),
  unit: yup.string().required('Required').min(1),
  servingPerContainer: yup.string().required('Serving size is required'),
});
/**
 * @author
 * @function CreateFood
 **/

const CreateFood = ({ navigation, route, theme }) => {
  const { t } = useTranslation();
  const { token } = useContext(cookieContext);
  const [isRecipe, setIsRecipe] = useState(false);
  const [recipeFoods, setRecipeFoods] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loadingBar, setLoadingBar] = useState(false);
  // const [serving, setServing] = useState([]);

  const onChangeSearch = (query) => setSearchQuery(query);

  const handleSearch = async () => {
    setLoadingBar(true);
    if (searchQuery === '') {
      setLoadingBar(false);
      setSearchResult([]);
    } else {
      const { data, err } = await FoodAPI.searchFood(token, searchQuery);

      if (err) {
        console.error(err);
      } else {
        setSearchResult(data);
        setLoadingBar(false);
        // console.log(await getRecentFoods());
      }
    }
  };

  // const customEditFood = () => {};

  // const customDeleteFood = () => {};

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
    searchbar: {
      flex: 10,
      margin: 5,
      borderRadius: 10,
    },
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Subheading>
        {t('Sorry product could not be found in database.')}
      </Subheading>
      <Caption>{t('Help us by adding food to our database.')}</Caption>
      <Title>{t('Create Food')}</Title>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Checkbox
          status={isRecipe ? 'checked' : 'unchecked'}
          onPress={() => {
            setIsRecipe(!isRecipe);
          }}
        />
        <Text>{t('Recipe')}</Text>
      </View>
      <Formik
        validationSchema={isRecipe ? recipeSchema : createFoodSchema}
        d
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
        onSubmit={async (values, actions) => {
          let food = { ...values };
          delete food.size;
          delete food.servingPerContainer;
          delete food.unit;

          if (barcode) {
            food.barcode = barcode;
          }

          food.serving = {
            size: values.size,
            unit: values.unit,
            servingPerContainer: values.servingPerContainer,
          };

          if (isRecipe) {
            // calculateNutrition(recipeFoods);
            food.recipe = true;
            food.ingredients = recipeFoods.map((item) => {
              return {
                food: item.document._id,
                serving: item.document.currentServing,
              };
            });
            food = { ...food, ...calculateNutrition(recipeFoods) };
          }

          console.log(food);
          const { data, err } = await FoodAPI.createFood(token, food);

          if (err) {
            console.error(err);
          } else {
            if (data) {
              navigation.navigate('diary-tab');
            }
          }
        }}>
        {(formikProps) => (
          <View style={styles.form}>
            <Text style={styles.inputTitle}>{t('Food Name')}</Text>
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

            <Subheading>{t('Serving')}</Subheading>
            <View style={globalStyles.row}>
              <View style={globalStyles.flex}>
                <Text style={styles.inputTitle}>{t('Serving size')}</Text>
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
                <Text style={styles.inputTitle}>{t('Unit')}</Text>
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
              <Text style={styles.inputTitle}>
                {t('Serving Per Container')}
              </Text>
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
            {!isRecipe ? (
              <>
                <View>
                  <Text style={styles.inputTitle}>{t('Calories')}</Text>
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
                    {formikProps.touched.calories &&
                      formikProps.errors.calories}
                  </Text>
                </View>
                <Subheading>{t('Nutrition')}</Subheading>
                <View>
                  <Text style={styles.inputTitle}>{t('Protein')}</Text>
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
                  <Text style={styles.inputTitle}>{t('Carbohydrates')}</Text>
                  <TextInput
                    keyboardType="numeric"
                    // 3="Carbohydrates"
                    mode={'flat'}
                    style={styles.input}
                    error={formikProps.errors.totalCarbohydrates}
                    onChangeText={formikProps.handleChange(
                      'totalCarbohydrates',
                    )}
                    value={formikProps.values.totalCarbohydrates}
                    onBlur={formikProps.handleBlur('totalCarbohydrates')}
                  />

                  <Text style={styles.error}>
                    {formikProps.touched.totalCarbohydrates &&
                      formikProps.errors.totalCarbohydrates}
                  </Text>
                </View>
                <View>
                  <Text style={styles.inputTitle}>{t('Fats')}</Text>
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
                    {formikProps.touched.totalFat &&
                      formikProps.errors.totalFat}
                  </Text>
                </View>
                <List.Accordion title={t('Optional')}>
                  <View>
                    <Text style={styles.inputTitle}>{t('Sugars')}</Text>
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
                    <Text style={styles.inputTitle}>{t('Dietary Fibers')}</Text>
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
                    <Text style={styles.inputTitle}>{t('Saturated Fat')}</Text>
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
                    <Text style={styles.inputTitle}>
                      {t('Mono Unsaturated Fat')}
                    </Text>
                    <TextInput
                      keyboardType="numeric"
                      mode={'flat'}
                      style={styles.input}
                      error={formikProps.errors.monoUnsaturatedFat}
                      onChangeText={formikProps.handleChange(
                        'monoUnsaturatedFat',
                      )}
                      value={formikProps.values.monoUnsaturatedFat}
                      onBlur={formikProps.handleBlur('monoUnsaturatedFat')}
                    />

                    <Text style={styles.error}>
                      {formikProps.touched.monoUnsaturatedFat &&
                        formikProps.errors.monoUnsaturatedFat}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.inputTitle}>
                      {t('Poly Unsaturated Fat')}
                    </Text>
                    <TextInput
                      keyboardType="numeric"
                      mode={'flat'}
                      style={styles.input}
                      error={formikProps.errors.polyUnsaturatedFat}
                      onChangeText={formikProps.handleChange(
                        'polyUnsaturatedFat',
                      )}
                      value={formikProps.values.polyUnsaturatedFat}
                      onBlur={formikProps.handleBlur('polyUnsaturatedFat')}
                    />

                    <Text style={styles.error}>
                      {formikProps.touched.polyUnsaturatedFat &&
                        formikProps.errors.polyUnsaturatedFat}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.inputTitle}>{t('Cholestrol')}</Text>
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
                    <Text style={styles.inputTitle}>{t('Vitamin A')}</Text>
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
                      {formikProps.touched.vitaminA &&
                        formikProps.errors.vitaminA}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.inputTitle}>{t('Vitamin C')}</Text>
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
                      {formikProps.touched.vitaminC &&
                        formikProps.errors.vitaminC}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.inputTitle}>{t('Vitamin D')}</Text>
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
                      {formikProps.touched.vitaminD &&
                        formikProps.errors.vitaminD}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.inputTitle}>{t('Calcium')}</Text>
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
                      {formikProps.touched.calcium &&
                        formikProps.errors.calcium}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.inputTitle}>{t('Iron')}</Text>
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
                    <Text style={styles.inputTitle}>{t('Potassium')}</Text>
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
                    <Text style={styles.inputTitle}>{t('Sodium')}</Text>
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
              </>
            ) : (
              <View>
                <View style={styles.foodList}>
                  {recipeFoods &&
                    recipeFoods.map(({ document }, index) => (
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                        key={index}>
                        <Text style={{ flex: 2 }}>{document.name}, </Text>
                        <Text style={{ flex: 2 }}>
                          {document.serving.size} {document.serving.unit}
                        </Text>
                        <NumericInput
                          // type="up-down"

                          valueType="real"
                          step={0.1}
                          totalWidth={100}
                          totalHeight={35}
                          rounded
                          value={document.currentServing}
                          onChange={(num) => {
                            setRecipeFoods((prev) =>
                              prev.map((item) => {
                                if (item.document._id === document._id) {
                                  item.document.currentServing = num;
                                }
                                return item;
                              }),
                            );
                          }}
                        />
                        <Button
                          style={{ flex: 1 }}
                          onPress={() => {
                            setRecipeFoods((previous) => {
                              return previous.filter(
                                (item) => item.document._id !== document._id,
                              );
                            });
                          }}>
                          <Icon name="delete" size={25} />
                        </Button>
                      </View>
                    ))}
                </View>
                <List.Accordion title={t('Search Food')}>
                  <View>
                    <Searchbar
                      style={styles.searchbar}
                      placeholder={t('Search Food')}
                      onChangeText={onChangeSearch}
                      value={searchQuery}
                      onIconPress={handleSearch}
                      onSubmitEditing={handleSearch}
                    />
                    <ScrollView
                      showsVerticalScrollIndicator={false}
                      style={{ height: 250 }}>
                      <DataTable>
                        <DataTable.Header>
                          <DataTable.Title>Food</DataTable.Title>
                          <DataTable.Title numeric>Serving</DataTable.Title>
                          <DataTable.Title numeric>Calories</DataTable.Title>
                        </DataTable.Header>
                        {loadingBar ? (
                          <ActivityIndicator
                            style={styles.loadingBar}
                            animating={true}
                            color={colors.primary}
                            size={'large'}
                          />
                        ) : searchResult.length !== 0 ? (
                          searchResult.map((res, index) => (
                            <DataTable.Row
                              key={index}
                              onPress={() => {
                                setRecipeFoods((prev) => [
                                  ...prev,
                                  {
                                    ...res,
                                    document: {
                                      ...res.document,
                                      currentServing: 0.5,
                                    },
                                  },
                                ]);
                              }}>
                              <DataTable.Cell>
                                {res.document.name}
                              </DataTable.Cell>
                              <DataTable.Cell numeric>
                                {`${res.document.serving.size} ${res.document.serving.unit}`}
                              </DataTable.Cell>
                              <DataTable.Cell numeric>
                                {res.document.calories}
                              </DataTable.Cell>
                            </DataTable.Row>
                          ))
                        ) : (
                          <Text style={styles.text}>No food found.</Text>
                        )}
                      </DataTable>
                    </ScrollView>
                  </View>
                </List.Accordion>
              </View>
            )}
            <View style={styles.button}>
              <Button
                style={styles.button}
                mode={'contained'}
                uppercase={false}
                onPress={formikProps.handleSubmit}>
                {t('Create')}
              </Button>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default withTheme(CreateFood);
