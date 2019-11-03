import * as types from "../constants/action-types";

const initialState = {
    user:{},
    tasks: [],
    currentPage: 0,

}

function rootReducer(state = initialState, action){
    // console.error("Reducer");
    // console.log(action);
    // console.log("State");
    // console.log(state);
    
    
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
            // console.log("Reducers data requested");
            return state;

        case "GET_TASKS_SUCCESS":
            return Object.assign({}, state, {
                tasks: action.payload,

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
        
        case "SORT_TASKS_BY_GROWTH_DATE":
            console.log("call reducer sort tasks");
            
            return Object.assign({}, state,{
                tasks: [...action.payload]
            }) 
        case "SORT_TASKS_BY_DECREASE_DATE":
            return {
                ...state,
                tasks: [...action.payload]
            }
        
        case "ADD_CURRENT_PAGE":
            return {
                ...state, 
                currentPage: action.payload
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
