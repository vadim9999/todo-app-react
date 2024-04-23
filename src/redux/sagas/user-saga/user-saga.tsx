import { takeLatest, takeEvery, call, put } from 'redux-saga/effects';
import {
  addUser,
  authenticate,
  authorizate
} from '../user-requests/user-requests';

export default function* allUserWorkers(action: any) {
  switch (action.type) {
    case 'ADD_USER':
      yield userWorker(addUser, action);
      break;

    case 'AUTHENTICATE':
      yield authenticateUserWorker(authenticate, action);
      break;

    case 'AUTHORIZATE':
      yield userWorker(authorizate, action);
      break;
  }
}

function* authenticateUserWorker(requestFunction: any, { type, payload }: any) {
  try {
    const { data } = yield call(requestFunction, payload);
    yield put({ type: `${type}_SUCCESS`, payload: data });
  } catch (e) {
    yield put({ type: `${type}_FAILED`, e });
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
