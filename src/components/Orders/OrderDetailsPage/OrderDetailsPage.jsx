import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../../context";
import { Box, Typography, Alert, useTheme, useMediaQuery } from "@mui/material";
import Header from "../../Header";
import { useTranslation } from "react-i18next";
const OrderDetailsPage = () => {
  const [t] = useTranslation();
  const { id } = useParams();
  const { order, fetchOneOrder, refreshData, oneCustomer, oneTech } =
    useContext(Context);
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const navigate = useNavigate();

  // Fetch order

  async function fetchOrder() {
    await fetchOneOrder(id);

    refreshData();
  }

  useEffect(() => {
    fetchOrder();
  }, []);

  // console.log(oneCustomer, "oneCustomer");
  // console.log(oneTech, "oneTech");

  if (!order) {
    return <div>Loading...</div>; // Add a loading state or redirect as needed
  }

  return (
    <Box>
      <Header title={t("Order Details")} />

      <Box
        sx={{
          boxShadow: "2px 2px 2px 2px rgba(0,0,0,0.25)",
          mx: "1rem",
          p: "1.5rem",
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant="h6">
              {t("Order ID")} : {order && order.data?.id}
            </Typography>
            <Typography variant="small">
              {" "}
              {t("Date")} : {order && order.data?.creationDate}
            </Typography>
          </Box>
          <Box>
            <Typography variant="p" component="div">
              {order && order.data?.status === "0" ? (
                <Alert severity="success">{t("NEW")}</Alert>
              ) : order && order.data?.status === "1" ? (
                <Alert severity="error">{t("CANCELLED")}</Alert>
              ) : order && order.data?.status === "2" ? (
                <Alert severity="warning">{t("REJECTED")}</Alert>
              ) : order && order.data?.status === "3" ? (
                <Alert severity="info">{t("ON_WAY")}</Alert>
              ) : order && order.data?.status === "4" ? (
                <Alert severity="info">{t("IN_PROGRESS")}</Alert>
              ) : order && order.data?.status === "5" ? (
                <Alert severity="info">{t("PENDING_PAYMENT")}</Alert>
              ) : order && order.data?.status === "6" ? (
                <Alert severity="success">{t("COMPLETED")}</Alert>
              ) : (
                ""
              )}
            </Typography>
          </Box>
        </Box>

        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(2, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            {/* Customer */}
            {order && oneCustomer ? (
              <Box
                sx={{
                  boxShadow: "2px 2px 2px 2px rgba(0,0,0,0.25)",
                  borderRadius: "10px",
                  cursor: "pointer",
                  p: "1rem",
                }}
                onClick={() => navigate(`/customers/${oneCustomer.id}`)}
              >
                <Typography variant="h6">{t("Customer")} </Typography>

                <Typography variant="p">
                  {t("Name")} :{order && oneCustomer && oneCustomer.name}
                </Typography>
                <br />
                <Typography variant="p">
                  {t("Phone")} :{order && oneCustomer && oneCustomer.phone}
                </Typography>
              </Box>
            ) : (
              <Typography variant="h6">{t("Customer Not Found")} </Typography>
            )}
          </Box>
          {/* Tec */}
          {order && oneTech ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  boxShadow: "2px 2px 2px 2px rgba(0,0,0,0.25)",
                  borderRadius: "10px",
                  cursor: "pointer",
                  p: "1rem",
                }}
                onClick={() => navigate(`/technicians/${oneTech.id}`)}
              >
                <Typography variant="h6">{t("Technician")} </Typography>

                <Typography variant="p">
                  {t("Name")} :{order && oneTech && oneTech.name}{" "}
                </Typography>
                <br />
                <Typography variant="p">
                  {t("Phone")} :{order && oneTech && oneTech.phone}{" "}
                </Typography>
              </Box>
            </Box>
          ) : (
            <Typography variant="h6">{t("Technician Not Found")} </Typography>
          )}

          {/* invoice */}

          {order && order && order.data?.invoiceId ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
              }}
            >
              <Box>
                <Typography variant="h6">{t("Order Info")} </Typography>

                <Typography variant="p">
                  {t("Invoice ID")}:
                  {order && order && order.data?.invoiceId === null
                    ? t("No ID")
                    : order && order.data?.invoiceId}{" "}
                </Typography>
              </Box>
            </Box>
          ) : (
            <Typography variant="p">
              {" "}
              {t("Invoice ID")}: {t("No ID")}
            </Typography>
          )}

          {/* Paymnet */}
          <Box>
            <Typography variant="h6">{t("Payment Info")} </Typography>
            {order && order && order.data?.paymentInfo ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                }}
              >
                <Typography variant="p">
                  {t("Invoice ID")} :
                  {order && order && order.data?.paymentInfo === null
                    ? t("No ID")
                    : order && order.data?.paymentInfo}
                </Typography>
              </Box>
            ) : (
              <Typography variant="p">
                {" "}
                {t("Invoice ID")}: {t("No ID")}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderDetailsPage;
