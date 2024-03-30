import {
  Box,
  Button,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Photo } from "../../../types";
import { apiURL } from "../../../constants";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { selectUser } from "../../users/usersSlice";

interface Props {
  photo: Photo;
  onDelete: (id: string) => void;
}

const Link = styled(NavLink)({
  color: "inherit",
  textDecoration: "none",
  "&:hover": {
    color: "inherit",
  },
});

const PhotoItem: React.FC<Props> = ({ photo, onDelete }) => {
  const user = useAppSelector(selectUser);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    onDelete(photo._id);
    setOpen(false);
  };

  let cardImage = apiURL + "/" + photo.image;
  return (
    <Grid item lg={3}>
      <Box sx={{ border: "none", mb: "40px" }}>
        <CardMedia
          component="img"
          height="360"
          image={cardImage}
          sx={{
            bgcolor: "#fff",
            boxShadow: "4px 9px 13px -4px rgba(0,0,0,0.31)",
            transition: "transform 0.3s ease-in-out",
            cursor: "pointer",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
          onClick={handleClickOpen}
        />
        <Typography
          variant="h4"
          component="div"
          sx={{ textDecoration: "none", mt: "10px", textAlign: "center" }}
        >
          {photo.title}
        </Typography>

        <Link to={`/photos/${photo.user._id}`}>
          <Typography
            variant="h5"
            component="div"
            sx={{ textDecoration: "none", mt: "10px", textAlign: "center" }}
          >
            Author: {photo.user.displayName}
          </Typography>
        </Link>
      </Box>

      <Dialog onClose={handleClose} open={open} maxWidth="lg">
        <DialogTitle sx={{ m: 0, p: 2, pb: 1 }}>{photo.title}</DialogTitle>
        {user?.role === "admin" && (
          <Button
            onClick={handleDelete}
            color="primary"
            variant="contained"
            sx={{
              ml: "20px",
              mb: "8px",
              bgcolor: "#F86060",
              color: "#fff",
              width: "100px",
              "&:hover": {
                bgcolor: "#fff",
                color: "#000",
              },
              "&:active": {
                bgcolor: "#000",
                color: "#fff",
              },
            }}
          >
            Delete
          </Button>
        )}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <img
            src={cardImage}
            alt={photo.title}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              width: "auto",
              height: "auto",
            }}
          />
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default PhotoItem;
