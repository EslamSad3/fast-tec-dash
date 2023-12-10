// technicianDetailsPage.jsx
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../../context";
import { Box, Typography, Alert, useTheme, useMediaQuery } from "@mui/material";
import Header from "../../Header";
import { useTranslation } from "react-i18next";
const OrderDetailsPage = () => {
  const [t] = useTranslation();
  const { id } = useParams();
  const theme = useTheme();
  const { orders, customers, technicians } = useContext(Context);
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const navigate = useNavigate();
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
  }, [id, orders, customers]);

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
              {t("Order ID")} : {order.id}
            </Typography>
            <Typography variant="small">
              {" "}
              {t("Date")} : {order.creationDate}
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
            {/* Customer */}
            {orders && order && customers && customer ? (
              <Box
                sx={{
                  boxShadow: "2px 2px 2px 2px rgba(0,0,0,0.25)",
                  borderRadius: "10px",
                  cursor: "pointer",
                  p: "1rem",
                }}
                onClick={() => navigate(`/customers/${customer.id}`)}
              >
                <Typography variant="h6">{t("Customer")} </Typography>

                <Typography variant="p">
                  {t("Name")} :{orders && order && customer && customer.name}
                </Typography>
                <br />
                <Typography variant="p">
                  {t("Phone")} :{orders && order && customer && customer.phone}
                </Typography>
              </Box>
            ) : (
              <Typography variant="h6">{t("Customer Not Found")} </Typography>
            )}
          </Box>
          {/* Tec */}
          {orders && order && technicians && technician ? (
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
                onClick={() => navigate(`/technicians/${technician.id}`)}
              >
                <Typography variant="h6">{t("Technician")} </Typography>

                <Typography variant="p">
                  {t("Name")} :
                  {orders && order && technician && technician.name}{" "}
                </Typography>
                <br />
                <Typography variant="p">
                  {t("Phone")} :
                  {orders && order && technician && technician.phone}{" "}
                </Typography>
              </Box>
            </Box>
          ) : (
            <Typography variant="h6">{t("Technician Not Found")} </Typography>
          )}

          {/* invoice */}

          {orders && order && order.invoiceId ? (
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
                  {orders && order && order.invoiceId === null
                    ? t("No ID")
                    : order.invoiceId}{" "}
                </Typography>
              </Box>
            </Box>
          ) : (
            <Typography variant="p">{t("No ID")}</Typography>
          )}

          {/* Paymnet */}
          {orders && order && order.paymentInfo ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
              }}
            >
              <Box>
                <Typography variant="h6">{t("Payment Info")} </Typography>

                <Typography variant="p">
                  {t("Invoice ID")} :
                  {orders && order && order.paymentInfo === null
                    ? t("No ID")
                    : order.paymentInfo}
                </Typography>
              </Box>
            </Box>
          ) : (
            <Typography variant="h6">{t("No ID")} </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default OrderDetailsPage;
