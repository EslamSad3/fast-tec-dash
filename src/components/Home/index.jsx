import {
  Badge,
  Box,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import Header from "../Header";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { Context } from "../../context";
import { useNavigate } from "react-router-dom";
import EmojiPeopleOutlinedIcon from "@mui/icons-material/EmojiPeopleOutlined";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
function Home() {
  const { homeData, isLoading } = useContext(Context);
  const [t] = useTranslation();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <>
      <Box m="1.5rem 2.5rem">
        <Header title={t("Summary")} />
        {homeData || !isLoading ? (
          <Box
            mt="5rem"
            display="grid"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            justifyContent="space-between"
            rowGap="3rem"
            columnGap="3rem"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {/* Customers */}
            <Card
              sx={{
                backgroundImage: "none",
                backgroundColor: theme.palette.background.alt,
                borderRadius: "0.55rem",
                cursor: "pointer",
                position: "relative",
                overflow: "visible",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => navigate("/customers")}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "-1.5rem",
                  left: "1rem",
                  minWidth: "25%",
                  minHeight: "30%",
                  borderRadius: "0.55rem",
                  backgroundColor: theme.palette.neutral.main,
                  boxShadow: "1px 1px 5px rgba(0,0,0,1)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <EmojiPeopleOutlinedIcon />
              </Box>
              <CardContent>
                <Typography
                  sx={{ fontSize: 35 ,marginTop:"50px"}}
                  color={theme.palette.secondary[200]}
                  gutterBottom
                >
                  {t("Customers")}
                </Typography>
                <Typography variant="h6">
                  {t("Number Of Customers")} : {homeData && homeData?.customers}
                </Typography>
              </CardContent>
            </Card>

            {/* techs */}
            <Card
              sx={{
                backgroundImage: "none",
                backgroundColor: theme.palette.background.alt,
                borderRadius: "0.55rem",
                cursor: "pointer",
                position: "relative",
                overflow: "visible",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => navigate("/technicians")}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "-1.5rem",
                  left: "1rem",
                  minWidth: "25%",
                  minHeight: "30%",
                  borderRadius: "0.55rem",
                  backgroundColor: theme.palette.success.main,
                  boxShadow: "1px 1px 5px rgba(0,0,0,1)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <EngineeringOutlinedIcon />
              </Box>
              <CardContent>
                <Typography
                  sx={{ fontSize: 35 ,marginTop:"50px"}}
                  color={theme.palette.secondary[200]}
                  gutterBottom
                >
                  {t("Technicians")}
                </Typography>
                <Typography variant="h6">
                  {t("Number Of Technicians")} : {homeData && homeData?.techs}
                </Typography>
              </CardContent>
            </Card>

            {/* Orders */}
            <Card
              sx={{
                backgroundImage: "none",
                backgroundColor: theme.palette.background.alt,
                borderRadius: "0.55rem",
                cursor: "pointer",
                position: "relative",
                overflow: "visible",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => navigate("/orders")}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "-1.5rem",
                  left: "1rem",
                  minWidth: "25%",
                  minHeight: "30%",
                  borderRadius: "0.55rem",
                  backgroundColor: theme.palette.warning.main,
                  boxShadow: "1px 1px 5px rgba(0,0,0,1)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <BorderColorOutlinedIcon />
              </Box>
              <CardContent>
                <Typography
                  sx={{ fontSize: 35 ,marginTop:"50px"}}
                  color={theme.palette.secondary[200]}
                  gutterBottom
                >
                  {t("Orders")}
                </Typography>

                <Typography variant="body1">
                  {t("Number Of Orders")} :
                  {homeData && homeData.orders && homeData.orders.total}
                </Typography>
                <Typography variant="body1">
                  {t("Number Of completed Orders")} :
                  {homeData && homeData.orders && homeData.orders.completed}
                </Typography>
                <Typography variant="body1">
                  {t("Number Of pending Orders")} :
                  {homeData && homeData.orders && homeData.orders.pending}
                </Typography>
              </CardContent>
            </Card>
            {/* Prifite */}
            <Card
              sx={{
                backgroundImage: "none",
                backgroundColor: theme.palette.background.alt,
                borderRadius: "0.55rem",
                cursor: "pointer",
                position: "relative",
                overflow: "visible",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => navigate("/customers")}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "-1.5rem",
                  left: "1rem",
                  minWidth: "25%",
                  minHeight: "30%",
                  borderRadius: "0.55rem",
                  backgroundColor: theme.palette.info.main,
                  boxShadow: "1px 1px 5px rgba(0,0,0,1)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AttachMoneyIcon />
              </Box>
              <CardContent>
                <Typography
                  sx={{ fontSize: 35 ,marginTop:"50px"}}
                  color={theme.palette.secondary[200]}
                  gutterBottom
                >
                  {t("profit")}
                </Typography>
                <Typography variant="h6">
                  {t("released")} :
                  {homeData && homeData.profit && homeData.profit.released}
                </Typography>
                <Typography variant="h6">
                  {t("pending")} :
                  {homeData && homeData.profit && homeData.profit.pending}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ) : (
          <>Loading...</>
        )}
      </Box>
    </>
  );
}

export default Home;
