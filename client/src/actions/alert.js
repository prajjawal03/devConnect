import { v4 } from "uuid";
import { GET_ALERT, REMOVE_ALERT } from "./types";
export const setAlert = (msg, alertType, timeout = 3000) => (dispatch) => {
  const id = v4();
  dispatch({
    type: GET_ALERT,
    payload: {
      msg,
      alertType,
      id,
    },
  });
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
