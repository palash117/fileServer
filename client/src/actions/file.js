import { GET_FILES_PAGINATED } from "./actionTypes";
import { PAGE_SIZE } from "../constants";
import { setAlert } from "./alert";
import axios from "axios";
import { refreshFolder } from "./folderData";
import store from "../Store";

export const getPaginatedFiles = (pageNo, pageSize) => async (dispatch) => {
  try {
    if (!pageNo) {
      pageNo = 1;
    }
    if (!pageSize) {
      pageSize = PAGE_SIZE;
    }
    let response = await axios.get(
      `/fs/getPaginated?pageNo=${pageNo}&pageSize=${pageSize}`
    );
    if (response.data) {
      dispatch({
        type: GET_FILES_PAGINATED,
        payload: { pageNo: pageNo, pageSize: pageSize, files: response.data },
      });
    }
  } catch (err) {}
};

export const deleteFileById = (id) => async (dispatch) => {
  try {
    if (!id) {
      // todo
    }
    let response = await axios.get(`/fs/deleteFileById?id=${id}`);
    if (response.status === 200) {
      dispatch(getPaginatedFiles());

      dispatch(refreshFolder(store.getState().folderData.folderData));
    }
  } catch (err) {
    console.log(err);
    dispatch(setAlert("err"));
  }
};
