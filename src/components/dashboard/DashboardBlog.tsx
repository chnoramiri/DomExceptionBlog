import React, { useRef, useEffect, useState, FC } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AodIcon from "@mui/icons-material/Aod";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import HomeIcon from "@mui/icons-material/Home";
import "./dashboardBlog.scss";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";

const drawerWidth = 240;

const DashboardBlog: FC = () => {
  const navigate = useNavigate();

  const itemsList = [
    {
      text: "Display blogs",
      icon: <AodIcon />,
      onClick: () => navigate("/dashboard/DisplayBlogs"),
    },
    {
      text: "Create blog",
      icon: <NoteAddIcon />,
      onClick: () => navigate("/dashboard/CreateBlog"),
    },
  ];
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        {/* <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar> */}
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Grid container className="preview">
          <Grid className="homeIcon">
            <HomeIcon />
          </Grid>

          <Grid>
            <Typography onClick={()=>navigate("/")}>Blogs Preview</Typography>
          </Grid>
        </Grid>
        <Divider />
        <List>
          {itemsList.map((item, index) => {
            const { text, icon, onClick } = item;
            return (
              <ListItem button key={text} onClick={onClick}>
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText primary={text} />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      <Box component="main" style={{margin:'20px 0'}}>
        <Toolbar />
      </Box>
    </Box>
  );
};
export default DashboardBlog;
