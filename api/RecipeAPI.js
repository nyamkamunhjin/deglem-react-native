import axios from 'axios';
import { BACKEND_URL } from '../env.config';
import resolver from './resolver';

const searchRecipe = async (token, searchQuery) => {
  return await resolver(
    axios
      .get(
        `${BACKEND_URL}/api/foods/recipe/search?query=${searchQuery}&limit=25`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => res.data),
  );
};
// /api/foods/recipe/search?query=&limit=10

export default {
  searchRecipe,
};
