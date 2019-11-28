import { call, put,
} from 'redux-saga/effects';
import {
  createTask, getTasks, updateTask, deleteTask,
} from '../task-requests/task-requests';


export default function* allTaskWorkers(action:any) {
  switch (action.type) {
    case 'ADD_TASK':
      yield taskWorker({
        requestFunction: createTask,
        action,
      });
      break;

    case 'GET_TASKS':
      yield taskWorkerGetTasks({
        requestFunction: getTasks,
        action,
      });
      break;
    case 'UPDATE_TASK':

      yield taskWorker({
        action,
        callback: taskWorkerUpdateTask,
      });
      break;


    case 'DELETE_TASK':
      yield taskWorker({
        action,
        callback: taskWorkerDeleteTask,
      });
  }
}

function* taskWorkerGetTasks({ requestFunction, action, callback }:any) {
  yield console.log('********TAsk worker');
  const { type, payload } = action;
  try {
    if (callback !== undefined) {
      yield callback(action);
      yield console.log('this is workder and calling callback');
    } else {
      const { data } = yield call(requestFunction, payload);

      // const selectedRowKeys = yield data.filter(task => task.completed)

      const selectedRows = yield [];
      yield data.map((task:any, index:number) => {
        if (task.completed) {
          selectedRows.push(index);
        }
      });

      yield put({ type: `${type}_SUCCESS`, payload: { data, selectedRowKeys: selectedRows } });

      // yield put({ type: 'ADD_SELECTED_ROW_KEYS', payload:[2]})
    }
  } catch (e) {
    console.log('error');
    yield put({ type: `${type}_FAILED`, e });
  }
}

function* taskWorkerUpdateTask({ payload }:any) {
  yield console.log('callback');
  yield call(updateTask, payload);
  yield put({ type: 'UPDATE_TASK_SUCCESS' });
  yield put({ type: 'GET_TASKS', payload: payload.login_id });
}

function* taskWorkerDeleteTask({ payload }:any) {
  yield call(deleteTask, payload);
  yield put({ type: 'DELETE_TASK_SUCCESS' });
  yield put({ type: 'GET_TASKS', payload: payload.login_id });
}

function* taskWorker({ requestFunction, action, callback }:any) {
  yield console.log('********TAsk worker');
  const { type, payload } = action;
  try {
    if (callback !== undefined) {
      yield callback(action);
      yield console.log('this is workder and calling callback');
    } else {
      const { data } = yield call(requestFunction, payload);

      yield put({ type: `${type}_SUCCESS`, payload: data });
    }
  } catch (e) {
    console.log('error');
    yield put({ type: `${type}_FAILED`, e });
  }
}
