import { IS_LOADING } from "./actionTypes";

export const setIsLoading = (value) => (dispatch) => {
    dispatch({
        type: IS_LOADING,
        payload: value,
    });
};