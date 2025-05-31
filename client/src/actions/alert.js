import { SET_ALERT, REMOVE_ALERT } from "./actionTypes";
import { v4 } from "uuid";

export const setAlert = (message, level = "danger", timeout = 3000) => async (
  dispatch
) => {
  let id = v4();
  if (message) {
    dispatch({ type: SET_ALERT, payload: { message, level, id } });
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  }
};
