import { takeLatest, takeEvery} from "redux-saga/effects";
import { ADD_TASK, FOUND_WORD } from "../constants/action-types";

import allUserWorkers from "./user-saga"
import allTaskWorkers from "./task-saga"

export default function* watcherSaga() {
    console.log("Call watcherSaga");

    yield takeLatest(["ADD_TASK", "GET_TASKS", "UPDATE_TASK", "DELETE_TASK"], allTaskWorkers)
    yield takeLatest(["ADD_USER", "AUTHENTICATE"], allUserWorkers)
}
