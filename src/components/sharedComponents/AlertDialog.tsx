import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  useAppDispatch,
  useAppSelector,
} from "../../services/redux/store/store";
import { setDialogToggle } from "../../services/redux/features/BlogSlice";
import DialogActions from "@mui/material/DialogActions";

interface deleteProps {
  setIsDeleted: (val: boolean) => void;
  staticData: { title: string; message: string; btn1: string; btn2: string };
}

const AlertDialog: React.FC<deleteProps> = ({ setIsDeleted, staticData }) => {
  const dispatch = useAppDispatch();
  const dialogToggle = useAppSelector((state) => state.dialogToggle);

  const handleClose = (key) => {
    if (key === "Yes") {
      dispatch(setDialogToggle());
      setIsDeleted(true);
    } else if (key === "Cancel") {
      dispatch(setDialogToggle());
    }
  };

  const { message, title, btn1, btn2 } = staticData;
  return (
    <div>
      <Dialog
        open={dialogToggle}
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
