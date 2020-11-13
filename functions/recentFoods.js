import AsyncStorage from '@react-native-async-storage/async-storage';

const getRecentFoods = async () => {
  const foods = await AsyncStorage.getItem('recent-foods')
    .then((req) => JSON.parse(req))
    .catch((err) => console.error(err));
  return foods;
};

const addToRecentFoods = async (food) => {
  let foods = await getRecentFoods();

  if (!foods) {
    foods = [];
  }
  // check for same food
  const index = foods.findIndex(
    (item) => item.document._id === food.document._id,
  );
  if (index !== -1) {
    // most added food sort
    const temp = foods[index];
    foods[index] = foods[0];
    foods[0] = temp;
  } else {
    foods.unshift(food);
  }

  // limit cache to 30
  if (foods.length > 30) {
    foods.pop();
  }

  AsyncStorage.setItem('recent-foods', JSON.stringify(foods)).then((res) => {
    console.log('added food to cache');
  });
};

export { getRecentFoods, addToRecentFoods };
