import { IS_TOGGLE_MENU } from "../actions/actionTypes";

const initialState = {
  is_toggleMenu: false,
};

export const toggleMenuReducer = (state  = initialState, action) => {
  switch (action.type) {
    case IS_TOGGLE_MENU:
      return {
        ...state,
        is_toggleMenu: action.payload,
      };
    default:
      return state;
  }
};
