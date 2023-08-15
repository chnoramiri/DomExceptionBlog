import TinyEditor from "./sharedCompinents/TinyEditor";
import React, { useState, FC } from "react";
import { saveBlog } from "../services/redux/features/BlogSlice";
import { useAppDispatch } from "../services/redux/store/store";
import CustomizedSnackbars from "./sharedCompinents/CustomizedSnackbars";
import { useNavigate } from "react-router-dom";

const CreateBlog: FC = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    dispatch(
      saveBlog({
        title: title,
        content: content,
      })
    );
    setOpenSnackbar(true);
    navigate("/dashboard/DisplayBlogs");
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
        <TinyEditor setContent={setContent} />
        <button type="submit" disabled={openSnackbar}>
          Submit
        </button>
      </form>
      {openSnackbar && (
        <CustomizedSnackbars
          openSnackbar={openSnackbar}
          setOpenSnackbar={setOpenSnackbar}
          message="blog has been created"
        />
      )}
    </>
  );
};
export default CreateBlog;
