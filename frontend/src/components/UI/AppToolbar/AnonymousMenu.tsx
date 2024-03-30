import { Button } from "@mui/material";
import { Link as NavLink } from "react-router-dom";

const AnonymousMenu = () => {
  return (
    <>
      <Button
        component={NavLink}
        to="/register"
        color="inherit"
        sx={{ fontSize: "32px" }}
      >
        Sign up
      </Button>

      <Button
        component={NavLink}
        to="/login"
        color="inherit"
        sx={{ fontSize: "32px" }}
      >
        Sign in
      </Button>
    </>
  );
};

export default AnonymousMenu;
