import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import mySaga from "../sagas/api-saga";
import tasksReducer from "../tasks/tasksSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: { tasks: tasksReducer },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

sagaMiddleware.run(mySaga);

