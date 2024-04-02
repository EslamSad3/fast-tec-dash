import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
  Alert,
} from "@mui/material";
import Header from "../Header";
import { useContext } from "react";
import { Context } from "../../context";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

function Orders() {
  const navigate = useNavigate();
  const { orders, isLoading, refreshData } = useContext(Context);
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();
  const [t] = useTranslation();
  const columns = [
    {
      field: "id",
      headerName: t("Order ID"),
      flex: 0.5,
      maxWidth: 150,
    },
    {
      field: "customerId",
      headerName: t("Customer ID"),
      flex: 0.5,
      minWidth: 150,
    },
    {
      field: "status",
      headerName: t("Status"),
      flex: 0.5,
      minWidth: 150,
      renderCell: (params) => (
        <Box>
          <Typography variant="p" component="div">
            {params.row.status === "0" ? (
              <Alert severity="success">{t("NEW")}</Alert>
            ) : params.row.status === "1" ? (
              <Alert severity="error">{t("CANCELLED")}</Alert>
            ) : params.row.status === "2" ? (
              <Alert severity="warning">{t("REJECTED")}</Alert>
            ) : params.row.status === "3" ? (
              <Alert severity="info">{t("ON_WAY")}</Alert>
            ) : params.row.status === "4" ? (
              <Alert severity="info">{t("IN_PROGRESS")}</Alert>
            ) : params.row.status === "5" ? (
              <Alert severity="info">{t("PENDING_PAYMENT")}</Alert>
            ) : params.row.status === "6" ? (
              <Alert severity="success">{t("COMPLETED")}</Alert>
            ) : params.row.status === "7" ? (
              <Alert severity="error">{t("FAILED PAYMENT")}</Alert>
            ) : (
              "Not Listed"
            )}
          </Typography>
        </Box>
      ),
    },
    {
      field: "viewDetails",
      headerName: t("View Details"),
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <Link to={`/orders/${params.row.id}`}>
          <Button variant="contained" color="primary">
            {t("View Details")}
          </Button>
        </Link>
      ),
    },
  ];

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title={t("Orders")} subtitle={t("list of Orders")} />
      <small>
        {t("Number Of Orders")} : {orders.length}
      </small>
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          initialState={{
            sorting: { sortModel: [{ field: "id", sort: "desc" }] },
          }}
          rows={orders || []}
          loading={isLoading || !orders}
          getRowId={(row) => row.id}
          columns={columns}
        />
      </Box>
    </Box>
  );
}

export default Orders;
