import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";


interface deleteProps {
  showDialog: boolean;
  setIsDeleted: (val: boolean) => void;
  setShowDialog: (val: boolean) => void;
  setIsDeleteBlog: (val: boolean) => void;
  staticData: { title: string; message: string; btn1: string; btn2: string };
}

const AlertDialog: React.FC<deleteProps> = ({
  showDialog,
  setIsDeleted,
  setShowDialog,
  setIsDeleteBlog,
  staticData,
}) => {
  const handleClose = (key) => {
    if (key === "yes") {
      setShowDialog(false);
      setIsDeleted(true);
    } else if (key === "cancel") {
      setShowDialog(false);
      setIsDeleteBlog(false);
    }
  };

  const { message, title, btn1, btn2 } = staticData;
  return (
    <div>
      <Dialog
        open={showDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(btn1)}>{btn1}</Button>
          <Button onClick={() => handleClose(btn2)} autoFocus>
            {btn2}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default AlertDialog;
