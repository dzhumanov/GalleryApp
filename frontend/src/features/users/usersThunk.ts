import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  GlobalError,
  LoginMutation,
  RegisterMutation,
  RegisterResponse,
  User,
  UserMutation,
  ValidationError,
} from "../../types";
import axiosApi from "../../axiosApi";
import { isAxiosError } from "axios";
import { RootState } from "../../app/store";
import { unsetUser } from "./usersSlice";

export const register = createAsyncThunk<
  RegisterResponse,
  RegisterMutation,
  { rejectValue: ValidationError }
>("users/register", async (registerMutation, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post("/users", registerMutation);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 422) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const login = createAsyncThunk<
  User,
  LoginMutation,
  { rejectValue: GlobalError }
>("users/login", async (loginMutation, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post<RegisterResponse>(
      "/users/sessions",
      loginMutation
    );

    return response.data.user;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as GlobalError);
    }

    throw e;
  }
});

export const googleLogin = createAsyncThunk<
  User,
  string,
  { rejectValue: GlobalError }
>("users/googleLogin", async (credential, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post<RegisterResponse>("/users/google", {
      credential,
    });
    return response.data.user;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as GlobalError);
    }
    throw e;
  }
});

export const fetchUserInfo = createAsyncThunk<UserMutation, string>(
  "users/fetchUserInfo",
  async (userId: string) => {
    const response = await axiosApi.get<UserMutation>(`/users/${userId}`);
    return response.data;
  }
);

export const logout = createAsyncThunk<void, undefined, { state: RootState }>(
  "users/logout",
  async (_, { getState, dispatch }) => {
    const token = getState().users.user?.token;
    await axiosApi.delete("/users/sessions", {
      headers: { Authorization: "Bearer " + token },
    });
    dispatch(unsetUser());
  }
);
