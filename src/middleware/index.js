import { ADD_TASK } from "../constants/action-types";
import { FOUND_WORD, addFoundWord} from "../actions/index"
const forbiddenWords = ["spam", "money"];

export function forbiddenWordsMiddleware({ dispatch }){
    console.log("Middleware");
    
    return function(next){
        console.log("Next");
        console.log(next);
        
        return function(action){

            if (action.type === ADD_TASK){
                console.log("Action Middleware");
                console.log(action);
                
                const foundWord = forbiddenWords.filter( word => 
                    action.payload.taskName.includes(word))
                console.log("Founded word");
                console.log(foundWord);
                
                    if(foundWord.length){
                        return dispatch({type:"FOUND_BAD_WORD"})

                    }
            }
            return next(action);
        }

    }
}