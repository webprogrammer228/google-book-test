import { createSlice } from "@reduxjs/toolkit";

type StateType = {
  books: string[];
  total: number;
  isFull: boolean;
  currentBook: {};
};

export const initialState: StateType = {
  books: [],
  total: 0,
  isFull: false,
  currentBook: {},
};

const bookSlice = createSlice({
  name: "Book",
  initialState,
  reducers: {
    getBook(state, action) {
      const { items, totalItems } = action.payload;
      state.books = [...items];
      state.total = totalItems;
    },
    getMoreBook(state, action) {
      const { items } = action.payload;
      state.isFull = items.length < 30 ? true : false;
      state.books = [...state.books, ...items];
    },
    getCurrentBook(state, action) {
      const { volumeInfo } = action.payload;

      state.currentBook = { ...volumeInfo };
    },
  },
});

export const { getBook, getMoreBook, getCurrentBook } = bookSlice.actions;

export default bookSlice.reducer;
