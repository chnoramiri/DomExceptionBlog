import { FC } from "react";
import "./header.scss";
import logo from "../../assets/images/Logo.png";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Header: FC = () => {
  const navigate = useNavigate();

  return (
    <Grid container className="header">
      <img
        className="pointer"
        onClick={() => navigate("/")}
        src={logo}
        alt="logo"
        width="150px"
        height="auto"
      />
      <Typography
        className="pointer"
        variant="h6"
        component="h6"
        onClick={() => navigate("/dashboard")}
      >
        {/* Login */}
        dashboard
      </Typography>
    </Grid>
  );
};
export default Header;
