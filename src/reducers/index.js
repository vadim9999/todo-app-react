import { ADD_TASK } from "../constants/action-types";

const initialState = {
    tasks: []
}

function rootReducer(state = initialState, action){
    console.log("Reducer");
    console.log(action);
    
    switch (action.type) {
        case ADD_TASK:
            return Object.assign({}, state, {
                tasks: state.tasks.concat(action.payload)
            })
            break;
    
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
