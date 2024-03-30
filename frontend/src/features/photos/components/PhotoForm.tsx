import React, { useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import FileInput from "../../../components/FileInput/FileInput";
import { PhotoMutation } from "../../../types";

interface Props {
  onSubmit: (mutation: PhotoMutation) => void;
}

const PhotoForm: React.FC<Props> = ({ onSubmit }) => {
  const [state, setState] = useState<PhotoMutation>({
    title: "",
    image: null,
  });
  const [error, setError] = useState<string>("");

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (state.image === null) {
      setError("Provide an image!");
    } else {
      onSubmit(state);
      setError("");
    }
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  return (
    <form autoComplete="off" onSubmit={submitFormHandler}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            id="title"
            label="Title"
            value={state.title}
            onChange={inputChangeHandler}
            name="title"
            required
            InputProps={{
              sx: {
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#131313",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#131313",
                },
              },
            }}
          />
        </Grid>

        <Grid item xs>
          <Typography variant="h5" sx={{ color: "red" }}>
            {error}
          </Typography>
          <FileInput
            label="Image"
            name="image"
            onChange={fileInputChangeHandler}
          />
        </Grid>

        <Grid item xs>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            sx={{
              mr: "20px",
              fontSize: "32px",
              bgcolor: "#131313",
              color: "#fff",
              "&:hover": {
                bgcolor: "#E9E9F2",
                color: "#000",
              },
              "&:active": {
                bgcolor: "#E9E9F2",
                color: "#fff",
              },
            }}
          >
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default PhotoForm;
