import TinyEditor from "./sharedComponents/TinyEditor";
import React, { useState, FC, useEffect } from "react";
import {
  saveBlog,
  fetchBlogs,
  setSnackbarToggle,
  setSnackbarMessage,
  reset,
} from "../services/redux/features/BlogSlice";
import { useAppDispatch, useAppSelector } from "../services/redux/store/store";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import "./index.module.scss";
import CustomizedSnackbars from "./sharedComponents/CustomizedSnackbars";

const CreateBlog: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const error = useAppSelector((state) => state.error);
  const snackbarToggle = useAppSelector((state) => state.snackbarToggle);


  useEffect(() => {
    dispatch(setSnackbarMessage(error));
  }, [dispatch, error]);

  const submit = (e) => {
    e.preventDefault();
    dispatch(
      saveBlog({
        title: title,
        content: content,
      })
    );
    if (error) {
      dispatch(reset());
    }

    if (title && content) {
      dispatch(setSnackbarToggle());
      dispatch(setSnackbarMessage("blog has been edited"));
      dispatch(fetchBlogs());
      navigate("/dashboard/DisplayBlogs");
    } else {
      dispatch(setSnackbarToggle());
      dispatch(setSnackbarMessage(error));
    }
  };
  console.log(error)
  return (
    <>
      <form
        style={{ paddingLeft: 250 }}
        onSubmit={(event) => {
          submit(event);
        }}
      >
        <TextField
          className="titleInput"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          required
        />

        <TinyEditor setContent={setContent} />
        <Button type="submit">Submit</Button>
      </form>
      {snackbarToggle ? <CustomizedSnackbars type="error" /> : ""}
    </>
  );
};
export default CreateBlog;
