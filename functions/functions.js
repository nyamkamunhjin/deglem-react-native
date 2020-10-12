function formatDate(date) {
  var d = new Date(date),
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
}

const countCalories = (foods) => {
  if (foods) {
    return parseInt(
      foods.reduce((acc, obj) => acc + obj.food.calories * obj.serving, 0),
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
    maintainCalories + weeklyGoal * ((3500 * 2.2) / 7);
  return parseInt(OptimalCaloriesForGoal, 10);
};

function calculateAge(birthday) {
  // birtdday is a date
  var ageDifMs = Date.now() - new Date(birthday).getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export { formatDate, countCalories, MifflinStJourFormula, calculateAge };
