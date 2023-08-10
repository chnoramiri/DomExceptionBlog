import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useAppSelector } from "../services/redux/store/store";
import blog1 from "../assets/images/blog1.jpg";
import { FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../services/redux/store/store";
import { fetchBlogs, deleteBlog } from "../services/redux/features/BlogSlice";
import Dialog from '@mui/material/Dialog';

interface WizardProps {
  component: string;
}
const MediaCard: FC<WizardProps> = ({ component }) => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchBlogs());
  }, []);
  const blogs = useAppSelector((state) => state.blogs);
  const deleteBlog2 = (id) => {
    dispatch(deleteBlog({ blogId: id }));

    // <Dialog />
  };
  return (
    <div className="display">
      {blogs &&
        blogs.map((blog, index) => {
          return (
            <Card sx={{ maxWidth: 345 }} className="card" key={index}>
              <CardMedia sx={{ height: 200 }} image={blog1} title="title" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: blog.title.substring(0,30)
                    }}
                  />
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: blog.content.substring(0,50)
                    }}
                  ></div>
                </Typography>
              </CardContent>
              {component === "Home" ? (
                <CardActions>
                  <Button size="small">Share</Button>
                  <Link to={`/details/${blog.blogId}`}>Read More</Link>
                </CardActions>
              ) : (
                <CardActions>
                  <Link to={"/dashboard/TinyEditor"} state={{ data: blog }}>
                    Edit
                  </Link>
                  <Button onClick={() => deleteBlog2(blog.blogId)}>
                    Delete
                  </Button>
                </CardActions>
              )}
            </Card>
          );
        })}
    </div>
  );
};
export default MediaCard;
