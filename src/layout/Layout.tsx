import { FC } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../layout/footer/Footer";
import Header from "../layout/header/Header";

const Layout: FC = () => {
  return (
    <>
      <Header />
      <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
export default Layout;
