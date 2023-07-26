import { FC } from "react";
import "./main.scss";
import DisplayBlog from "../../components/DisplayBlogs";
import SaveBlog from "../../components/SaveBlog";
import { useEffect } from "react";
import { useAppDispatch } from "../../services/redux/store/store";
import { fetchBlogs } from "../../services/redux/features/BlogSlice";

const Main: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchBlogs());
  }, []);

  return (
    <div className="main">
      <DisplayBlog />
      <SaveBlog />
    </div>
  );
};
export default Main;
