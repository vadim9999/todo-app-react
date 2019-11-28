import axios from 'axios';

const createTask = (payload:any) => {

  const {
    login_id, name, completed, date,
  } = payload;

  return axios.post('http://localhost:1234/tasks/create', {
    login_id,
    completed,
    name,
    date,
  });
};

const getTasks = (login_id:string) => axios.get(`http://localhost:1234/tasks/all_tasks_by_id/${login_id}`);

const updateTask = ({
  _id, name, date, completed,
}:any) => axios.put(`http://localhost:1234/tasks/${_id}/update`, {
  name, date, completed,
});

function deleteTask({ task_id }:any) {
  return axios.delete(`http://localhost:1234/tasks/${task_id}/delete`);
}
export {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
