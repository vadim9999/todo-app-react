import { ADD_TASK, FOUND_WORD } from "../constants/action-types";

export const addUser = (payload) => {
    return {
        type: "ADD_USER",
        payload
    }
}