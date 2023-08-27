import * as React from "react";
import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../services/redux/store/store";
import {
  deleteBlog,
  setDialogToggle,
  fetchBlogs,
  setSnackbarToggle,
  setSnackbarMessage,
  reset,
} from "../services/redux/features/BlogSlice";
import AlertDialog from "./sharedComponents/AlertDialog";

interface WizardProps {
  id: string;
  setDeleteId: (val: string) => void;
}

const DeleteBlog: FC<WizardProps> = ({ id, setDeleteId }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const dispatch = useAppDispatch();
  const dialogToggle = useAppSelector((state) => state.dialogToggle);
  const loading = useAppSelector((state) => state.loading);
  const error = useAppSelector((state) => state.error);

  useEffect(() => {
    dispatch(setDialogToggle());
  }, []);

  useEffect(() => {
    if (isDeleted === true) {
      dispatch(deleteBlog({ blogId: id }));
      if (error) {
        dispatch(reset());
      }
      if (!error) {
        dispatch(setSnackbarToggle());
        dispatch(fetchBlogs());
        dispatch(setSnackbarMessage("blog has been deleted"));
        setDeleteId("");
      }
    }
  }, [dispatch, id, isDeleted]);

  const staticData = {
    title: "Confirmation of delete",
    message: "Are you sure?",
    btn1: "Yes",
    btn2: "Cancel",
  };

  return (
    <div>
      {dialogToggle && (
        <AlertDialog staticData={staticData} setIsDeleted={setIsDeleted} />
      )}
    </div>
  );
};
export default DeleteBlog;
