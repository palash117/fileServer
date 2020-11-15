import Axios from "axios";
import {
  SELECT_FOLDER,
  FOLDER_LOADED,
  CLOSE_FOLDER,
  FOLDER_REFRESHED,
} from "./actionTypes";

export var selectFolder = (folder) => async (dispatch) => {
  console.log("got folder at selectFolderAction", folder);
  dispatch({ type: SELECT_FOLDER });

  let response = await Axios.get(
    `/fs/getFilesByParentId?parentID=${folder.Id}`
  );

  if (response.status === 200) {
    dispatch({
      type: FOLDER_LOADED,
      payload: { folderData: folder, childrenFiles: response.data },
    });
  } else {
    dispatch({
      type: FOLDER_LOADED,
      payload: { folderData: folder, childrenFiles: [] },
    });
  }
};

export var closeFolder = () => (dispatch) => {
  dispatch({ type: CLOSE_FOLDER });
};

export var createFolder = (foldername, parentID) => async (dispatch) => {
  if (!parentID) {
    parentID = -1;
  }
  let response = await Axios.get(
    `/fs/createfolder?folderName=${foldername}&parentID=${parentID}`
  );
  if (response.status == 200) {
    dispatch({
      type: FOLDER_LOADED,
      payload: { folderData: response.data, childrenFiles: [] },
    });
  } else {
    alert(response.data);
  }
};

export var refreshFolder = (folder) => async (dispatch) => {
  let response = await Axios.get(
    `/fs/getFilesByParentId?parentID=${folder.Id}`
  );

  if (response.status === 200) {
    dispatch({
      type: FOLDER_REFRESHED,
      payload: { folderData: folder, childrenFiles: response.data },
    });
  } else {
    dispatch({
      type: FOLDER_REFRESHED,
      payload: { folderData: folder, childrenFiles: [] },
    });
  }
};
