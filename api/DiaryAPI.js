import axios from 'axios';
import { BACKEND_URL } from '../env.config';
import resolver from './resolver';

const fetchDiary = async (token, date) => {
  return await resolver(
    axios.get(
      `${BACKEND_URL}/api/diary?user_id=5f607f85a586e00e416f2124&range=1&date=${date}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    ),
  ).then((res) => res.data);
};

const removeFood = async (token, item) => {
  return await resolver(
    axios
      .delete(`${BACKEND_URL}/api/diary/food/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          name: item.name,
          _id: item._id,
        },
      })
      .then((res) => res.data),
  );
};

const addFood = async (token, data) => {
  return await resolver(
    axios
      .post(`${BACKEND_URL}/api/diary/food/add`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data),
  );
};

const editFood = async (token, data) => {
  return await resolver(
    axios
      .put(`${BACKEND_URL}/api/diary/food/update`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data),
  );
};

export default { fetchDiary, removeFood, addFood, editFood };
