import { FC } from "react";
import "./main.scss";
import DisplayBlog from "../../components/DisplayBlogs";

const Main: FC = () => {
  return (
    <div className="main">
      <DisplayBlog component="Home" />
    </div>
  );
};
export default Main;
