import { combineReducers, configureStore } from "@reduxjs/toolkit";
import bookSlice from "./slice";

const rootReducer = combineReducers({
  books: bookSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
