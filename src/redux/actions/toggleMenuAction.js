
// export const setToggleMenu = (value) => (dispatch) => {
//   dispatch({
//     type: IS_TOGGLE_MENU,
//     payload: value,
//   });
// };

import { IS_TOGGLE_MENU } from "./actionTypes";

export const setToggleMenu = (value) => async (dispatch) => {
    try {
      dispatch({
        type: IS_TOGGLE_MENU,
        payload: value,
      });
 
    } catch (error) {

  
      dispatch({
        type: IS_TOGGLE_MENU,
        payload: false
      });
    }
  };
