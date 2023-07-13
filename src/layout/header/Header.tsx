import { FC } from "react";
import "./header.scss";
import logo from "../../assets/images/Logo.png";
import Typography from "@mui/material/Typography";

const Header: FC = () => {
  return (
    <div className="header">
      <img src={logo} alt="logo" width="150px" height="auto" />
      <Typography variant="h6" component="h6">
        Login
      </Typography>
    </div>
  );
};
export default Header;
