import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useAppSelector } from "../services/redux/store/store";
import blog1 from "../assets/images/blog1.jpg";
import { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch } from "../services/redux/store/store";
import {
  setDialogToggle,
  fetchBlogs,
} from "../services/redux/features/BlogSlice";
import DeleteBlog from "./DeleteBlog";
import CustomizedSnackbars from "./sharedComponents/CustomizedSnackbars";
import { Grid } from "@mui/material";

const MediaCard: FC = () => {
  const dispatch = useAppDispatch();
  const status = useLocation();
  const blogs = useAppSelector((state) => state.blogs);
  const snackbarToggle = useAppSelector((state) => state.snackbarToggle);
  const loading = useAppSelector((state) => state.loading);
  const [deleteId, setDeleteId] = useState("");

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const deleteBlog = (blogId) => {
    setDeleteId(blogId);
    dispatch(setDialogToggle());
  };

  return (
    <Grid container className="display">
      {loading && !blogs ? (
        <Grid container justifyContent="center">
          <Typography variant="h5">Loading...</Typography>
        </Grid>
      ) : (
        blogs.map((blog, index) => {
          return (
            <Card sx={{ maxWidth: 345 }} className="card" key={index}>
              <CardMedia sx={{ height: 200 }} image={blog1} title="title" />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  dangerouslySetInnerHTML={{
                    __html: blog.title?.substring(0, 30),
                  }}
                ></Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  dangerouslySetInnerHTML={{
                    __html: blog.content?.substring(0, 50),
                  }}
                ></Typography>
              </CardContent>
              {status.pathname === "/" ? (
                <CardActions>
                  <Button size="small">Share</Button>
                  <Link to={`/details/${blog.blogId}`}>Read More</Link>
                </CardActions>
              ) : (
                <CardActions>
                  <Link to={"/dashboard/EditBlog"} state={{ data: blog }}>
                    Edit
                  </Link>
                  <Button onClick={() => deleteBlog(blog.blogId)}>
                    Delete
                  </Button>
                </CardActions>
              )}
            </Card>
          );
        })
      )}
      {!loading && !blogs ? (
        <Grid container justifyContent="center">
          <Typography variant="h5">There is no blog ...</Typography>
        </Grid>
      ) : (
        ""
      )}

      {snackbarToggle && <CustomizedSnackbars type="success" />}
      {deleteId && <DeleteBlog id={deleteId} setDeleteId={setDeleteId} />}
    </Grid>
  );
};
export default MediaCard;
