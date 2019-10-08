import axios from "axios";

const USER_URL = "http://localhost:1234/user"

const addUser = (data) =>{
    return axios.post(USER_URL + "/create_user",data)
}

const authenticate = (cookie) =>{
    
    return axios.get(USER_URL + "/current", {headers: {
        "x-access-token": cookie
    }})
}

const authorizate = (data) =>{
    return axios.post(USER_URL + "/authorizate", data)
}

export {
    addUser, 
    authenticate,
    authorizate
}