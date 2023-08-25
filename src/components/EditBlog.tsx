import TinyEditor from "./sharedCompinents/TinyEditor";
import React, { useState, FC } from "react";
import {
  editBlog,
  snackbarAction,
  snackbarMessage,
} from "../services/redux/features/BlogSlice";
import { useAppDispatch, useAppSelector } from "../services/redux/store/store";
import { useLocation, useNavigate } from "react-router-dom";
import CustomizedSnackbars from "./sharedCompinents/CustomizedSnackbars";

const EditBlog: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.data;
  const [title, setTitle] = useState(data?.title);
  const [content, setContent] = useState("");
  const dispatch = useAppDispatch();
  const setSnackbar = useAppSelector((state) => state.setSnackbar);

  const submit = (e) => {
    e.preventDefault();
    dispatch(
      editBlog({
        blogId: data.blogId,
        title: title,
        content: content,
      })
    );
    navigate("/dashboard/DisplayBlogs");
    dispatch(snackbarMessage("blog has been edited"));
    dispatch(snackbarAction());
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
      {setSnackbar && <CustomizedSnackbars message="blog has been edited" />}
    </>
  );
};
export default EditBlog;
