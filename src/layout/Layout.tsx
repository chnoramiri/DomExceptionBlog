import { FC } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import { Grid } from "@mui/material";

const Layout: FC = () => {
  return (
    <>
      <Grid container>
        <Header />
      </Grid>
      <Grid container style={{margin:'100px 0 50px '}}>
        <Outlet />
      </Grid>
      <Footer />
    </>
  );
};
export default Layout;
