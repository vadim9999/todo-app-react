import { ADD_TASK } from "../constants/action-types";
import { FOUND_WORD, addFoundWord} from "../actions/index"
import Cookies from 'universal-cookie'
const forbiddenWords = ["spam", "money"];

export function forbiddenWordsMiddleware({ dispatch }){

    return function(next){
        
        return function(action){
            
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
            switch(action.type){
                case "FILTER_TASKS_ON_COMPLETE":
                    const result = action.payload.filter(task => !task.completed)
                    action.payload = result;

                    break;

            }

            if (action.type === "ADD_USER_SUCCESS" || action.type === "AUTHORIZATE_SUCCESS"){
                const cookies = new Cookies();
                cookies.set('user', action.token, {path: '/'})
                console.log("***********This is midlleware Add USER Success");
                console.log(action.token);
                
                
            }
           
        
            return next(action);
        }

    }
}