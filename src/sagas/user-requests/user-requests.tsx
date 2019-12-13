import axios from 'axios';

const { origin, hostname, port } = window.location;

const defaultServerURL = `http://localhost:${port}`;

let URL =
  origin !== undefined && hostname !== 'localhost'
    ? origin
    : port === '8080'
    ? 'http://localhost:1234'
    : defaultServerURL;

// const USER_URL = 'http://localhost:1234/user';

const addUser = (data: any) => axios.post(`${URL}/user/create_user`, data);

const authenticate = (cookie: any) =>
  axios.get(`${URL}/user/current`, {
    headers: {
      'x-access-token': cookie
    }
  });

const authorizate = (data: any) => axios.post(`${URL}/user/authorizate`, data);

export { addUser, authenticate, authorizate };
