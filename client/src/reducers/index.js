import { combineReducers } from "redux";
import alert from "./alert";
import files from "./file";
import wait from "./wait";
import folderData from "./folderData";

export default combineReducers({ alert, files, wait, folderData });
