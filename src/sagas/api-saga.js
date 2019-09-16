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
    console.error("Call workerAddTask");
    console.log(action);
    try{
        yield call(createTask, action.payload)
        
        yield put({type:"ADD_TASK_SUCCESS", payload: action.payload} )
    }catch(e){
        console.log("error");
        yield put({type:"ADD_TASK_FAILED", e})
        
    }    
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
    const {login, name, completed, date} = payload;
    console.log(payload);
    console.log(typeof date);
    console.log(date);
    
    console.log(new Date(date).toISOString() );
    
   return axios.post('http://localhost:1234/tasks/create', {
        login,
        completed,
        name: name,
        date: new Date(date).toISOString() 
      })

}
function getData(){
    console.log("call getData");
    
    return fetch("https://jsonplaceholder.typicode.com/posts").then(response => response.json())
}
