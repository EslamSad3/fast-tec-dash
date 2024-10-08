import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";

import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ChevronLeftOutlined,
} from "@mui/icons-material";

import EmojiPeopleOutlinedIcon from "@mui/icons-material/EmojiPeopleOutlined";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "../FlexBetween";
import profileImage from "../../assets/images/Fastteclogopng.png";
import { useTranslation } from "react-i18next";
import { Context } from "../../context";

const SideBar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const [t] = useTranslation();

  const { language, testUser } = useContext(Context);

  const navItems = [
    {
      text: t("Dashboard"),
      entext: "Dashboard",
      icon: <HomeOutlined />,
    },
    !testUser && {
      text: t("Customers"),
      entext: "Customers",
      icon: <EmojiPeopleOutlinedIcon />,
    },
    {
      text: t("Technicians"),
      entext: "Technicians",
      icon: <EngineeringOutlinedIcon />,
    },
    !testUser && {
      text: t("Available Technicians"),
      entext: "Available Technicians",
      icon: <EngineeringOutlinedIcon />,
    },
    {
      text: t("Orders"),
      entext: "Orders",
      icon: <BorderColorOutlinedIcon />,
    },
    {
      text: t("Completed Orders"),
      entext: "Completed Orders",
      icon: <ThumbUpIcon />,
    },
    {
      text: t("Cancelled orders"),
      entext: "Cancelled orders",
      icon: <ThumbDownAltIcon />,
    },
    !testUser && {
      text: t("Coupons"),
      entext: "Coupons",
      icon: <LocalOfferIcon />,
    },
    !testUser && {
      text: t("Notifications"),
      entext: "Notifications",
      icon: <NotificationsActiveIcon />,
    },
  ].filter(Boolean); // Remove any null items from the array

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor={language === "ar" ? "right" : "left"}
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
              boxShadow: "0 0 4px rgba(0,0,0,0.5)",
            },
          }}
          right={language === "ar" ? "-2rem" : ""}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    Fast-Tec
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ entext, text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.split(" ").join("").toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(
                          `/${entext?.split(" ").join("").toLowerCase()}`
                        );
                        setActive((prevActive) =>
                          prevActive.localeCompare(lcText) === 0 ? "" : lcText
                        );
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: language === "en" ? "2rem" : "0",
                          mr: language === "ar" ? "2rem" : "0",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>

                      <ListItemText
                        primary={text}
                        sx={{
                          textAlign: "start",
                        }}
                      />
                      {active === lcText &&
                        (language === "en" ? (
                          <ChevronRightOutlined sx={{ ml: "auto" }} />
                        ) : (
                          <ChevronLeftOutlined sx={{ mr: "auto" }} />
                        ))}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
          {!testUser && (
            <Box position="absolute" bottom="2rem">
              <Divider />
              <FlexBetween
                textTransform="none"
                gap="1rem"
                m="1.5rem 2rem 0 3rem"
              >
                <Box
                  component="img"
                  alt="profile"
                  src={profileImage}
                  height="40px"
                  width="40px"
                  borderRadius="50%"
                  sx={{ objectFit: "cover" }}
                />
                <Box textAlign="left">
                  <Typography
                    fontWeight="bold"
                    fontSize="0.9rem"
                    sx={{ color: theme.palette.secondary[100] }}
                  >
                    Admin
                  </Typography>
                  <Typography
                    fontSize="0.8rem"
                    sx={{ color: theme.palette.secondary[200] }}
                  >
                    Admin
                  </Typography>
                </Box>
                <SettingsOutlined
                  sx={{
                    color: theme.palette.secondary[300],
                    fontSize: "25px ",
                  }}
                />
              </FlexBetween>
            </Box>
          )}
        </Drawer>
      )}
    </Box>
  );
};

export default SideBar;
