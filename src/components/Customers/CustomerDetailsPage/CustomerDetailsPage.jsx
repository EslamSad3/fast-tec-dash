import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
} from "@mui/material";
import Header from "../../Header";
import { useTranslation } from "react-i18next";
import LinkIcon from "@mui/icons-material/Link";
import { DataGrid } from "@mui/x-data-grid";

const CustomerDetailsPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  const {
    deleteCustomer,
    updateCustomer,
    updateCustomerLoading,
    deleteCustomersLoading,
    orders,
    customers,
    refreshData,
    isLoading,  
  } = useContext(Context);

  const [customerRates, setCustomerRates] = useState([]);
  const [custOrders, setOrder] = useState(null);
  const [customer, setCustomer] = useState(null);

  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const theme = useTheme();
  const navigate = useNavigate();

  // Edit
  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  //  update Customer
  async function handleUpdateCus(verified, active) {
    try {
      await updateCustomer(id, verified, active);
      refreshData();
      setOpenEdit(false);
    } catch (error) {
      setOpenEdit(false);
    }
  }

  // Delete
  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  // Delete Customer
  async function handleDeleteCus() {
    try {
      await deleteCustomer(id);
      refreshData();
      setOpenDelete(false);
    } catch (error) {
      setOpenDelete(false);
    }
  }

  // rates
  const columns = [
    {
      field: "orderId",
      headerName: t("Order ID"),
      flex: 0.7,
      minWidth: 50,

      renderCell: (params) => (
        <Link to={`/orders/${params.row.orderId}`}>
          <Button variant="contained" color="primary">
            <LinkIcon />
            {params.row.orderId}
          </Button>
        </Link>
      ),
    },
    {
      field: "rate",
      headerName: t("Order Rate"),
      flex: 0.85,
      minWidth: 50,
    },
    {
      field: "comment",
      headerName: t("Comment"),
      flex: 4,
      minWidth: 250,
    },
  ];

  // orders

  const customerOrders = [
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
    // Find the customer with the matching id from the URL
    const selectedCustomer = customers.find((c) => String(c.id) === id);
    // Set the customer state with the selected customer data
    setCustomer(selectedCustomer);
    setCustomerRates(customer && customer?.rates);
    // get selected tection orders
    const selectedCustomerOrders = orders.filter(
      (order) => String(order.customerId) === id
    );
    setOrder(selectedCustomerOrders);
  }, [id, customers, orders]);

  if (!customer) {
    return <div>Loading...</div>; // Add a loading state or redirect as needed
  }

  return (
    <>
      <Box>
        <Header title={t("Customer Details")} />

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
                {t("Customer ID")} : {customer.id}
              </Typography>
              <Typography variant="small">
                {t("Creation Date")} : {customer.created_at}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "left",
                flexDirection: "column",
              }}
            >
              <Typography variant="body1">
                {t("Language")} : {t(`${customer.lang}`)}
              </Typography>

              <Box sx={{ my: "1rem" }}>
                {customer.active === true ? (
                  <Alert severity="success">
                    {t("Active")}: {t("Yes")}
                  </Alert>
                ) : (
                  <Alert severity="error">
                    {t("Active")}: {t("No")}
                  </Alert>
                )}
              </Box>
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
                <Typography variant="h6">{t("Customer")} </Typography>

                <Typography variant="p">
                  {t("Name")} :
                  {customers && customer && customer && customer.name}{" "}
                </Typography>
                <br />
                <Typography variant="p">
                  {t("Phone")} :
                  {customers && customer && customer && customer.phone}{" "}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Actions */}
        <Box
          sx={{
            boxShadow: "2px 2px 2px 2px rgba(0,0,0,0.25)",
            mx: "1rem",
            mt: "1rem",
            p: "1.5rem",
            borderRadius: "10px",
          }}
        >
          <Header title={t("Actions")} />

          {/* Actions */}

          <Box
            mt="20px"
            mx="20px"
            display="grid"
            gridTemplateColumns="repeat(2, minmax(0, 1fr))"
            justifyContent="center"
            alignItems="center"
            rowGap="5px"
            columnGap="5px"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <Box>
              {deleteCustomersLoading ? (
                <CircularProgress sx={{ color: "#fafafa" }} />
              ) : (
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleClickOpenDelete()}
                >
                  {t("Delete")}
                </Button>
              )}
            </Box>

            <Box>
              {updateCustomerLoading ? (
                <CircularProgress sx={{ color: "#fafafa" }} />
              ) : (
                <Button
                  variant="outlined"
                  color="success"
                  onClick={() => handleClickOpenEdit()}
                >
                  {customer.active === true ? t("Deactivate") : t("Reactivate")}
                </Button>
              )}
            </Box>
          </Box>
        </Box>

        {/* Orders */}

        <Box>
          <Header title={t("Customer Orders")} />
          <Typography variant="p" mx="20px">
            {t("Number Of Orders")} :
            {customers && customer && orders && custOrders.length}
          </Typography>
        </Box>

        {/*  */}
        {/* <Box
          sx={{
            boxShadow: "2px 2px 2px 2px rgba(0,0,0,0.25)",
            mx: "1rem",
            mt: "1rem",
            mb: "1rem",
            p: "1.5rem",
            borderRadius: "10px",
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
              <Header title={t("Customer Orders")} />
              <Typography variant="p" mx="20px">
                {t("Number Of Orders")} :
                {customers && customer && orders && custOrders.length}
              </Typography>
            </Box>

            {customers && customer && orders && custOrders ? (
              <Box
                mt="20px"
                mx="20px"
                display="grid"
                gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                justifyContent="space-between"
                rowGap="20px"
                columnGap="1.33%"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                {customers &&
                  customer &&
                  orders &&
                  custOrders.map((torder) => {
                    return (
                      <>
                        <Card
                          key={torder.id}
                          sx={{
                            backgroundImage: "none",
                            backgroundColor: theme.palette.background.alt,
                            borderRadius: "0.55rem",
                            cursor: "pointer",
                          }}
                          onClick={() => navigate(`/orders/${torder.id}`)}
                        >
                          <CardContent>
                            <Typography
                              sx={{ fontSize: 14 }}
                              color={theme.palette.secondary[200]}
                              gutterBottom
                            >
                              {t("Order ID")} : {torder.id}
                            </Typography>
                            <Typography variant="p" component="div">
                              {`${t("Status")} : `}
                              {torder.status === "0" ? (
                                <Typography
                                  variant="p"
                                  color={theme.palette.success.main}
                                >
                                  {t("NEW")}
                                </Typography>
                              ) : torder.status === "1" ? (
                                <Typography
                                  variant="p"
                                  color={theme.palette.error.main}
                                >
                                  {t("CANCELLED")}
                                </Typography>
                              ) : torder.status === "2" ? (
                                <Typography
                                  variant="p"
                                  color={theme.palette.warning.main}
                                >
                                  {t("REJECTED")}
                                </Typography>
                              ) : torder.status === "3" ? (
                                <Typography
                                  variant="p"
                                  color={theme.palette.info.main}
                                >
                                  {t("ON_WAY")}
                                </Typography>
                              ) : torder.status === "4" ? (
                                <Typography
                                  variant="p"
                                  color={theme.palette.info[300]}
                                >
                                  {t("IN_PROGRESS")}
                                </Typography>
                              ) : torder.status === "5" ? (
                                <Typography
                                  variant="p"
                                  color={theme.palette.warning[600]}
                                >
                                  {t("PENDING_PAYMENT")}
                                </Typography>
                              ) : torder.status === "6" ? (
                                <Typography
                                  variant="p"
                                  color={theme.palette.success[900]}
                                >
                                  {t("COMPLETED")}
                                </Typography>
                              ) : (
                                ""
                              )}
                            </Typography>
                            <Typography variant="body2">
                              {t("Customer ID")} : {torder.customerId}
                            </Typography>
                          </CardContent>
                        </Card>
                      </>
                    );
                  })}
              </Box>
            ) : (
              "Loading ..."
            )}
          </Box>
        </Box> */}

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
            rows={custOrders || []}
            loading={isLoading || !custOrders}
            getRowId={(row) => row.id}
            columns={customerOrders}
          />
        </Box>

        {/* Rates */}
        <Box
          sx={{
            boxShadow: "2px 2px 2px 2px rgba(0,0,0,0.25)",
            mx: "1rem",
            mt: "1rem",
            p: "1.5rem",
            borderRadius: "10px",
          }}
        >
          <Header title={t("Rates")} />
          <Box
            mt="20px"
            mx="20px"
            // display="grid"
            // gridTemplateColumns="repeat(2, minmax(0, 1fr))"
            // justifyContent="center"
            // alignItems="center"
            // Gap="1rem"
            textAlign={"center"}
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <Box>
              {/*
              <Typography variant="h6">
                {t("Over All Rates")} :{" "}
                {customerRates && Math.ceil(customerRates?.rateAverage)}
              </Typography> 
              */}
            </Box>

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
                rows={customerRates || []}
                // loading={fetchAllTechniciansLoading || !techRates}
                getRowId={(row) => row?.orderId}
                columns={columns}
              />
            </Box>
          </Box>
        </Box>

        {/* Dualogs */}

        {/* Edit Active */}
        <Dialog
          open={openEdit}
          onClose={handleCloseEdit}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {customer.active === true ? t("Deactivate") : t("Reactivate")}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {t("Edit")}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="error" onClick={handleCloseEdit}>
              {t("No")}
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() =>
                handleUpdateCus(customer.verified, !customer.active)
              }
              autoFocus
            >
              {t("Yes")}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete */}

        <Dialog
          open={openDelete}
          onClose={handleCloseDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{t("Delete")}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {t("Edit")}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="error"
              onClick={handleCloseDelete}
            >
              {t("No")}
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => handleDeleteCus()}
              autoFocus
            >
              {t("Yes")}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default CustomerDetailsPage;
