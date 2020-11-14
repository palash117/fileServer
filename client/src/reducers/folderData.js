import {
  SELECT_FOLDER,
  CLOSE_FOLDER,
  FOLDER_LOADED,
} from "../actions/actionTypes";

const initialState = {
  showFolderContainer: false,
  folderData: null,
  childrenFiles: [],
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CLOSE_FOLDER:
      return {
        showFolderContainer: false,
        folderData: null,
        childrenFiles: [],
        loading: true,
      };
    case SELECT_FOLDER:
      return {
        ...state,
        loading: true,
      };
    case FOLDER_LOADED:
      return {
        ...state,
        loading: false,
        folderData: payload.folderData,
        childrenFiles: payload.childrenFiles,
        showFolderContainer: true,
      };
    default:
      return state;
  }
}
