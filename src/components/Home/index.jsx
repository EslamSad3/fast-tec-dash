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
  const { homeData, isLoading, language } = useContext(Context);
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
              width: "100%",
              height: "15rem",
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
                  minWidth: "80%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: theme.palette.neutral.main,
                    boxShadow: "1px 1px 5px rgba(0,0,0,1)",
                    borderRadius: "0.55rem",
                    width: "4rem",
                    height: "4rem",
                    display: "flex",
                    marginRight: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <EmojiPeopleOutlinedIcon />
                </Box>

                <Typography
                  sx={{
                    fontSize: 22,
                    position: "absolute",
                  }}
                  top="2rem"
                  right={language === "en" ? "1rem" : ""}
                  left={language === "ar" ? "1rem" : ""}
                  color={theme.palette.secondary[200]}
                  gutterBottom
                >
                  {t("Customers")}
                </Typography>
              </Box>
              <CardContent>
                <Typography variant="h3" textalign={"center"}>
                  {homeData && homeData?.customers}
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
                  minWidth: "80%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: theme.palette.success.main,
                    boxShadow: "1px 1px 5px rgba(0,0,0,1)",
                    borderRadius: "0.55rem",
                    width: "4rem",
                    height: "4rem",
                    display: "flex",
                    marginRight: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <EngineeringOutlinedIcon />
                </Box>

                <Typography
                  sx={{
                    fontSize: 22,
                    position: "absolute",
                  }}
                  top="2rem"
                  right={language === "en" ? "1rem" : ""}
                  left={language === "ar" ? "1rem" : ""}
                  color={theme.palette.secondary[200]}
                  gutterBottom
                >
                  {t("Technicians")}
                </Typography>
              </Box>
              <CardContent>
                <Typography variant="h3" textalign={"center"}>
                  {homeData && homeData?.techs}
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
                  minWidth: "80%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: theme.palette.warning.main,
                    boxShadow: "1px 1px 5px rgba(0,0,0,1)",
                    borderRadius: "0.55rem",
                    width: "4rem",
                    height: "4rem",
                    display: "flex",
                    marginRight: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <BorderColorOutlinedIcon />
                </Box>

                <Typography
                  sx={{
                    fontSize: 22,
                    position: "absolute",
                  }}
                  top="2rem"
                  right={language === "en" ? "1rem" : ""}
                  left={language === "ar" ? "1rem" : ""}
                  color={theme.palette.secondary[200]}
                  gutterBottom
                >
                  {t("Orders")}
                </Typography>
              </Box>
              <CardContent textalign="start">
                <Typography variant="h5">
                  {t("Total")} :{" "}
                  {homeData && homeData.orders && homeData.orders.total}
                </Typography>
                <Typography variant="h5">
                  {t("COMPLETED")} :{" "}
                  {homeData && homeData.orders && homeData.orders.completed}
                </Typography>
                <Typography variant="h5">
                  {t("pending")} :{" "}
                  {homeData && homeData.orders && homeData.orders.pending}
                </Typography>
              </CardContent>
            </Card>

            {/* profit */}
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
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "-1.5rem",
                  left: "1rem",
                  minWidth: "80%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: theme.palette.info.main,
                    boxShadow: "1px 1px 5px rgba(0,0,0,1)",
                    borderRadius: "0.55rem",
                    width: "4rem",
                    height: "4rem",
                    display: "flex",
                    marginRight: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AttachMoneyIcon />
                </Box>

                <Typography
                  sx={{
                    fontSize: 22,
                    position: "absolute",
                  }}
                  top="2rem"
                  right={language === "en" ? "1rem" : ""}
                  left={language === "ar" ? "1rem" : ""}
                  color={theme.palette.secondary[200]}
                  gutterBottom
                >
                  {t("profit")}
                </Typography>
              </Box>
              <CardContent textalign="start">
                <Typography variant="h5">
                  {t("released")} :{" "}
                  {homeData && homeData.profit && homeData.profit.released}
                </Typography>
                <Typography variant="h5">
                  {t("pending")} :{" "}
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
