import { FC } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../services/redux/store/store";
import { fetchBlogById } from "../services/redux/features/BlogSlice";
import { useEffect } from "react";

const DetailsBlog: FC = () => {
  let { id } = useParams();
  const dispatch = useAppDispatch();
  const blogs = useAppSelector((state) => state.blogById);

  useEffect(() => {
    dispatch(fetchBlogById({ blogId: id }));
  }, [id,dispatch]);

  return (
    <div>
      sdfsdf
      sdfds
      fdf
      describe
      f
      df
      d
      fds
      fdsf'
      <p>{`Title : ${blogs?.title}`}</p>
      <div dangerouslySetInnerHTML={{ __html: blogs?.content }} />
    </div>
  );
};
export default DetailsBlog;
