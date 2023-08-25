import * as React from "react";
import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../services/redux/store/store";
import {
  deleteBlog,
  dialogAction,
  fetchBlogs,
  snackbarAction,
  snackbarMessage,
} from "../services/redux/features/BlogSlice";
import AlertDialog from "./sharedComponents/AlertDialog";

interface WizardProps {
  id: string;
}

const DeleteBlog: FC<WizardProps> = ({ id }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const dispatch = useAppDispatch();
  const setDialog = useAppSelector((state) => state.setDialog);

  useEffect(() => {
    dispatch(dialogAction());
  }, []);

  useEffect(() => {
    if (isDeleted === true) {
      dispatch(deleteBlog({ blogId: id }));
      dispatch(snackbarMessage( "blog has been deleted"))
      dispatch(snackbarAction());
      dispatch(fetchBlogs());

    }
  }, [dispatch, id,isDeleted]);

  const staticData = {
    title: "Confirmation of delete",
    message: "Are you sure?",
    btn1: "Yes",
    btn2: "Cancel",
  };

  return (
    <div>
      {setDialog && (
        <AlertDialog staticData={staticData} setIsDeleted={setIsDeleted} />
      )}
    </div>
  );
};
export default DeleteBlog;
