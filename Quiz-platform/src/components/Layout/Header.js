import React, { useState } from "react";
import {
  Box,
  AppBar,
  Typography,
  Toolbar,
  IconButton,
  Drawer,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import "./HeaderStyle.css";
const Header = () => {
  const [webOpen, setwebOpen] = useState(false);
  //clickondrawer
  const clickondrawer = () => {
    setwebOpen(!webOpen);
  };
  //Menu Drawer Func
  const drawer = (
    <Box onClick={clickondrawer} sx={{}}>
      <Typography component="div" sx={{ flexGrow: 1 }}>
        <Box className="Logo" sx={{}}></Box>
        <Divider />
      </Typography>
      <ul className="mobile-menu">
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/newquiz"}>Create New Quiz</Link>
        </li>
        <li>
          <Link to={"/Quiz"}>View My Quizes</Link>
        </li>
        <li>
          <Link to={"/PlayQuiz"}>Play Quiz</Link>
        </li>
      </ul>
    </Box>
  );
  return (
    <>
      <Box>
        <AppBar component={"nav"} sx={{ backgroundColor: "white" }}>
          <Toolbar>
            <IconButton
              aria-label="open drawer"
              edge="start"
              sx={{
                mr: 1,
                color: "black",
                display: { xs: "block", sm: "none" },
              }}
              onClick={clickondrawer}
            >
              <MenuIcon sx={{ fontSize: "30px", marginLeft: "20px" }} />
            </IconButton>
            <Typography component="div" sx={{ flexGrow: 1 }}>
              <Box className="Logo"></Box>
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <ul className="navigation-menu">
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
                <li>
                  <Link to={"/Quiz"}>View My Quizes</Link>
                </li>
                <li>
                  <Link to={"/PlayQuiz"}>Play Quiz</Link>
                </li>
              </ul>
            </Box>
          </Toolbar>
        </AppBar>
        <Box component={"nav"}>
          <Drawer
            variant="temporary"
            open={webOpen}
            onClose={clickondrawer}
            sx={{
              "& .MuiDrawer-paper": { boxSizing: "border-box", width: "240px" },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box sx={{}}>
          <Toolbar />
        </Box>
      </Box>
    </>
  );
};

export default Header;
