import axios from "axios";


const addUser = (data) =>{
    return axios.post("http://localhost:1234/user/create_user",data)
}

export {
    addUser
}