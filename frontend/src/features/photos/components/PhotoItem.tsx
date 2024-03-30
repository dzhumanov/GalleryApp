import { Box, CardMedia, Grid, Typography, styled } from "@mui/material";
import { Photo } from "../../../types";
import { apiURL } from "../../../constants";
import { NavLink } from "react-router-dom";

interface Props {
  photo: Photo;
}

const Link = styled(NavLink)({
  color: "inherit",
  textDecoration: "none",
  "&:hover": {
    color: "inherit",
  },
});

const PhotoItem: React.FC<Props> = ({ photo }) => {
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
          }}
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
    </Grid>
  );
};

export default PhotoItem;
