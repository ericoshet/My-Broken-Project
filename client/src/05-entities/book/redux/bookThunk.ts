import type { IApiResponseError } from "@/06-shared/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import { BookApi } from "../api/BookApi";
import type { IBook, IRawBook, IUpdateBookPayload } from "../model";

export const getAllBooksThunk = createAsyncThunk<IBook[] | null, void>(
  "books/getAllBooks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await BookApi.getAll();
      return response.data;
    } catch (error) {
      console.log(error);
      const err = error as AxiosError<IApiResponseError>;
      return rejectWithValue(err.response?.data.message);
    }
  }
);

export const createBookThunk = createAsyncThunk<IBook | null, IRawBook>(
  "books/createBook",
  async (advice: IRawBook, { rejectWithValue }) => {
    try {
      const response = await BookApi.create(advice);
      return response.data;
    } catch (error) {
      console.log(error);
      const err = error as AxiosError<IApiResponseError>;
      return rejectWithValue(err.response?.data.message);
    }
  }
);
export const deleteBookThunk = createAsyncThunk<number, number>(
  "books/deleteBook",
  async (id: number, { rejectWithValue }) => {
    try {
      await BookApi.delete(id);
      return id;
    } catch (error) {
      console.log(error);
      const err = error as AxiosError<IApiResponseError>;
      return rejectWithValue(err.response?.data.message);
    }
  }
);

export const updateBookThunk = createAsyncThunk<IBook, IUpdateBookPayload>(
  "books/updateBook",
  async (payload, { rejectWithValue }) => {
    const { id, ...updateData } = payload;
    try {
      const updatedBook = await BookApi.update(id, updateData);
      return updatedBook;
    } catch (error) {
      console.log(error);
      const err = error as AxiosError<IApiResponseError>;
      return rejectWithValue(err.response?.data.message || "Ошибка обновления");
    }
  }
);

export const getOneBookThunk = createAsyncThunk<IBook | null, number>(
  "books/getOneBook",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await BookApi.getOne(id);
      return response.data;
    } catch (error) {
      console.log(error);
      const err = error as AxiosError<IApiResponseError>;
      return rejectWithValue(err.response?.data.message);
    }
  }
);
