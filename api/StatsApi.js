import axios from 'axios';
import moment from 'moment';
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

const fetchDiaries = async (token, date, lastDays) => {
  return await resolver(
    axios.get(`${BACKEND_URL}/api/diary/batch`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        startDate: moment(new Date(date))
          .add(-lastDays, 'days')
          .format('YYYY-MM-DD'),
        endDate: moment(new Date(date)).format('YYYY-MM-DD'),
      },
    }),
  ).then((res) => res.data);
};

export default {
  fetchDiaries,
  fetchWeights,
  addWeights,
};
