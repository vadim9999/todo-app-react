import { takeLatest, takeEvery, call, put } from "redux-saga/effects";
import { ADD_TASK, FOUND_WORD } from "../constants/action-types";
import axios from "axios";
import moment from "moment"
import {createTask, getTasks, updateTask, deleteTask} from "./task-requests"
import {addUser} from "./user-requests"
export default function* watcherSaga(){
    console.log("Call watcherSaga");

    yield takeLatest(["ADD_TASK", "GET_TASKS", "UPDATE_TASK", "DELETE_TASK"], allTaskWorkers)
    // yield takeEvery(ADD_TASK, allWorkers)
    // yield takeEvery("GET_TASKS", allWorkers)
    // yield takeEvery("DELETE_TASK", workerSagaDeleteTask)
    // yield takeEvery("UPDATE_TASK", workerSagaUpdateTask)
    yield takeEvery("ADD_USER",allUserWorkers)

    // yield takeEvery("AUTHENTICATE", workerSagaAuthenticate)
}



function* allTaskWorkers(action){
    
    switch(action.type){
        case "ADD_TASK":
            yield taskWorker({
                requestFunction:createTask, 
                action})
            break;

        case "GET_TASKS":
            yield taskWorker({
                requestFunction: getTasks, 
                action})
            break;
        case "UPDATE_TASK":

            yield taskWorker({action, 
                callback: taskWorkerUpdateTask})
            break;


        // case "DELETE_TASK": 
        //     yield taskWorker(deleteTask, action, function* (){
        //         yield call(deleteTask, action.payload.task_id)
        //         yield put({type:"DELETE_TASK_SUCCESS"})
        //         yield put({type:"GET_TASKS", payload: action.payload.login_id})
        //     })
        
    }
}

function* taskWorkerUpdateTask({payload}){
        yield console.log("callback");
        yield call(updateTask, payload)
        yield put({type:"UPDATE_TASK_SUCCESS"})
        yield put({type:"GET_TASKS", payload: payload.login_id})
}

function* allUserWorkers(action){

     switch(action.type){
        case "ADD_USER":
            yield userWorker(addUser, action)
            break;

     }
}

function* userWorker(requestFunction, {type, payload}){
    try{
        
        const result = yield call(requestFunction, payload)
        console.log(result);
        // @TODO create new obj and place there token and data from response 
        yield put({type: `${type}_SUCCESS`, payload:result.data, token:result.headers["x-auth-token"] })
     }catch (e){
         yield put({type:`${type}_SUCCESS`,e})
     }
}

function* taskWorker({requestFunction, action, callback}){
    yield console.log("********TAsk worker");
    const {type, payload} = action;
    try{
        if(callback !== undefined){
            
            yield callback(action)
            yield console.log("this is workder and calling callback");
        }else{
            const result = yield call(requestFunction, payload)
        
            yield put({type: `${type}_SUCCESS`, payload: result.data } )
        }
        
        
    }catch(e){
        console.log("error");
        yield put({type:`${type}_FAILED`, e})
        
    }  
}
    // function* workerSagaAuthenticate

// function* allWorkers(action){
//     if (action.type === ADD_TASK) {
//         console.log("Saga_worker_ADD_TASK_action");
//         console.log(action);
        
//         yield workerSagaAddTask(action)
        
//     }
// }

// function worker(work,additionalOperations){
//     try{
//         work()
//         additionalOperation()
//     }catch (e){

//     }
// }
function* workerSagaAddUser({payload}){
    try{
       const result = yield call(addUser, payload)
       console.log(result);
       
       yield put({type: "ADD_USER_SUCCESS", payload:result.data, token:result.headers["x-auth-token"] })
    }catch (e){
        yield put({type:"ADD_USER_FAILED",e})
    }
}

