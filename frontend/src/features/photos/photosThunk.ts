import { createAsyncThunk } from "@reduxjs/toolkit";
import { Photo, PhotoMutation } from "../../types";
import axiosApi from "../../axiosApi";
import { RootState } from "../../app/store";

export const fetchPhotos = createAsyncThunk<Photo[]>(
  "photos/fetchAll",
  async () => {
    const response = await axiosApi.get<Photo[]>("/photos");
    return response.data;
  }
);

export const fetchUserPhoto = createAsyncThunk<Photo[], string>(
  "photos/fetchUserPhoto",
  async (userId) => {
    const response = await axiosApi.get<Photo[]>(`/photos?user=${userId}`);
    return response.data;
  }
);

export const fetchOnePhoto = createAsyncThunk<Photo, string>(
  "photo/fetchOne",
  async (photoId: string) => {
    const response = await axiosApi.get<Photo>(`/photos/${photoId}`);
    return response.data;
  }
);

export const createCocktail = createAsyncThunk<
  void,
  PhotoMutation,
  { state: RootState }
>("photos/create", async (photoMutation, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.users.user?.token;

    if (token) {
      const formData = new FormData();

      formData.append("title", photoMutation.title);
      formData.append("image", photoMutation.image);

      await axiosApi.post("/photos", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  } catch (e) {
    console.error(e);
  }
});

export const deletePhoto = createAsyncThunk<void, string, { state: RootState }>(
  "photos/delete",
  async (photoId: string, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.users.user?.token;

      if (token) {
        await axiosApi.delete(`/photos/${photoId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch (e) {
      console.error(e);
    }
  }
);
