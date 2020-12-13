import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';

import {
  DataTable,
  Searchbar,
  withTheme,
  Text,
  Button,
  Chip,
} from 'react-native-paper';
import cookieContext from '../context/cookie-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FoodAPI from '../api/FoodAPI';
import { useTranslation } from 'react-i18next';
import { addToRecentFoods, getRecentFoods } from '../functions/recentFoods';
import RecipeAPI from '../api/RecipeAPI';

/**
 * @author
 * @function SearchFood
 **/
const SearchFood = (props) => {
  const { t } = useTranslation();
  const { colors } = props.theme;
  const { navigation } = props;
  const { token } = useContext(cookieContext);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loadingBar, setLoadingBar] = useState(false);
  const [recipeSelected, setRecipeSelected] = useState(false);
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

  const handleRecipeSearch = async () => {
    setLoadingBar(true);
    if (searchQuery === '') {
      setLoadingBar(false);
      setSearchResult([]);
    } else {
      const { data, err } = await RecipeAPI.searchRecipe(token, searchQuery);

      if (err) {
        console.error(err);
      } else {
        setSearchResult(data);
        setLoadingBar(false);
        // console.log(await getRecentFoods());
      }
    }
  };

  useEffect(() => {
    getRecentFoods().then((foods) => {
      setSearchResult(foods);
    });
  }, []);

  const { container, searchbar } = styles;
  return (
    <View style={container}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Searchbar
          style={searchbar}
          placeholder={!recipeSelected ? t('Search Food') : t('Search recipe')}
          onChangeText={onChangeSearch}
          value={searchQuery}
          onIconPress={!recipeSelected ? handleSearch : handleRecipeSearch}
          onSubmitEditing={!recipeSelected ? handleSearch : handleRecipeSearch}
        />
        <Button
          style={styles.barcode}
          onPress={() =>
            navigation.navigate('barcode-scanner', {
              addTo: props.route.params.name,
              selectedDate: props.route.params.selectedDate,
            })
          }>
          <Icon name="barcode" size={30} />
        </Button>
        <Button
          style={styles.barcode}
          onPress={() =>
            navigation.navigate('create-food', {
              barcode: null,
            })
          }>
          <Icon name="food" size={30} />
        </Button>
      </View>
      <View style={styles.filters}>
        <Chip
          icon={() =>
            recipeSelected && <Icon name="check" size={15} color={'white'} />
          }
          selected={recipeSelected}
          selectedColor={colors.accent}
          onPress={() => setRecipeSelected(!recipeSelected)}
          textStyle={{ color: colors.white }}
          style={{ ...styles.chip, backgroundColor: colors.accent }}>
          Recipe
        </Chip>
      </View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>{t('Food')}</DataTable.Title>
          <DataTable.Title numeric>{t('Serving')}</DataTable.Title>
          <DataTable.Title numeric>{t('Calories')}</DataTable.Title>
        </DataTable.Header>
        <FlatList
          data={searchResult}
          refreshControl={
            <RefreshControl
              refreshing={loadingBar}
              onRefresh={handleSearch}
              enabled={false}
              colors={[colors.protein, colors.carbs, colors.fat]}
            />
          }
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <DataTable.Row
              onPress={() => {
                navigation.navigate('add-food', {
                  addTo: props.route.params.name,
                  selectedDate: props.route.params.selectedDate,
                  food: item.document,
                });
                addToRecentFoods(item);
              }}>
              <DataTable.Cell>{item.document.name}</DataTable.Cell>
              <DataTable.Cell numeric>
                {`${item.document.serving.size} ${t(
                  item.document.serving.unit,
                )}`}
              </DataTable.Cell>
              <DataTable.Cell numeric>{item.document.calories}</DataTable.Cell>
            </DataTable.Row>
          )}
          ListEmptyComponent={() => (
            <Text style={styles.text}>
              {!loadingBar && t('No food found.')}
            </Text>
          )}
        />
      </DataTable>
    </View>
  );
};

const styles = StyleSheet.create({
  barcode: {
    flex: 0.001,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  searchbar: {
    flex: 10,
    margin: 5,
    borderRadius: 10,
  },
  loadingBar: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  text: {
    marginTop: 20,
    textAlign: 'center',
  },
  filters: {
    height: 50,
    // backgroundColor: 'green',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  chip: {
    width: 'auto',
  },
});
export default withTheme(SearchFood);
