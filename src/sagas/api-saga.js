import { takeLatest, takeEvery, call, put } from "redux-saga/effects";
import { ADD_TASK, FOUND_WORD } from "../constants/action-types";
import axios from "axios";

export default function* watcherSaga(){
    console.log("Call watcherSaga");

    yield takeLatest(["DATA_REQUESTED", ADD_TASK], allWorkers)
    // yield takeEvery(ADD_TASK, workerSagaAddTask)
    
    
}

function* allWorkers(action){
    if (action.type === ADD_TASK) {
        console.log("Saga_worker_ADD_TASK_action");
        console.log(action);
        
        yield workerSagaAddTask(action)
    }
}

function* workerSagaGetData(){
    console.log("call workerSaga");
    
    try {
        const payload = yield call(getData);
        yield put({ type: "DATA_LOADED", payload }); 
    } catch (e) {
        yield put({ type: "API_ERRORED", payload:e });
    }
}

function* workerSagaAddTask(action){
    console.log("Call workerAddTask");
    console.log(action);
    
    yield call(createTask, action.payload)
    // var bodyFormData = new FormData();
    // bodyFormData.set("name", name)
    // bodyFormData.set("price", price)

    // axios({
    //     method: 'post',
    //     url: 'http://localhost:1234/tasks/create',
    //     data: bodyFormData,
    //     config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
    //     })
    //     .then(function (response) {
    //         //handle success
    //         console.log(response);
    //     })
    //     .catch(function (response) {
    //         //handle error
    //         console.log(response);
    //     });
    
    
    
}

function createTask(payload){
    console.log("Saga__createTask_payload");
    
    console.log(payload);
    
    axios.post('http://localhost:1234/tasks/create', {
        name: payload.taskName,
        price: 12
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}
function getData(){
    console.log("call getData");
    
    return fetch("https://jsonplaceholder.typicode.com/posts").then(response => response.json())
}
