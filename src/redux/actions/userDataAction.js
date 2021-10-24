import { ApiGet } from "../../helper/API/ApiData";
import { REMOVE_USER_DATA, USER_DATA, USER_DATA_ERR, USER_NOTIFICATION_TOGGLE } from "./actionTypes";

export const getUserData = () => (dispatch) => {
  ApiGet("user/GetUser")
    .then((res) => {
      dispatch({
        type: USER_DATA,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: REMOVE_USER_DATA
      })
      dispatch({
        type: USER_DATA_ERR,
        payload: error.message,
      });
    });
};

export const removeUserData = () => (dispatch) => {
  dispatch({
    type: REMOVE_USER_DATA,
  });
};

export const toggleNotification =
  (notification_state) => (dispatch) => {
    dispatch({
      type: USER_NOTIFICATION_TOGGLE,
      payload: notification_state,
    });
  };
