import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserApi } from "../api/UserApi";
import type { IUserLoginData, IUserSignUpData, IUserToken } from "../model";
import type { AxiosError } from "axios";
import type { IApiResponseError } from "@/06-shared/types";
import { setAccessToken } from "@/06-shared/lib/axiosInstance";

export const signupAsyncThunk = createAsyncThunk<
  IUserToken | null,
  IUserSignUpData
>("users/signup", async (user: IUserSignUpData, { rejectWithValue }) => {
  try {
    const response = await UserApi.signup(user);
    if (response.data) setAccessToken(response.data.accessToken);
    return response.data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseError>;
    alert(err.response?.data.message);
    return rejectWithValue(err.response?.data.message);
  }
});

export const loginAsyncThunk = createAsyncThunk<
  IUserToken | null,
  IUserLoginData
>("users/login", async (user: IUserLoginData, { rejectWithValue }) => {
  try {
    const response = await UserApi.login(user);
    if (response.data) setAccessToken(response.data.accessToken);
    return response.data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseError>;
    alert(err.response?.data.message);
    return rejectWithValue(err.response?.data.message);
  }
});

export const logoutAsyncThunk = createAsyncThunk<void, void>(
  "users/logout",
  async (_, { rejectWithValue }) => {
    try {
      await UserApi.logout();
    } catch (error) {
      const err = error as AxiosError<IApiResponseError>;
      alert(err.response?.data.message);
      return rejectWithValue(err.response?.data.message);
    }
  }
);

export const refreshAsyncThunk = createAsyncThunk<IUserToken | null>(
  "users/refreshTokens",
  async (_, { rejectWithValue }) => {
    try {
      const response = await UserApi.refreshTokens();
      if (response.data) setAccessToken(response.data.accessToken);
      return response.data;
    } catch (error) {
      console.log(error);
      const err = error as AxiosError<IApiResponseError>;
      return rejectWithValue(err.response?.data.message);
    }
  }
);
