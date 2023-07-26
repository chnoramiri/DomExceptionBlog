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
    console.log(id);
  }, []);
// console.log(blogById)
  return (
    <div className="DetailsBlog">
      <Typography variant="h3">{blogById[0]&&blogById[0].title}</Typography>
      <Typography variant="h5">{blogById[0]&&blogById[0].content}</Typography>
      {/* {blogById[0]&&blogById[0].pictures.map((pic, index) => (
        <img src={require(`${pic.picture}`)} alt="picture" key={index}/>
      ))} */}
    </div>
  );
};
export default DetailsBlog;
