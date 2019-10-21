import { ADD_TASK, FOUND_WORD } from "../constants/action-types";


// export function addArticle(payload){
//     return { type: ADD_ARTICLE, payload}
// }


export function addTask(payload) {
  console.log("Call Function in actions");
  console.log(payload);

  return { type: ADD_TASK, payload }
}

export function addFoundWord(payload) {
  console.log("Found word");
  console.log(payload);

  return { type: FOUND_WORD, payload }
}

export const getTasks = payload => {
  return {type: "GET_TASKS", payload}
}

export const deleteTaskById = payload => {
  return {type: "DELETE_TASK", payload}
}

export const updateTaskById = payload => {
  return {type: "UPDATE_TASK", payload}
}
// export function getData() {
//     return function(dispatch) {
//       return fetch("https://jsonplaceholder.typicode.com/posts")
//         .then(response => response.json())
//         .then(json => {
//             console.log("data");
//             console.log(json);

//           dispatch({ type: "DATA_LOADED", payload: json });
//         });
//     };
//   }


export const sortTasksByGrowthDate = payload => {
  return{
    type: "SORT_TASKS_BY_GROWTH_DATE", payload
  }
}

export const sortTasksByDecreaseDate = payload =>{
  return {
    type: "SORT_TASKS_BY_DECREASE_DATE", 
    payload
  }
}



// export function saveTask(){
//   return { type: "SAVE_TASK"}
// }