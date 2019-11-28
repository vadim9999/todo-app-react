// import { ADD_TASK, FOUND_WORD } from '../constants/action-types';

export const addUser = (payload:any) => ({
  type: 'ADD_USER',
  payload,
});

export const authenticate = (payload:any) => ({
  type: 'AUTHENTICATE', payload,
});

export const authorizate = (payload:any) => ({
  type: 'AUTHORIZATE', payload,
});
