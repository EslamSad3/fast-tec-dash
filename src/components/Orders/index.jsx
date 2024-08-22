import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  Tabs,
  Tab,
  TextField,
  useTheme,
  Alert,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../Header";
import { Context } from "../../context";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";

function Orders() {
  const { orders, customers, isLoading, refreshData } = useContext(Context);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchPhone, setSearchPhone] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    refreshData();
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tab = queryParams.get("tab");
    if (tab !== null) {
      setSelectedTab(Number(tab));
    }
  }, [location.search]);

  useEffect(() => {
    let filtered = orders;

    // Filter by selected tab
    switch (selectedTab) {
      case 1:
        filtered = orders.filter((order) => order.status === "8"); // No Tech Assigned
        break;
      case 2:
        filtered = orders.filter(
          (order) => order.status === "0" || order.status === "9"
        ); // New Orders and Assigned by Admin
        break;
      case 3:
        filtered = orders.filter((order) => order.status === "3"); // On Way
        break;
      case 4:
        filtered = orders.filter((order) => order.status === "4"); // In Progress
        break;
      case 5:
        filtered = orders.filter((order) => order.status === "5"); // Pending Payment
        break;
      case 6:
        filtered = orders.filter((order) => order.status === "7"); // Failed Payment
        break;
      case 7:
        filtered = orders.filter((order) => order.status === "2"); // Rejected
        break;
      default:
        filtered = orders;
    }

    // Filter by phone number
    if (searchPhone) {
      filtered = filtered.filter((order) => {
        const customer = customers.find((cust) => cust.id === order.customerId);
        return customer?.phone.includes(searchPhone);
      });
    }

    setFilteredOrders(filtered);
  }, [orders, selectedTab, searchPhone, customers]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    navigate(`?tab=${newValue}`);
  };

  const handleViewDetails = (orderId) => {
    navigate(`/orders/${orderId}?tab=${selectedTab}`);
  };

  const getCustomerName = (customerId) => {
    const customer = customers.find((cust) => cust.id === customerId);
    return customer ? customer.name : t("Unknown Customer");
  };

  const getCustomerPhone = (customerId) => {
    const customer = customers.find((cust) => cust.id === customerId);
    return customer ? customer.phone : "";
  };

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
      field: "status",
      headerName: t("Status"),
      flex: 0.5,
      minWidth: 150,
      renderCell: (params) => (
        <Box>
          <Typography variant="body1" component="div">
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
            ) : params.row.status === "8" ? (
              <Alert severity="info">{t("No tech assigned")}</Alert>
            ) : params.row.status === "9" ? (
              <Alert severity="success">{t("Assigned by Admin")}</Alert>
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

  return (
    <Box m="1.5rem 2.5rem">
      <Header title={t("Orders")} />
      <TextField
        label={t("Search by Customer Phone")}
        variant="outlined"
        fullWidth
        value={searchPhone}
        onChange={(e) => setSearchPhone(e.target.value)}
        sx={{ marginBottom: "1.5rem" }}
      />
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        aria-label="order status tabs"
      >
        <Tab label={t("All Orders")} />
        <Tab label={t("No Tech Assigned")} />
        <Tab label={t("New")} />
        <Tab label={t("On Way")} />
        <Tab label={t("In Progress")} />
        <Tab label={t("Pending Payment")} />
        <Tab label={t("Failed Payment")} />
        <Tab label={t("Rejected")} />
      </Tabs>
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
          rows={filteredOrders || []}
          loading={isLoading || !orders}
          getRowId={(row) => row.id}
          columns={columns}
        />
      </Box>
    </Box>
  );
}

export default Orders;
