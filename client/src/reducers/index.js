import { combineReducers } from "redux";
import alert from "./alert";
import files from "./file";
import wait from "./wait";

export default combineReducers({ alert, files, wait });
