import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import Header from "./../Header";
import { DataGrid } from "@mui/x-data-grid";
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../context";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const FetchCompletedOrders = () => {
  const { completedOrders, customers, refreshData, isLoading } =
    useContext(Context);
  const theme = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [searchPhone, setSearchPhone] = useState("");

  const handleViewDetails = (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  const getCustomerName = (customerId) => {
    const customer = customers.find((cust) => cust.id === customerId);
    return customer ? customer.name : t("Unknown Customer");
  };

  const getCustomerPhone = (customerId) => {
    const customer = customers.find((cust) => cust.id === customerId);
    return customer ? customer.phone : "";
  };

  const filteredOrders = completedOrders.filter((order) => {
    const customerPhone = getCustomerPhone(order.customerId);
    return customerPhone.includes(searchPhone);
  });

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
      field: "customerName",
      headerName: t("Customer Name"),
      flex: 1,
      minWidth: 200,
      valueGetter: (params) => getCustomerName(params.row.customerId),
    },
    {
      field: "customerPhone",
      headerName: t("Customer Phone"),
      flex: 1,
      minWidth: 200,
      valueGetter: (params) => getCustomerPhone(params.row.customerId),
    },
    {
      field: "viewDetails",
      headerName: t("View Details"),
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleViewDetails(params.row.id)}
        >
          {t("View Details")}
        </Button>
      ),
    },
  ];

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title={t("Completed Orders")}
      />
      <TextField
        label={t("Search by Customer Phone")}
        variant="outlined"
        fullWidth
        value={searchPhone}
        onChange={(e) => setSearchPhone(e.target.value)}
        sx={{ marginBottom: "1.5rem" }}
      />
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
          rows={filteredOrders || []}
          loading={isLoading || !completedOrders}
          getRowId={(row) => row.id}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default FetchCompletedOrders;
