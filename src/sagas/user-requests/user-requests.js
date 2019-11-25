import axios from 'axios';

const USER_URL = 'http://localhost:1234/user';

const addUser = (data) => axios.post(`${USER_URL}/create_user`, data);

const authenticate = (cookie) => axios.get(`${USER_URL}/current`, {
  headers: {
    'x-access-token': cookie,
  },
});

const authorizate = (data) => axios.post(`${USER_URL}/authorizate`, data);

export {
  addUser,
  authenticate,
  authorizate,
};
