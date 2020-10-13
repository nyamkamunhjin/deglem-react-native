import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  ActivityIndicator,
  DataTable,
  Searchbar,
  withTheme,
  Text,
  Button,
} from 'react-native-paper';
import cookieContext from '../context/cookie-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FoodAPI from '../api/FoodAPI';

/**
 * @author
 * @function SearchFood
 **/
const SearchFood = (props) => {
  const { colors } = props.theme;
  const { navigation } = props;
  const { token } = useContext(cookieContext);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loadingBar, setLoadingBar] = useState(false);

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
      }
    }
  };

  const { container, searchbar } = styles;
  return (
    <View style={container}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Searchbar
          style={searchbar}
          placeholder="Search food"
          onChangeText={onChangeSearch}
          value={searchQuery}
          onIconPress={handleSearch}
          onSubmitEditing={handleSearch}
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
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
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
                onPress={() =>
                  navigation.navigate('add-food', {
                    addTo: props.route.params.name,
                    selectedDate: props.route.params.selectedDate,
                    food: res.document,
                  })
                }>
                <DataTable.Cell>{res.document.name}</DataTable.Cell>
                <DataTable.Cell numeric>
                  {`${res.document.serving.size} ${res.document.serving.unit}`}
                </DataTable.Cell>
                <DataTable.Cell numeric>{res.document.calories}</DataTable.Cell>
              </DataTable.Row>
            ))
          ) : (
            <Text style={styles.text}>No food found.</Text>
          )}
        </DataTable>
      </ScrollView>
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
});
export default withTheme(SearchFood);
