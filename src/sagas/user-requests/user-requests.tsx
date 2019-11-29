import axios from 'axios';

const defaultServerURL = 'http://localhost:1234'

const {origin, hostname} = window.location;

let URL = origin !== undefined && hostname !== 'localhost' ?  origin : defaultServerURL

// const USER_URL = 'http://localhost:1234/user';

const addUser = (data:any) => axios.post(`${URL}/user/create_user`, data);

const authenticate = (cookie:any) => axios.get(`${URL}/current`, {
  headers: {
    'x-access-token': cookie,
  },
});

const authorizate = (data:any) => axios.post(`${URL}/user/authorizate`, data);

export {
  addUser,
  authenticate,
  authorizate,
};
