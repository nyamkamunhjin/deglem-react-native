import axios from 'axios';
import { BACKEND_URL } from '../env.config';
import resolver from './resolver';

const signIn = async (values) => {
  return await resolver(
    axios.post(`${BACKEND_URL}/auth/login`, values).then((res) => res.data),
  );
};

const signUp = async (userData) => {
  return await resolver(
    axios
      .post(`${BACKEND_URL}/auth/register`, { userInfo: { ...userData } })
      .then((res) => res.data),
  );
};

const getUser = async (token) => {
  return await resolver(
    axios
      .get(`${BACKEND_URL}/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data),
  );
};

const updateUser = async (token, update) => {
  return await resolver(
    axios
      .post(`${BACKEND_URL}/api/users/update`, update, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data),
  );
};

export default { signIn, getUser, signUp, updateUser };
