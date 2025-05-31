import {
  SELECT_FOLDER,
  CLOSE_FOLDER,
  FOLDER_LOADED,
  FOLDER_REFRESHED,
} from "../actions/actionTypes";

const initialState = {
  showFolderContainer: false,
  folderData: null,
  childrenFiles: [],
  loading: true,
  breadCrumb: "",
  folderStack: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CLOSE_FOLDER:
      var showFolderContainer = false;
      var oldFolderStack = [...state.folderStack];
      oldFolderStack.pop();
      var { folderData, childrenFiles } = {};
      if (oldFolderStack.length > 0) {
        showFolderContainer = true;
        var top = oldFolderStack[oldFolderStack.length - 1];
        folderData = top.folderData;
        childrenFiles = top.childrenFiles;
      }
      return {
        showFolderContainer: showFolderContainer,
        folderData: folderData,
        childrenFiles: childrenFiles,
        loading: !showFolderContainer,
        folderStack: oldFolderStack,
        breadCrumb: generateBreadCrumb(oldFolderStack),
      };
    case SELECT_FOLDER:
      return {
        ...state,
        loading: true,

        breadCrumb: generateBreadCrumb(state.folderStack),
      };
    case FOLDER_LOADED:
      var oldFolderStack = [...state.folderStack];
      oldFolderStack.push({
        folderData: payload.folderData,
        childrenFiles: payload.childrenFiles,
      });
      if (state.folderStack.length !== 0) {
        var lastFolderEntry = state.folderStack[state.folderStack.length - 1];
        if (lastFolderEntry.folderData.Id === payload.folderData.Id) {
          return {
            ...state,
            folderData: payload.folderData,
            childrenFiles: payload.childrenFiles,
          };
        }
      }
      return {
        ...state,
        loading: false,
        folderData: payload.folderData,
        childrenFiles: payload.childrenFiles,
        showFolderContainer: true,
        folderStack: oldFolderStack,
        breadCrumb: generateBreadCrumb(oldFolderStack),
      };
    case FOLDER_REFRESHED:
      var { folderData, childrenFiles } = payload;
      return {
        ...state,
        folderData: folderData,
        childrenFiles: childrenFiles,
      };
    default:
      return state;
  }
}
var generateBreadCrumb = (folderStack) => {
  var crumb = "";
  if (!folderStack || folderStack.length === 0) {
    return "";
  }
  crumb = folderStack.map((f) => f.folderData.FileName).join("/");
  return crumb;
};
