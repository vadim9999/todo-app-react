import { takeLatest, takeEvery, call, put } from "redux-saga/effects";
import { ADD_TASK, FOUND_WORD } from "../constants/action-types";
import axios from "axios";
import moment from "moment"

export default function* watcherSaga(){
    console.log("Call watcherSaga");

    // yield takeLatest(["DATA_REQUESTED", ADD_TASK], allWorkers)
    yield takeEvery(ADD_TASK, workerSagaAddTask)
    yield takeEvery("GET_TASKS", workerSagaGetTasks)
    yield takeEvery("DELETE_TASK", workerSagaDeleteTask)
    yield takeEvery("UPDATE_TASK", workerSagaUpdateTask)
}

function* workerSagaUpdateTask({payload}){
    try{
        yield call(updateTask, payload)
        yield put({type:"UPDATE_TASK_SUCCESS"})
        yield put({type:"GET_TASKS", payload: payload.login_id})
    }catch(e){
        yield put({type:"GET_TASKS_FAILED"})
    }
}

const updateTask = ({_id, name,date, completed}) => {
    return axios.put(`http://localhost:1234/tasks/${_id}/update`,{
        name, date, completed
    })
}

function* workerSagaDeleteTask({payload}){
    console.log("delete task saga");
    
    try{
        yield call(deleteTask, payload.task_id)
        yield put({type:"DELETE_TASK_SUCCESS"})
        yield put({type:"GET_TASKS", payload: payload.login_id})

    } catch(e){
        yield put({type:"DELETE_TASK_FAILED"}, e)
    }
}

function deleteTask(task_id){

    return axios.delete(`http://localhost:1234/tasks/${task_id}/delete`)
}

function* workerSagaGetTasks({payload}){
    console.log("worker saga");
    console.log("payload worker saga get tasks");
    console.log(payload);
    
    try{
        const tasks = yield call(getTasks, payload)
        yield put({type:"GET_TASKS_SUCCESS", payload: tasks.data})
    }catch (e){
        yield put({type:"GET_TASKS_FAILED",e})
    }
    
}

function getTasks(login_id){

    return axios.get(`http://localhost:1234/tasks/all_tasks_by_id/${login_id}`)
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
        const payload = yield call(createTask, action.payload)
        
        yield put({type:"ADD_TASK_SUCCESS", payload: payload.data } )
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
    const {login_id, name, completed, date} = payload;
    console.log(payload);
    console.log(typeof date);
    console.log(date);
    
    // console.log(date.toISOString() );
    // console.log("back to normal");
    
    // console.log(moment(date.toISOString()).format("dddd, MMMM Do YYYY, h:mm:ss a"));
    
   return axios.post('http://localhost:1234/tasks/create', {
        login_id,
        completed,
        name: name,
        date: date
      })

}
function getData(){
    console.log("call getData");
    
    return fetch("https://jsonplaceholder.typicode.com/posts").then(response => response.json())
}
