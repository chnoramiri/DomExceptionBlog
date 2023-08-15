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
import { Link } from "react-router-dom";
import { useAppDispatch } from "../services/redux/store/store";
import { fetchBlogs } from "../services/redux/features/BlogSlice";
import DeleteBlog from "./DeleteBlog";

interface WizardProps {
  component: string;
}

const MediaCard: FC<WizardProps> = ({ component }) => {
  const dispatch = useAppDispatch();
  const blogs = useAppSelector((state) => state.blogs);
  const [isDeleteBlog, setIsDeleteBlog] = React.useState(false);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, []);

  return (
    <div className="display">
      {blogs &&
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
                    __html: blog.title.substring(0, 30),
                  }}
                ></Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  dangerouslySetInnerHTML={{
                    __html: blog.content.substring(0, 50),
                  }}
                ></Typography>
              </CardContent>
              {component === "Home" ? (
                <CardActions>
                  <Button size="small">Share</Button>
                  <Link to={`/details/${blog.blogId}`}>Read More</Link>
                </CardActions>
              ) : (
                <CardActions>
                  <Link to={"/dashboard/EditBlog"} state={{ data: blog }}>
                    Edit
                  </Link>
                  <Button onClick={() => setIsDeleteBlog(true)}>Delete</Button>
                  {isDeleteBlog && (
                    <DeleteBlog
                      isDeleteBlog={isDeleteBlog}
                      setIsDeleteBlog={setIsDeleteBlog}
                      id={blog.blogId}
                    />
                  )}
                </CardActions>
              )}
            </Card>
          );
        })}
    </div>
  );
};
export default MediaCard;
