import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useAppSelector } from "../services/redux/store/store";
import blog1 from "../assets/images/blog1.jpg";

export default function MediaCard() {
  const blogs = useAppSelector((state) => state.blog);

  return (
    <div className="display">
      {blogs.map((blog, index) => {
        return (
          <Card sx={{ maxWidth: 345 }} className="card">
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
              <Button size="small">Read More</Button>
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
}
