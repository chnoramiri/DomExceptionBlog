import { FC } from "react";
import "./footer.scss";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Grid, Typography } from "@mui/material";
import CopyrightIcon from "@mui/icons-material/Copyright";

const Footer: FC = () => {
  return (
    <Grid className="footer">
      <Grid className="context">
        <CopyrightIcon fontSize="small" />
        <Typography>Dom Exception</Typography>
      </Grid>
      <Grid>
        <FacebookIcon />
        <LinkedInIcon />
        <InstagramIcon />
        <TwitterIcon />
        <YouTubeIcon />
      </Grid>
      <Grid className="context">
        <Typography>Help </Typography>
        <Typography>Privacy </Typography>
        <Typography>Terms </Typography>
      </Grid>
    </Grid>
  );
};
export default Footer;
