import { takeLatest, takeEvery, call, put } from 'redux-saga/effects';
import {
  addUser,
  authenticate,
  login
} from '../api/app';
import axios from 'axios';
import { setUserInfo } from '../../main/mainSlice';

export default function* allUserWorkers(action: any) {
  switch (action.type) {
    case 'INIT':
      yield initWorker(() => undefined, action)
      break;

    case 'ADD_USER':
      yield userWorker(addUser, action);
      break;

    case 'LOGIN':
      yield loginWorker(login, action);
      break;

    case 'AUTHORIZATE':
      // yield userWorker(authorizate, action);
      break;
  }
}

function* initWorker(requestFunction: any, { type, payload }: any) {
  try {

    const token = localStorage.getItem("token");
    if (!token) {
      yield put(setUserInfo({
        isLoading: false,
        user: null,
      }));
      return;
    }

    const res = yield call(requestFunction, payload);


    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    // console.log("data123", );
    localStorage.setItem("token", token);

    // yield put({ type: `${type}_SUCCESS`, payload: data });
  } catch (e) {
    // yield put({ type: `${type}_FAILED`, e });
  }
}

function* loginWorker(requestFunction: any, { type, payload }: any) {
  try {
    const { token } = yield call(requestFunction, payload);
    // console.log("data123", );
    localStorage.setItem("token", token);

    // yield put({ type: `${type}_SUCCESS`, payload: data });
  } catch (e) {
    // yield put({ type: `${type}_FAILED`, e });
  }
}

function* userWorker(requestFunction: any, { type, payload }: any) {
  try {
    const result = yield call(requestFunction, payload);
    yield console.log('_________________Result of add user');
    yield console.log(result);
    // @TODO create new obj and place there token and data from response
    yield put({
      type: `${type}_SUCCESS`,
      payload: result.data,
      token: result.headers['x-auth-token']
    });
  } catch (e) {
    yield put({ type: `${type}_FAILED`, e });
  }
}
