import axios from 'axios';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  ActivityIndicator,
  DataTable,
  Searchbar,
  withTheme,
  Text,
} from 'react-native-paper';
import { BACKEND_URL } from '../env.config';

/**
 * @author
 * @function SearchFood
 **/
const SearchFood = (props) => {
  const { colors } = props.theme;
  const { navigation } = props;

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loadingBar, setLoadingBar] = useState(false);

  const onChangeSearch = (query) => setSearchQuery(query);

  const handleSearch = () => {
    setLoadingBar(true);
    if (searchQuery === '') {
      setLoadingBar(false);
      setSearchResult([]);
    } else {
      axios
        .get(`${BACKEND_URL}/api/foods/search?query=${searchQuery}&limit=20`)
        .then((res) => {
          // console.log('results', res.data);
          setSearchResult(res.data);
          setLoadingBar(false);
        });
    }
  };

  const { container, searchbar } = styles;
  return (
    <View style={container}>
      <Searchbar
        style={searchbar}
        placeholder="Search food"
        onChangeText={onChangeSearch}
        value={searchQuery}
        onIconPress={handleSearch}
        onSubmitEditing={handleSearch}
      />
      <ScrollView>
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
            <Text style={{ marginTop: 20, textAlign: 'center' }}>
              No food found.
            </Text>
          )}
        </DataTable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  searchbar: {
    margin: 5,
    borderRadius: 10,
  },
  loadingBar: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
});
export default withTheme(SearchFood);
