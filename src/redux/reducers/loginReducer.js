import { CHANGE_LOGIN_STATE } from "../actions/actionTypes";

const initialState = {
    is_loggedin: false,
};

export const isUserLoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_LOGIN_STATE:
            return {
                ...state,
                is_loggedin: action.payload,
            };
        default:
            return state;
    }
};
