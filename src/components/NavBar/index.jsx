import React, { useState } from "react";
import {
  ArrowDropDownOutlined,
  Menu as MenuIcon,
  SettingsOutlined,
} from "@mui/icons-material";
import FlexBetween from "../FlexBetween";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import profileImage from "../../assets/images/Fastteclogopng.png";
import { useNavigate } from "react-router-dom";
function NavBar({ isSidebarOpen, setIsSidebarOpen }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => {
    localStorage.clear();
    navigate("/login");
    setAnchorEl(null);
  };
  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: " 1px 1px 1px 1px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
        </FlexBetween>

        {/* Right */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => console.log("settings")}>
            <SettingsOutlined />
          </IconButton>

          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: "" }}
                >
                  Admin
                </Typography>
                <Typography fontSize="0.75rem" sx={{ color: "" }}>
                  Admin
                </Typography>
              </Box>
              <ArrowDropDownOutlined sx={{ color: "", fontSize: "25px" }} />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={()=>setAnchorEl(null)}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={handleClose}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
