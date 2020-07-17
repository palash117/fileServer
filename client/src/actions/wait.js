import {
  SET_WAIT,
  UNSET_PROGRESS,
  UNSET_WAIT,
  UPDATE_PROGRESS,
} from "./actionTypes";

export const setWait = () => (dispatch) => {
  dispatch({ type: SET_WAIT, payload: {} });
};

export const unsetWait = () => (dispatch) => {
  dispatch({ type: UNSET_WAIT, payload: {} });
};

export const updateProgress = (progressAmount) => (dispatch) => {
  dispatch({ type: UPDATE_PROGRESS, payload: progressAmount });
};

export const unsetProgress = () => (dispatch) =>
  dispatch({ type: UNSET_PROGRESS, payload: {} });
