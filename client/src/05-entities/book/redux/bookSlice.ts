import { createSlice } from "@reduxjs/toolkit";
import type { IBook } from "../model";
import {
  createBookThunk,
  deleteBookThunk,
  getAllBooksThunk,
  getOneBookThunk,
  updateBookThunk,
} from "./bookThunk";

type BookState = {
  bookArr: IBook[];
  currentBook: IBook | null;
  loading: boolean;
  errorMessage: string;
};

const initialState: BookState = {
  bookArr: [],
  currentBook: null,
  loading: false,
  errorMessage: "",
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    sortedByTitle: (state) => {
      state.bookArr.sort((a, b) => {
        const titleA = a.title ?? ""; // если undefined/null - пустая строка
        const titleB = b.title ?? "";
        return titleA.localeCompare(titleB, undefined, {
          numeric: true,
          sensitivity: "base",
        });
      });
    },
    sortedByCreatedUp: (state) => {
      state.bookArr.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    },
    sortedByCreatedDown: (state) => {
      state.bookArr.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBooksThunk.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(getAllBooksThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) state.bookArr = action.payload;
      })
      .addCase(getAllBooksThunk.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = state.payload as string;
      })

      .addCase(createBookThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) state.bookArr.push(action.payload);
      })
      .addCase(createBookThunk.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
      })
      .addCase(createBookThunk.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
      })

      .addCase(updateBookThunk.fulfilled, (state, action) => {
        state.loading = false;
        const updatedBook = action.payload;

        const index = state.bookArr.findIndex((b) => b.id === updatedBook.id);
        if (index !== -1) {
          state.bookArr[index] = updatedBook;
        }

        if (state.currentBook?.id === updatedBook.id) {
          state.currentBook = updatedBook;
        }
      })
      .addCase(updateBookThunk.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
      })
      .addCase(updateBookThunk.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
      })

      .addCase(deleteBookThunk.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(deleteBookThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.bookArr = state.bookArr.filter(
          (book) => book.id !== action.payload
        );
      })
      .addCase(deleteBookThunk.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
      })
      .addCase(getOneBookThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) state.currentBook = action.payload;
      })
      .addCase(getOneBookThunk.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
      });
  },
});

export const { sortedByTitle, sortedByCreatedUp, sortedByCreatedDown } =
  bookSlice.actions;

export default bookSlice.reducer;
