import { GET_NOTIFICATION } from "../actions/actionTypes";

const initialState = {
  notificationData: [],
};

export const notificationDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTIFICATION:
      return {
        ...state,
        notificationData: action.payload,
      };

    default:
      return state;
  }
};
