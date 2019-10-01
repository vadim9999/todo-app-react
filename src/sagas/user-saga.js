import { addUser } from "./user-requests"
import { takeLatest, takeEvery, call, put } from "redux-saga/effects";

export default function* allUserWorkers(action) {

    switch (action.type) {
        case "ADD_USER":
            yield userWorker(addUser, action)
            break;

    }
}

function* userWorker(requestFunction, { type, payload }) {
    try {

        const result = yield call(requestFunction, payload)
        console.log(result);
        // @TODO create new obj and place there token and data from response 
        yield put({ type: `${type}_SUCCESS`, payload: result.data, token: result.headers["x-auth-token"] })
    } catch (e) {
        yield put({ type: `${type}_SUCCESS`, e })
    }
}