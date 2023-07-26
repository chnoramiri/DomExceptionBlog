import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useAppSelector } from "../services/redux/store/store";
import blog1 from "../assets/images/blog1.jpg";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";

const MediaCard: FC = () => {
  const navigate = useNavigate();
  const blogs = useAppSelector((state) => state.blogs);
console.log(blogs)
  return (
    <div className="display">
      {blogs &&
        blogs.map((blog, index) => {
          return (
            <Card sx={{ maxWidth: 345 }} className="card" key={index}>
              <CardMedia sx={{ height: 200 }} image={blog1} title="title" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {blog.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {blog.content}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Link to={`/details/${blog.blogId}`}>Read More</Link>
              </CardActions>
            </Card>
          );
        })}
    </div>
  );
};
export default MediaCard;
