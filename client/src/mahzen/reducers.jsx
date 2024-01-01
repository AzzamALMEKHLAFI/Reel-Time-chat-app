// reducers.js
import { combineReducers } from "@reduxjs/toolkit";
import konusmalarSlice from "./konusmalarSlice";
import durumlarSlice from "./durumlarSlice";

const anaReducer = combineReducers({
  konusmalar: konusmalarSlice,
  durumlar: durumlarSlice,
});

export default anaReducer;
