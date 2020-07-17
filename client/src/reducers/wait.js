import {
  SET_WAIT,
  UNSET_PROGRESS,
  UNSET_WAIT,
  UPDATE_PROGRESS,
} from "../actions/actionTypes";
const initialState = {
  isWaiting: false,
  progress: 0,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_WAIT:
      return {
        ...state,
        isWaiting: true,
      };

    case UNSET_WAIT:
      return {
        ...state,
        isWaiting: false,
      };
    case UPDATE_PROGRESS:
      return {
        ...state,
        progress: state.progress + payload,
      };
    case UNSET_PROGRESS:
      return {
        ...state,
        progress: 0,
      };

    default:
      return state;
  }
}
