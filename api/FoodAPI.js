import axios from 'axios';
import { BACKEND_URL } from '../env.config';
import resolver from './resolver';

const searchFood = async (token, searchQuery) => {
  return await resolver(
    axios
      .get(`${BACKEND_URL}/api/foods/search?query=${searchQuery}&limit=25`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data),
  );
};

const getFoodByBarcode = async (token, barcode) => {
  return await resolver(
    axios
      .get(`${BACKEND_URL}/api/foods`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          barcode,
        },
      })
      .then((res) => res.data),
  );
};

const createFood = async (token, food) => {
  return await resolver(
    axios
      .post(`${BACKEND_URL}/api/foods/add`, food, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data),
  );
};

export default { searchFood, getFoodByBarcode, createFood };
