const percentageToGram = (type, calories, percent) => {
  if (type === 'protein' || type === 'totalCarbohydrates')
    return parseInt((calories * (percent / 100)) / 4, 10);

  if (type === 'totalFat')
    return parseInt((calories * (percent / 100)) / 9, 10);

  return percent;
};

export { percentageToGram };
