import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import {
  useAppDispatch,
  useAppSelector,
} from "../../services/redux/store/store";
import {
  setSnackbarMessage,
  setSnackbarToggle,
} from "../../services/redux/features/BlogSlice";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({ type }) {
  const snackbarToggle = useAppSelector((state) => state.snackbarToggle);
  const snackbarMessage = useAppSelector((state) => state.snackbarMessage);
  const dispatch = useAppDispatch();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setSnackbarToggle());
    dispatch(setSnackbarMessage(""));
  };
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={snackbarToggle}
        autoHideDuration={1000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
