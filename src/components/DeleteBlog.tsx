import * as React from "react";
import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../services/redux/store/store";
import { deleteBlog } from "../services/redux/features/BlogSlice";
import AlertDialog from "./sharedCompinents/AlertDialog";

interface WizardProps {
  id: string;
  isDeleteBlog: boolean;
  setIsDeleteBlog: (val: boolean) => void;
}

const DeleteBlog: FC<WizardProps> = ({ setIsDeleteBlog, id }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setShowDialog(true);
  }, [showDialog]);

  useEffect(() => {
    if (isDeleted === true) {
      dispatch(deleteBlog({ blogId: id }));
      setIsDeleteBlog(false);
    }
  }, [isDeleted, dispatch, setIsDeleteBlog, id]);

  const staticData = {
    title: "Confirmation of delete",
    message: "Are you sure",
    btn1: "yes",
    btn2: "cancel",
  };

  return (
    <div>
      {showDialog && (
        <AlertDialog
          showDialog={showDialog}
          setShowDialog={setShowDialog}
          staticData={staticData}
          setIsDeleted={setIsDeleted}
          setIsDeleteBlog={setIsDeleteBlog}
          // id={id}
        />
      )}
    </div>
  );
};
export default DeleteBlog;
