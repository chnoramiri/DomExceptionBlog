import { FC } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import DisplayBlog from "../components/DisplayBlogs";
import "./layout.scss";

const Layout: FC = () => {
  return (
    <>
      <Header />
      <Outlet />
      <DisplayBlog component="Home" />
      <Footer />
    </>
  );
};
export default Layout;
