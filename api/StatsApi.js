import axios from 'axios';
import { BACKEND_URL } from '../env.config';
import resolver from './resolver';

const fetchWeights = async (token) => {
  return await resolver(
    axios.get(`${BACKEND_URL}/api/stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  ).then((res) => res.data);
};

const addWeights = async (token, data) => {
  return await resolver(
    axios.post(`${BACKEND_URL}/api/stats/add`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  ).then((res) => res.data);
};

export default {
  fetchWeights,
  addWeights,
};
