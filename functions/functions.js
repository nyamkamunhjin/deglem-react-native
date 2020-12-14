import CookieManager from '@react-native-community/cookies';
import { BACKEND_URL } from '../env.config';
import _ from 'lodash';

const formatDate = (date) => {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }

  return [year, month, day].join('-');
};

const calculateTotalCalories = (today) => {
  const { breakfast, lunch, dinner, snacks } = today;
  return (
    countCalories(breakfast) +
    countCalories(lunch) +
    countCalories(dinner) +
    countCalories(snacks)
  );
};

const countCalories = (foods) => {
  if (foods) {
    return parseInt(
      foods.reduce((acc, obj) => acc + obj.food.calories * obj.serving, 0),
      10,
    );
  } else {
    return 0;
  }
};

const MifflinStJourFormula = ({
  age,
  gender,
  height,
  currentWeight,
  weeklyGoal,
  activityLevel,
}) => {
  const activityFactor = {
    Sedentary: 1.2,
    'Lightly Active': 1.375,
    Active: 1.55,
    'Very Active': 1.725,
  };

  const basalMetabolicRate =
    10 * currentWeight +
    6.25 * height -
    5 * age +
    (gender === 'Male' ? 5 : -161);

  const maintainCalories = activityFactor[activityLevel] * basalMetabolicRate;
  // const weeklyMaintainCalories = 7 * maintainCalories;

  const OptimalCaloriesForGoal =
    maintainCalories + (weeklyGoal * (3500 * 2.2)) / 7;
  return parseInt(OptimalCaloriesForGoal, 10);
};

const calculateAge = (birthday) => {
  // birtdday is a date
  let ageDifMs = Date.now() - new Date(birthday).getTime();
  let ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const getToken = async () => {
  try {
    const {
      token: { value },
    } = await CookieManager.get(BACKEND_URL);
    // console.log('value:', value);
    return value;
    // return value;
  } catch (err) {
    console.error(err);
  }
};

const getNutritionProgress = (diary) => {
  // console.log('diary:', diary);
  if (!diary || _.isEqual(diary, {})) {
    return {};
  }
  // console.log(diary);
  const foods = [
    ...diary.breakfast,
    ...diary.lunch,
    ...diary.dinner,
    ...diary.snacks,
  ];
  // console.log('foods:', foods);

  // console.log(nutritionProgress);
  return sumNutritionValues(foods);
};

const sumNutritionValues = (foods) => {
  let nutritionProgress = {};
  foods.map(({ food, serving }) => {
    let values = cleanUpFood(food, true);
    // console.log(values);

    Object.entries(values).map(([key, value]) => {
      if (!nutritionProgress[key]) {
        nutritionProgress[key] = 0;
      }

      nutritionProgress[key] += parseInt(value * serving, 10);
    });
  });
  // console.log(nutritionProgress);
  return nutritionProgress;
};

const calculateNutrition = (foods) => {
  console.log(foods);
  let nutritionProgress = {};
  foods.map(({ document: food, document: { currentServing: serving } }) => {
    let values = recipeAddCleanUp(food, true);
    // console.log(values);

    Object.entries(values).map(([key, value]) => {
      if (!nutritionProgress[key]) {
        nutritionProgress[key] = 0;
      }

      nutritionProgress[key] += parseInt(value * serving, 10);
    });
  });
  console.log(nutritionProgress);
  return nutritionProgress;
};

const cleanUpFood = (doc, macro = false) => {
  let temp = {
    ...doc,
  };
  delete temp._id;
  delete temp.name;

  if (!macro) {
    delete temp.protein;
    delete temp.totalCarbohydrates;
    delete temp.totalFat;
  }
  delete temp.serving;
  delete temp.__v;
  delete temp.barcode;
  delete temp.creator;
  delete temp.calories;
  delete temp.recipe;
  delete temp.recipeDescription;
  delete temp.ingredients;

  return temp;
};

const recipeAddCleanUp = (doc, macro = false) => {
  let temp = {
    ...doc,
  };
  delete temp._id;
  delete temp.name;

  if (!macro) {
    delete temp.protein;
    delete temp.totalCarbohydrates;
    delete temp.totalFat;
  }
  delete temp.serving;
  delete temp.__v;
  delete temp.barcode;
  delete temp.creator;
  delete temp.recipe;
  delete temp.recipeDescription;
  delete temp.ingredients;

  return temp;
};

export {
  formatDate,
  countCalories,
  calculateTotalCalories,
  MifflinStJourFormula,
  calculateAge,
  calculateNutrition,
  getToken,
  sumNutritionValues,
  getNutritionProgress,
  cleanUpFood,
};
