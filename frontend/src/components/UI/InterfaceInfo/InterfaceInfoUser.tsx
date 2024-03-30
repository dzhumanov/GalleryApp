import { Button, Grid, Typography } from "@mui/material";

interface Props {
  isPublished?: boolean;
  onDelete: () => void;
}

const InterfaceInfoUser: React.FC<Props> = ({ isPublished, onDelete }) => {
  return (
    <Grid item container>
      <Typography variant="h5">
        Status:{" "}
        <span style={{ color: isPublished ? "green" : "#F86060" }}>
          {isPublished ? "Published" : "Your cocktail is under review"}
        </span>
      </Typography>
      <Button
        onClick={onDelete}
        color="primary"
        variant="contained"
        sx={{
          ml: "20px",
          bgcolor: "#F86060",
          color: "#fff",
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
    </Grid>
  );
};

export default InterfaceInfoUser;
