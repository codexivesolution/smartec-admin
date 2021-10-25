import { CHANGE_LOGIN_STATE } from "./actionTypes"

export const changeLoginState = (value) => (dispatch) =>{
    dispatch({
        type:CHANGE_LOGIN_STATE,
        payload:value,
    })

}