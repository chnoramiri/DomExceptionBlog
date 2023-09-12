import TinyEditor from "./sharedComponents/TinyEditor";
import React, { useState, FC, useEffect } from "react";
import {
  editBlog,
  reset,
  setSnackbarToggle,
  setSnackbarMessage,
} from "../services/redux/features/BlogSlice";
import { useAppDispatch, useAppSelector } from "../services/redux/store/store";
import { useLocation, useNavigate } from "react-router-dom";
import CustomizedSnackbars from "./sharedComponents/CustomizedSnackbars";
import { fetchBlogs } from "../services/redux/features/BlogSlice";

const EditBlog: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.data;
  const [title, setTitle] = useState(data?.title);
  const [content, setContent] = useState(data?.content);
  const dispatch = useAppDispatch();
  const snackbarToggle = useAppSelector((state) => state.snackbarToggle);
  const error = useAppSelector((state) => state.error);
  const blogs = useAppSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(setSnackbarToggle());
    dispatch(setSnackbarMessage(error));
  }, [dispatch, error]);

  const submit = (e) => {
    e.preventDefault();
    dispatch(
      editBlog({
        blogId: data.blogId,
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
      navigate("/dashboard/DisplayBlogs");
    } else {
      dispatch(setSnackbarToggle());
      dispatch(setSnackbarMessage(error));
    }
  };

  return (
    <>
      <form
        style={{ paddingLeft: 250 }}
        onSubmit={(event) => {
          submit(event);
        }}
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          required
        />
        <TinyEditor data={data} setContent={setContent} />
        <button type="submit">Submit</button>
      </form>
      {snackbarToggle ? <CustomizedSnackbars type="error" /> : ""}
    </>
  );
};
export default EditBlog;
