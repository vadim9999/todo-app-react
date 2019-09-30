import axios from "axios";

const createTask = (payload) => {
    console.log("Saga__createTask_payload");
    const {login_id, name, completed, date} = payload;
    console.log(payload);
    console.log(typeof date);
    console.log(date);
    
    // console.log(date.toISOString() );
    // console.log("back to normal");
    
    // console.log(moment(date.toISOString()).format("dddd, MMMM Do YYYY, h:mm:ss a"));
    
   return axios.post('http://localhost:1234/tasks/create', {
        login_id,
        completed,
        name: name,
        date: date
      })
}

const getTasks = (login_id)=>{

    return axios.get(`http://localhost:1234/tasks/all_tasks_by_id/${login_id}`)
}

const updateTask = ({_id, name,date, completed}) => {
    return axios.put(`http://localhost:1234/tasks/${_id}/update`,{
        name, date, completed
    })
}

function deleteTask(task_id){

    return axios.delete(`http://localhost:1234/tasks/${task_id}/delete`)
}
export {
    createTask, 
    getTasks,
    updateTask, 
    deleteTask
}