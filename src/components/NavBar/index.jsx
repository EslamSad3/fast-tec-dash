import React, { useEffect, useState } from "react";
import {
  ArrowDropDownOutlined,
  DarkModeOutlined,
  LightModeOutlined,
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
  Input,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

import { Us, Sa } from "react-flags-select";
import profileImage from "../../assets/images/Fastteclogopng.png";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { useDispatch } from "react-redux";
import { setMode } from "../../state";
import { useTranslation } from "react-i18next";

function NavBar({ isSidebarOpen, setIsSidebarOpen }) {
  const [t, i18n] = useTranslation();
  const [Language, setLanguage] = useState(<Us />);
  const handleChange = (event) => {
    setLanguage(event.target.value);
    localStorage.setItem("locale", event.target.value);
  };
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => {
    localStorage.removeItem("AdminToken");
    navigate("/login");
    setAnchorEl(null);
  };

  return (
    <AppBar
      sx={{
        position: "static",
        background: `${theme.palette.background.alt}`,
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
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <FlexBetween
            sx={{
              " .MuiOutlinedInput-notchedOutline": { border: "0px" },
              border: "1px ",
            }}
          >
            <Typography>
              {Language && Language === "en" ? <Us /> : <Sa />}
            </Typography>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={Language}
              label="Language"
              onChange={handleChange}
            >
              <MenuItem
                value="ar"
                onClick={() => {
                  i18n.changeLanguage("ar");
                }}
              >
                عربي
              </MenuItem>
              <MenuItem
                value="en"
                onClick={() => {
                  i18n.changeLanguage("en");
                }}
              >
                {/* <Us value="en" /> */}
                English
              </MenuItem>
            </Select>
          </FlexBetween>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
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
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  Admin
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  Admin
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={() => setAnchorEl(null)}
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
