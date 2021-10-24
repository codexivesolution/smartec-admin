import { IS_LOADING } from "../actions/actionTypes";

const initialState = {
    is_loading: false,
};

export const isLoadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case IS_LOADING:
            return {
                ...state,
                is_loading: action.payload,
            };
        default:
            return state;
    }
};
