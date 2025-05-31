import { GET_FILES_PAGINATED } from "../actions/actionTypes";

const initialState = {
  pageNo: 0,
  pageSize: 0,
  files: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_FILES_PAGINATED:
      return {
        pageNo: payload.pageNo,
        pageSize: payload.pageSize,
        files: payload.files,
      };

    default:
      return state;
  }
}
