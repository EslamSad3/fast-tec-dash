// technicianDetailsPage.jsx
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../../context";
import {
  Box,
  Button,
  CircularProgress,
  DialogActions,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Alert,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "../../Header";
import { useTranslation } from "react-i18next";
import FlexBetween from "../../FlexBetween";
const OrderDetailsPage = () => {
  const [t] = useTranslation();
  const { id } = useParams();
  const theme = useTheme();
  const { orders, customers, technicians } = useContext(Context);
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  const [order, setOrder] = useState(null);
  const [customer, setCusomer] = useState(null);
  const [technician, setTechnician] = useState(null);

  useEffect(() => {
    // Find the technician with the matching id from the URL
    const selectedOrder = orders.find((o) => String(o.id) === id);
    setOrder(selectedOrder);
    const selectedCustomer = customers.find(
      (c) => String(c.id) === selectedOrder?.customerId
    );
    console.log(selectedCustomer, "selectedCustomer");
    setCusomer(selectedCustomer);
    const selectedTechnician = technicians.find(
      (t) => String(t.id) === selectedOrder?.techId
    );
    setTechnician(selectedTechnician);
    // Set the Order state with the selected Order data
  }, [id, orders]);

  if (!order) {
    return <div>Loading...</div>; // Add a loading state or redirect as needed
  }

  return (
    <Box>
      <Header title="Order Details" />

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
            <Typography variant="h6">Order ID : {order.id}</Typography>
            <Typography variant="small">
              {" "}
              Date : {order.creationDate}
            </Typography>
          </Box>
          <Box>
            <Typography variant="p" component="div">
              {order.status === "0" ? (
                <Alert severity="success">{t("NEW")}</Alert>
              ) : order.status === "1" ? (
                <Alert severity="error">{t("CANCELLED")}</Alert>
              ) : order.status === "2" ? (
                <Alert severity="warning">{t("REJECTED")}</Alert>
              ) : order.status === "3" ? (
                <Alert severity="info">{t("ON_WAY")}</Alert>
              ) : order.status === "4" ? (
                <Alert severity="info">{t("IN_PROGRESS")}</Alert>
              ) : order.status === "5" ? (
                <Alert severity="info">{t("PENDING_PAYMENT")}</Alert>
              ) : order.status === "6" ? (
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
            <Box>
              <Typography variant="h6">Customer </Typography>

              <Typography variant="p">
                Name :{orders && order && customer && customer.name}{" "}
              </Typography>
              <br />
              <Typography variant="p">
                Phone :{orders && order && customer && customer.phone}{" "}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <Box>
              <Typography variant="h6">Technician </Typography>

              <Typography variant="p">
                Name :{orders && order && technician && technician.name}{" "}
              </Typography>
              <br />
              <Typography variant="p">
                Phone :{orders && order && technician && technician.phone}{" "}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <Box>
              <Typography variant="h6">Order Info </Typography>

              <Typography variant="p">
                Invoice ID :
                {orders && order && order.invoiceId === null
                  ? "No ID"
                  : order.invoiceId}{" "}
              </Typography>
              <br />
              <Typography variant="p">

              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <Box>
              <Typography variant="h6">Payment Info </Typography>

              <Typography variant="p">
                Invoice ID :
                {orders && order && order.invoiceId === null
                  ? "No ID"
                  : order.invoiceId}{" "}
              </Typography>
              <br />
              <Typography variant="p">
                
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderDetailsPage;
