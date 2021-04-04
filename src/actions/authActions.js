import axios from "axios";
import { SET_USER_DATA, AUTH_ERRORS, SET_DEFAULT_DATA } from "./types";
const API_URL = "http://localhost:8080/api/auth/";

export const setUserData = data => {
    return {
        type: SET_USER_DATA,
        payload: data
    }
}
export const setAuthError = data => {
    return {
        type: AUTH_ERRORS,
        payload: {
            usernameErr : "May username is incorrect",
            passwordErr : "May password is incorrect"
        }
    }
}
const setDefaultData = () => {
    return {
        type: SET_DEFAULT_DATA 
    };
};
export const loginUser = userData => dispatch => {
    axios({
        method: "POST",
        baseURL: API_URL + "signin",
        auth: {
            username: userData.username,
            password: userData.password
        }
    }).then((res) => {
        if(res.status === 200) {
            // dispatch(setUserData(res.data));
            console.log(res);
            
        }
        else{
            // dispatch(setAuthError(res));
            console.log(res);
        }
    }).catch(err => {
        // dispatch(setAuthError(err))
        console.log(err);
    }
    )
}
export const register = userData => dispatch => {
    var body = new FormData();
    body.append('username', userData.username);
    body.append('email', userData.email);
    body.append('password', userData.password);
    axios({
        method: "POST",
        baseURL: API_URL + "signup",
        data: body
    }).then((res) => {
        if(res.status === 200) {
            // dispatch(setUserData(res.data));
            console.log(res)
            
        }
        else{
            // dispatch(setAuthError(res));
            console.log(res)
        }
    }).catch(err => {
        // dispatch(setAuthError(err))
        console.log(err)
    }
    )
}

export const logoutUser = () => dispatch => {
    dispatch(setDefaultData())
}