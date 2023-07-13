import { FC } from "react";
import "./footer.scss";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Typography } from "@mui/material";
import CopyrightIcon from "@mui/icons-material/Copyright";

const Footer: FC = () => {
  return (
    <div className="footer">
      <div className="context">
        <CopyrightIcon fontSize="small" />
        <Typography>Dom Exception</Typography>
      </div>
      <div>
        <FacebookIcon />
        <LinkedInIcon />
        <InstagramIcon />
        <TwitterIcon />
        <YouTubeIcon />
      </div>
      <div className="context">
        <Typography>Help </Typography>
        <Typography>Privacy </Typography>
        <Typography>Terms </Typography>
      </div>
    </div>
  );
};
export default Footer;
