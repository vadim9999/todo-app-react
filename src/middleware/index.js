import { ADD_TASK } from "../constants/action-types";
import { FOUND_WORD, addFoundWord} from "../actions/index"
const forbiddenWords = ["spam", "money"];

export function forbiddenWordsMiddleware({ dispatch }){
    console.log("Middleware");
    console.log(dispatch);
    
    return function(next){
        console.log("Next");
        console.log(next);
        
        return function(action){
            console.log("Middleware___action");
            console.log(action);
            
            if (action.type === ADD_TASK){
                console.log("Middleware__action_ADD_TASK");
                console.log(action);
                
                const foundWord = forbiddenWords.filter( word => 
                    action.payload.name.includes(word))
                console.log("Founded word");
                console.error(foundWord);
                
                    if(foundWord.length){
                        return dispatch({type:"FOUND_BAD_WORD"})

                    }
            }
           
        
            return next(action);
        }

    }
}