import TinyEditor from "./sharedComponents/TinyEditor";
import React, { useState, FC } from "react";
import {
  saveBlog,
  fetchBlogs,
  snackbarAction,
  snackbarMessage,
} from "../services/redux/features/BlogSlice";
import { useAppDispatch } from "../services/redux/store/store";
import { useNavigate } from "react-router-dom";
import { Button,  TextField } from "@mui/material";
import "./index.module.scss";

const CreateBlog: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submit = (e) => {
    e.preventDefault();
    dispatch(
      saveBlog({
        title: title,
        content: content,
      })
    );

    dispatch(fetchBlogs);
    navigate("/dashboard/DisplayBlogs");
    dispatch(snackbarMessage("blog has been created"));
    dispatch(snackbarAction());
  };

  return (
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
  );
};
export default CreateBlog;
