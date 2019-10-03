import { ADD_TASK } from "../constants/action-types";
import { FOUND_WORD, addFoundWord} from "../actions/index"
import Cookies from 'universal-cookie'
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
            if (action.type === "ADD_USER_SUCCESS"){
                const cookies = new Cookies();
                cookies.set('user', action.token, {path: '/'})
                console.log("***********This is midlleware Add USER Success");
                console.log(action.token);
                
                
            }
           
        
            return next(action);
        }

    }
}