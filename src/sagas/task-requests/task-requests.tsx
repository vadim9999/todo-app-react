import axios from 'axios';

// console.log("window",window);
const defaultServerURL = 'http://localhost:1234'

const {origin, hostname} = window.location;

let URL = origin !== undefined && hostname !== 'localhost' ?  origin : defaultServerURL

const createTask = (payload:any) => {

  const {
    login_id, name, completed, date,
  } = payload;

  return axios.post(`${URL}/tasks/create`, {
    login_id,
    completed,
    name,
    date,
  });
};

const getTasks = (login_id:string) => axios.get(`${URL}/tasks/all_tasks_by_id/${login_id}`);

const updateTask = ({
  _id, name, date, completed,
}:any) => axios.put(`${URL}/tasks/${_id}/update`, {
  name, date, completed,
});

function deleteTask({ task_id }:any) {
  return axios.delete(`${URL}/tasks/${task_id}/delete`);
}
export {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
