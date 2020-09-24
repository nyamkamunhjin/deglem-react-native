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

export { formatDate, countCalories };
