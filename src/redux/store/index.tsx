import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import mySaga from "../sagas/api-saga";
import tasksReducer from "../tasks/tasksSlice";
import mainReducer from '../main/mainSlice'

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: { tasks: tasksReducer, main: mainReducer },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// store.subscribe(() => {
//   const m = store.getState();
// })

sagaMiddleware.run(mySaga);

