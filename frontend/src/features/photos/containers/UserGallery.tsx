import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { deletePhoto, fetchUserPhoto } from "../photosThunk";
import { fetchUserInfo } from "../../users/usersThunk";
import { selectUserInfo } from "../../users/usersSlice";
import { selectPhotos, selectPhotosLoading } from "../photosSlice";
import PhotoItem from "../components/PhotoItem";
import Preloader from "../../../components/Preloader/Preloader";
import { Grid, Typography } from "@mui/material";

const UserGallery = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUserInfo);
  const photos = useAppSelector(selectPhotos);
  const loading = useAppSelector(selectPhotosLoading);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserInfo(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserPhoto(id));
    }
  }, [id, dispatch]);

  const handleDelete = async (photoId: string) => {
    await dispatch(deletePhoto(photoId));
    if (id) {
      await dispatch(fetchUserPhoto(id));
    }
  };

  return (
    <>
      <Typography variant="h2">{user?.displayName}'s gallery.</Typography>
      {loading ? (
        <Preloader loading={loading} />
      ) : photos.length > 0 ? (
        <Grid container spacing={4} alignItems="center">
          {photos.map((photo) => (
            <PhotoItem onDelete={handleDelete} key={photo._id} photo={photo} />
          ))}
        </Grid>
      ) : (
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          No photos yet!
        </Typography>
      )}
    </>
  );
};

export default UserGallery;
