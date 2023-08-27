import "./DetailsBlog.scss";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../services/redux/store/store";
import { fetchBlogById } from "../services/redux/features/BlogSlice";
import { useEffect } from "react";
import { Grid, Typography } from "@mui/material";

const DetailsBlog: FC = () => {
  let { id } = useParams();
  const dispatch = useAppDispatch();
  const blogs = useAppSelector((state) => state.blogById);

  useEffect(() => {
    dispatch(fetchBlogById({ blogId: id }));
  }, [id, dispatch]);

  return (
    <Grid container className="detail">
      <Grid container justifyContent="center">
        <Typography variant="h3" className="display">
          {blogs?.title}
        </Typography>
      </Grid>
      <Grid item className="content">
        <Typography dangerouslySetInnerHTML={{ __html: blogs?.content }} />
      </Grid>
    </Grid>
  );
};
export default DetailsBlog;
