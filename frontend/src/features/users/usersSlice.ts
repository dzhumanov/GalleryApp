import { GlobalError, User, UserMutation, ValidationError } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchUserInfo, googleLogin, login, register } from "./usersThunk";

interface UsersState {
  user: User | null;
  userInfo: UserMutation | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
  loginLoading: boolean;
  loginError: GlobalError | null;
  fetchLoading: boolean;
}

const initialState: UsersState = {
  user: null,
  userInfo: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
  fetchLoading: false,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.registerLoading = true;
      state.registerError = null;
    });
    builder.addCase(register.fulfilled, (state, { payload: data }) => {
      state.registerLoading = false;
      state.user = data.user;
    });
    builder.addCase(register.rejected, (state, { payload: error }) => {
      state.registerLoading = false;
      state.registerError = error || null;
    });

    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
      state.loginError = null;
    });
    builder.addCase(login.fulfilled, (state, { payload: user }) => {
      state.loginLoading = false;
      state.user = user;
    });
    builder.addCase(login.rejected, (state, { payload: error }) => {
      state.loginLoading = false;
      state.loginError = error || null;
    });

    builder.addCase(googleLogin.pending, (state) => {
      state.loginLoading = true;
    });
    builder.addCase(googleLogin.fulfilled, (state, { payload: user }) => {
      state.loginLoading = false;
      state.user = user;
    });
    builder.addCase(googleLogin.rejected, (state, { payload: error }) => {
      state.loginLoading = false;
      state.loginError = error || null;
    });

    builder.addCase(fetchUserInfo.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchUserInfo.fulfilled, (state, { payload: user }) => {
      state.fetchLoading = false;
      state.userInfo = user;
    });
    builder.addCase(fetchUserInfo.rejected, (state) => {
      state.fetchLoading = false;
    });
  },
});

export const { unsetUser } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;

export const selectUser = (state: RootState) => state.users.user;
export const selectUserInfo = (state: RootState) => state.users.userInfo;
export const selectRegisterLoading = (state: RootState) =>
  state.users.registerLoading;
export const selectRegisterError = (state: RootState) =>
  state.users.registerError;
export const selectLoginLoading = (state: RootState) =>
  state.users.loginLoading;
export const selectLoginError = (state: RootState) => state.users.loginError;
