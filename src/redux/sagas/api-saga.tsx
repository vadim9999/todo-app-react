import { takeLatest } from 'redux-saga/effects';

import allUserWorkers from './user-saga/user-saga';
import allTaskWorkers from './task-saga/task-saga';

export default function* watcherSaga() {
  console.log('Call watcherSaga');

  yield takeLatest(
    ['ADD_TASK', 'GET_TASKS', 'UPDATE_TASK', 'DELETE_TASK'],
    allTaskWorkers
  );
  yield takeLatest(['ADD_USER', 'AUTHENTICATE', 'AUTHORIZATE'], allUserWorkers);
}
