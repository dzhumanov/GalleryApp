import { Button, Grid, Typography } from "@mui/material";

interface Props {
  isPublished?: boolean;
  onDelete: () => void;
  onToggle: () => void;
}

const InterfaceInfoAdmin: React.FC<Props> = ({
  isPublished,
  onDelete,
  onToggle,
}) => {
  return (
    <Grid item container>
      <Typography variant="h5">
        Status:{" "}
        <span style={{ color: isPublished ? "green" : "red" }}>
          {isPublished ? "Published" : "Not published"}
        </span>
      </Typography>
      <Button
        onClick={onToggle}
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
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
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

export default InterfaceInfoAdmin;
