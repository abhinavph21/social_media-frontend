import axios from 'axios'
import { API_BASE_URL } from '../config/api'
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from './auth.actionType';

export const loginUser = (loginData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signin`, loginData.data);
        const user = response.data;
        console.log("login user -: ", user);
        if (user.jwt) {
            localStorage.setItem("jwt", user.jwt);
            loginData.navigate("/")
        }
        dispatch({ type: LOGIN_SUCCESS, payload: user.jwt });
    } catch (error) {
        console.log("error ", error)
        dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
};

export const registerUser = (userData) => async (dispatch) => {
    console.log(userData);
    dispatch({ type: REGISTER_REQUEST });
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData.data);
        const user = response.data;
        console.log("created user - : ", user);
        if (user.jwt) {
            localStorage.setItem("jwt", user.jwt);
        }
        dispatch({ type: REGISTER_SUCCESS, payload: user.jwt });
    } catch (error) {
        dispatch(
            { type: REGISTER_FAILURE, payload: error.message }
        );
    }
};