import { ADD_TASK, FOUND_WORD } from '../constants/action-types';

export const addUser = (payload) => ({
  type: 'ADD_USER',
  payload,
});

export const authenticate = (payload) => ({
  type: 'AUTHENTICATE', payload,
});

export const authorizate = (payload) => ({
  type: 'AUTHORIZATE', payload,
});
