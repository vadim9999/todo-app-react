import { ADD_TASK, FOUND_WORD } from '../constants/action-types';

// export function addArticle(payload){
//     return { type: ADD_ARTICLE, payload}
// }

export function addTask(payload: any) {
  return { type: ADD_TASK, payload };
}

export function addFoundWord(payload: any) {
  return { type: FOUND_WORD, payload };
}

export const getTasks = (payload: any) => ({ type: 'GET_TASKS', payload });

export const deleteTaskById = (payload: any) => ({
  type: 'DELETE_TASK',
  payload
});

export const updateTaskById = (payload: any) => ({
  type: 'UPDATE_TASK',
  payload
});
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

export const sortTasksByGrowthDate = (payload: any) => ({
  type: 'SORT_TASKS_BY_GROWTH_DATE',
  payload
});

export const sortTasksByDecreaseDate = (payload: any) => ({
  type: 'SORT_TASKS_BY_DECREASE_DATE',
  payload
});

export const addCurrentPage = (payload: any) => ({
  type: 'ADD_CURRENT_PAGE',
  payload
});

export const addSelectedRowKeys = (payload:any) =>({
  type:'ADD_SELECTED_ROW_KEYS',
  payload
})
export const addCurrentSelectedRowKeys = (payload: any) => ({
  type: 'ADD_CURRENT_SELECTED_ROW_KEYS',
  payload
});
// export function saveTask(){
//   return { type: "SAVE_TASK"}
// }
