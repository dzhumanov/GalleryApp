import { Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectUser } from "../../users/usersSlice";
import { selectPhotos, selectPhotosLoading } from "../photosSlice";
import Preloader from "../../../components/Preloader/Preloader";
import PhotoItem from "../components/PhotoItem";
import { useEffect } from "react";
import { fetchPhotos } from "../photosThunk";

const Photos = () => {
  const dispatch = useAppDispatch();
  const photos = useAppSelector(selectPhotos);
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectPhotosLoading);

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);
  return (
    <>
      <Typography
        variant="h2"
        sx={{ textAlign: "center", fontWeight: "bold", mb: "15px" }}
      >
        Gallery
      </Typography>
      {loading ? (
        <Preloader loading={loading} />
      ) : photos.length > 0 ? (
        <Grid container spacing={4} alignItems="center">
          {photos.map((photo) => (
            <PhotoItem photo={photo} />
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

export default Photos;
