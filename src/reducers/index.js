import * as types from "../constants/action-types";

const initialState = {
    user:{},
    tasks: [],
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

        case "AUTHENTICATE_SUCCESS":
            return {
                ...state, 
                user: action.payload
            }

        case "AUTHORIZATE_SUCCESS":
            return {
                ...state,
                user:action.payload
            }
        case "FILTER_TASKS_ON_COMPLETE":
            return {
                ...state,
                tasks: action.payload
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
