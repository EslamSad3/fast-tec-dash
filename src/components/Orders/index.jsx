import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "../Header";
import { useContext } from "react";
import { Context } from "../../context";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Orders() {
  const navigate = useNavigate();
  const { orders, isLoading } = useContext(Context);
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();
  const [t] = useTranslation();
  return (
    <Box m="1.5rem 2.5rem">
      <Header title={t("Orders")} subtitle={t("list of Orders")} />
      <small>
        {t("Number Of Orders")} : {orders.length}
      </small>
      {orders || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {orders.map(({ id, customerId, status }) => (
            <Card
              sx={{
                backgroundImage: "none",
                backgroundColor: theme.palette.background.alt,
                borderRadius: "0.55rem",
                cursor: "pointer",
              }}
              onClick={() => navigate(`/orders/${id}`)}
            >
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color={theme.palette.secondary[200]}
                  gutterBottom
                >
                  {t("Order ID")} : {id}
                </Typography>
                <Typography variant="p" component="div">
                  {`${t("Status")} : `}
                  {status === "0" ? (
                    <Typography variant="p" color={theme.palette.success.main}>
                      {t("NEW")}
                    </Typography>
                  ) : status === "1" ? (
                    <Typography variant="p" color={theme.palette.error.main}>
                      {t("CANCELLED")}
                    </Typography>
                  ) : status === "2" ? (
                    <Typography variant="p" color={theme.palette.warning.main}>
                      {t("REJECTED")}
                    </Typography>
                  ) : status === "3" ? (
                    <Typography variant="p" color={theme.palette.info.main}>
                      {t("ON_WAY")}
                    </Typography>
                  ) : status === "4" ? (
                    <Typography variant="p" color={theme.palette.info[300]}>
                      {t("IN_PROGRESS")}
                    </Typography>
                  ) : status === "5" ? (
                    <Typography variant="p" color={theme.palette.warning[600]}>
                      {t("PENDING_PAYMENT")}
                    </Typography>
                  ) : status === "6" ? (
                    <Typography variant="p" color={theme.palette.success[900]}>
                      {t("COMPLETED")}
                    </Typography>
                  ) : (
                    ""
                  )}
                </Typography>
                <Typography variant="body2">
                  {t("Customer ID")} : {customerId}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
}

export default Orders;
