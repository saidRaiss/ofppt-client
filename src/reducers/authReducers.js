import { isEmpty } from './../utils/validators';
import { SET_USER_DATA, AUTH_ERRORS, SET_DEFAULT_DATA } from "./../actions/types";
const initialState = {
    username:"",
    email:"",
    isAuthenticated: false
};
export default function (state = initialState, action) {
    switch (action.type) {
        case SET_USER_DATA :
            return {
                ...state,
                username:action.payload.username,
                email:action.payload.email,
                isAuthenticated: true
            }
        case AUTH_ERRORS :
            return null;
        case SET_DEFAULT_DATA :
            return null;
        default:
            return null;
    }
}