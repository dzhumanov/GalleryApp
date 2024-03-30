import { createSlice } from "@reduxjs/toolkit";
import { Photo, UserMutation } from "../../types";
import { RootState } from "../../app/store";
import {
  fetchOnePhoto,
  fetchPhotos,
  fetchUserPhoto,
} from "./photosThunk";

interface PhotosState {
  photos: Photo[];
  singlePhoto: Photo | null;
  fetchLoading: boolean;
}

const initialState: PhotosState = {
  photos: [],
  singlePhoto: null,
  fetchLoading: false,
};

export const photosSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPhotos.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchPhotos.fulfilled, (state, { payload: photos }) => {
      state.fetchLoading = false;
      state.photos = photos;
    });
    builder.addCase(fetchPhotos.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(fetchUserPhoto.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchUserPhoto.fulfilled, (state, { payload: photos }) => {
      state.fetchLoading = false;
      state.photos = photos;
    });
    builder.addCase(fetchUserPhoto.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(fetchOnePhoto.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchOnePhoto.fulfilled, (state, { payload: photo }) => {
      state.fetchLoading = false;
      state.singlePhoto = photo;
    });
    builder.addCase(fetchOnePhoto.rejected, (state) => {
      state.fetchLoading = false;
    });
  },
});

export const photosReducer = photosSlice.reducer;

export const selectPhotos = (state: RootState) => state.photos.photos;
export const selectSinglePhoto = (state: RootState) => state.photos.singlePhoto;
export const selectPhotosLoading = (state: RootState) =>
  state.photos.fetchLoading;
