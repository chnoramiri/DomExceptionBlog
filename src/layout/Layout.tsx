import { FC } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import { Grid } from "@mui/material";
import { UnauthenticatedTemplate } from "@azure/msal-react";

const Layout: FC = () => {
  return (
    <>
      <UnauthenticatedTemplate>
        <Grid container>
          <Header />
        </Grid>
        <Grid container style={{ margin: "100px 0 50px " }}>
          <Outlet />
        </Grid>
        <Footer />
      </UnauthenticatedTemplate>
    </>
  );
};
export default Layout;
