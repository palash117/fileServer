import { combineReducers } from "redux";
import alert from "./alert";
import files from "./file";

export default combineReducers({ alert, files });
