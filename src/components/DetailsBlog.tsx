import { FC } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../services/redux/store/store";
import { fetchBlogById } from "../services/redux/features/BlogSlice";
import { useEffect } from "react";
import Typography from "@mui/material/Typography";

const DetailsBlog: FC = () => {
  let { id } = useParams();
  const dispatch = useAppDispatch();
  const blogById = useAppSelector((state) => state.blogById);

  useEffect(() => {
    dispatch(fetchBlogById({ blogId: id }));
  }, []);
  const body = (blogById)=> blogById[0]?.content;
  const title = (blogById)=> blogById[0]?.title;

  return (
    <div>
      <p>Title : {title}</p>
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </div>
  );
};
export default DetailsBlog;
