import axios from 'axios';
import { LoginParams } from './app.types';

const { origin, hostname, port } = window.location;

const defaultServerURL = `http://localhost:${port}`;

// const URL =
//   origin !== undefined && hostname !== 'localhost'
//     ? origin
//     : port === '8080'
//       ? 'http://localhost:1234'
//       : defaultServerURL;

const URL = `http://${hostname}:1234`

// const USER_URL = 'http://localhost:1234/user';

const addUser = (data: any) => axios.post(`${URL}/user/create_user`, data);

const authenticate = (cookie: any) =>
  axios.get(`${URL}/user/current`, {
    headers: {
      'x-access-token': cookie
    }
  });

const login = (data: LoginParams) => axios.post(`${URL}/user/login`, data).then((res) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;

  return res.data;
});

export { addUser, authenticate, login };
