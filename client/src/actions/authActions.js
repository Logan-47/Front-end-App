import axios from "axios";
import { returnErrors } from "./errorActions";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "./types";

//   Check token and load user
export const loadUser = () => (dispatch, getState) => {
  // user loading
  console.log("hii");
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

//  Regsiter User
export const register = ({
  email,
  password,
  name,
  college,
  branch,
  year,
  phone
}) => dispatch => {
  // Header
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request Body
  const body = JSON.stringify({
    email,
    password,
    name,
    college,
    branch,
    year,
    phone
  });
  axios
    .post("/api/register", body, config)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

//  Login User

export const login = ({ email, password }) => dispatch => {
  // Header
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request Body
  const body = JSON.stringify({
    email,
    password
  });
  axios
    .post("/api/auth", body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

//  Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

// setup config/Headers and token
export const tokenConfig = getState => {
  // Get token from localStroage
  const token = getState().auth.token;

  //  Header
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  // if Token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
