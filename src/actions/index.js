import { ADD_TASK, FOUND_WORD } from "../constants/action-types";


// export function addArticle(payload){
//     return { type: ADD_ARTICLE, payload}
// }


export function addTask(payload){
    console.log("Call Function in actions");
    console.log(payload);
    
    return { type: ADD_TASK, payload}
}

export function addFoundWord(payload){
    console.log("Found word");
    console.log(payload);
    
    return { type: FOUND_WORD, payload}
}

export function getData(){
    return fetch("https://jsonplaceholder.typicode.com/posts").then(
        response => response.json())
        .then(json => {
            return {
                type:"Data_LOADED",
                payload:json
            }
        })
    
}