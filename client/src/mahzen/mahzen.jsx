import { configureStore } from "@reduxjs/toolkit";
import anaReducer from "./reducers";
import { enableMapSet } from "immer";

enableMapSet();

const mahzen = configureStore({
  reducer: anaReducer,
});

export default mahzen;
