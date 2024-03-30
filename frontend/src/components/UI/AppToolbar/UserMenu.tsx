import React, { useState } from "react";
import {
  Button,
  Grid,
  Menu,
  MenuItem,
  Typography,
  styled,
} from "@mui/material";
import { User } from "../../../types";
import { useAppDispatch } from "../../../app/hooks";
import { NavLink } from "react-router-dom";
import { logout } from "../../../features/users/usersThunk";

interface Props {
  user: User;
}

const Link = styled(NavLink)({
  color: "inherit",
  textDecoration: "none",
  "&:hover": {
    color: "inherit",
  },
});

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Grid container alignItems="center">
        <Button
          onClick={handleClick}
          color="inherit"
          sx={{ fontSize: "32px", color: "#E9E9F2" }}
        >
          Hello, {user.displayName}
        </Button>
      </Grid>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ left: "0px" }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <Typography variant="h5" component="div" sx={{ textAlign: "center" }}>
            <Link to={`/photos/${user._id}`}>My gallery</Link>
          </Typography>
        </MenuItem>
        <MenuItem>
          <Typography variant="h5" component="div" sx={{ textAlign: "center" }}>
            <Link to="/photos/create">Post new photo</Link>
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Typography variant="h5" component="div" sx={{ textAlign: "center" }}>
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
