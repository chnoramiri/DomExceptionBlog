import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import {
  useAppDispatch,
  useAppSelector,
} from "../../services/redux/store/store";
import {
  saveBlog,
  fetchBlogs,
  snackbarAction,
} from "../../services/redux/features/BlogSlice";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({ message }) {
  const setSnackbar = useAppSelector((state) => state.setSnackbar);
  const dispatch = useAppDispatch();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(snackbarAction());
  };
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={setSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
