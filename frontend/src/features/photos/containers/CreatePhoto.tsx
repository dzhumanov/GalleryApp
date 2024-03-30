import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { Container, Typography } from "@mui/material";
import { PhotoMutation } from "../../../types";
import { createPhoto } from "../photosThunk";
import PhotoForm from "../components/PhotoForm";

const CreatePhoto = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFormSubmit = async (PhotoMutation: PhotoMutation) => {
    try {
      await dispatch(createPhoto(PhotoMutation)).unwrap();
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container
      sx={{
        bgcolor: "#fff",
        pt: "30px",
        pb: "30px",
        border: "3px solid #E9E9F2",
        borderRadius: "10px",
      }}
    >
      <Typography variant="h3">Post new photo</Typography>
      <PhotoForm onSubmit={onFormSubmit} />
    </Container>
  );
};

export default CreatePhoto;
