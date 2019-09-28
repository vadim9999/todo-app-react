import * as types from "../constants/action-types";

const initialState = {
    user:{},
    tasks: [],
    remoteArticles:[]
}

function rootReducer(state = initialState, action){
    console.error("Reducer");
    console.log(action);
    console.log("State");
    console.log(state);
    
    
    switch (action.type) {
        // case types.ADD_TASK:
        //     return Object.assign({}, state, {
        //         tasks: state.tasks.concat(action.payload)
        //     })
        //     break;
        case "ADD_TASK_SUCCESS":
            return Object.assign({}, state,{
                tasks: state.tasks.concat(action.payload)
            })
            
        case "DATA_LOADED":
            console.log("actionPayload");
            
            console.log(action.payload);
            
            return Object.assign({}, state, {
                remoteArticles: state.remoteArticles.concat(action.payload)
            })
            break;
        case "DATA_REQUESTED":
            console.log("Reducers data requested");
            return state;

        case "GET_TASKS_SUCCESS":
            return Object.assign({}, state, {
                tasks: action.payload
            })
        
        case "ADD_USER_SUCCESS":
            
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
    // if (action.type === ADD_ARTICLE) {
    //     return Object.assign({}, state, {
    //         tasks: state.tasks.concat(action.payload)
    //     })
    // }else
    
    // return state;
}

export default rootReducer;
