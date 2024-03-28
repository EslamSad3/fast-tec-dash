// technicianDetailsPage.jsx
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
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";

import Header from "../../Header";
import { useTranslation } from "react-i18next";
import { DataGrid } from "@mui/x-data-grid";

const TechnicianDetailsPage = () => {
  const [t] = useTranslation();
  const { id } = useParams();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  const {
    technicians,
    deletTechnician,
    updateTechnician,
    updateTechnicianLoading,
    deletTechnicianLoading,
    orders,
    refreshData,
  } = useContext(Context);

  const [techOrders, setOrder] = useState(null);
  const [technician, setTechnician] = useState(null);
  const [techRates, setTechRates] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  console.log(technician);
  // Edit
  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  async function handleUpdateTec(status) {
    await updateTechnician(id, status);
    refreshData();
    setOpenEdit(false);
  }

  // Delete
  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  async function handleDeleteTec() {
    await deletTechnician(id);
    refreshData();
    setOpenDelete(false);
  }

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

  const ordersColumns = [
    {
      field: "id",
      headerName: t("Order ID"),
      flex: 0.7,
      minWidth: 50,

      renderCell: (params) => (
        <Link to={`/orders/${params.row?.id}`}>
          <Button variant="contained" color="primary">
            <LinkIcon />
            {params.row?.id}
          </Button>
        </Link>
      ),
    },
    {
      field: "customerId",
      headerName: t("Customer ID"),
      flex: 0.85,
      minWidth: 50,
    },
    {
      field: "status",
      headerName: t("Status"),
      flex: 2,
      minWidth: 250,
      renderCell: (params) => (
        <Box>
          <Typography variant="p" component="div">
            {params && params.row?.status === "0" ? (
              <Alert severity="success">{t("NEW")}</Alert>
            ) : params && params.row?.status === "1" ? (
              <Alert severity="error">{t("CANCELLED")}</Alert>
            ) : params && params.row?.status === "2" ? (
              <Alert severity="warning">{t("REJECTED")}</Alert>
            ) : params && params.row?.status === "3" ? (
              <Alert severity="info">{t("ON_WAY")}</Alert>
            ) : params && params.row?.status === "4" ? (
              <Alert severity="info">{t("IN_PROGRESS")}</Alert>
            ) : params && params.row?.status === "5" ? (
              <Alert severity="info">{t("PENDING_PAYMENT")}</Alert>
            ) : params && params.row?.status === "6" ? (
              <Alert severity="success">{t("COMPLETED")}</Alert>
            ) : params && params.row?.status === "7" ? (
              <Alert severity="error">{t("FAILED PAYMENT")}</Alert>
            ) : (
              "Not Listed"
            )}
          </Typography>
        </Box>
      ),
    },
  ];

  useEffect(() => {
    // Find the technician with the matching id from the URL
    const selectedtechnician = technicians.find((c) => String(c.id) === id);
    // Set the technician state with the selected technician data
    setTechnician(selectedtechnician);
    setTechRates(selectedtechnician && selectedtechnician?.rates);
    // get selected tection orders
    const selectedtechnicianOrders = orders.filter(
      (order) => String(order.techId) === id
    );
    setOrder(selectedtechnicianOrders);
  }, [id, technicians, orders]);

  if (!technician) {
    return <div>Loading...</div>; // Add a loading state or redirect as needed
  }

  return (
    <>
      <Box>
        <Header title={t("Technician Details")} />

        {/* Details */}
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6">
                {t("Technician ID")} : {technician.id}
              </Typography>
              <Typography variant="small">
                {" "}
                {t("Creation Date")} : {technician.created_at}
              </Typography>
              <Typography variant="small">
                {" "}
                {t("last Location Update")} :{" "}
                {technician.lastLocationUpdate === null
                  ? t("Not Defined")
                  : technician.lastLocationUpdate}
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
                {t("Language")} : {t(`${technician.lang}`)}
              </Typography>

              <Typography>
                <Box sx={{ my: "1rem" }}>
                  {technician?.active === true ? (
                    <Alert severity="success">
                      {t("Active")}: {t("Yes")}
                    </Alert>
                  ) : (
                    <Alert severity="error">
                      {t("Active")}: {t("No")}
                    </Alert>
                  )}
                </Box>
              </Typography>

              <Box sx={{ my: "1rem" }}>
                {technician?.online === true ? (
                  <Alert severity="success">
                    {t("Online")}: {t("Yes")}
                  </Alert>
                ) : (
                  <Alert severity="error">
                    {t("Online")}: {t("No")}
                  </Alert>
                )}
              </Box>

              <Box sx={{ my: "1rem" }}>
                {technician?.assigned === true ? (
                  <Alert severity="error">
                    {t("Assigned")}: {t("Yes")}
                  </Alert>
                ) : (
                  <Alert severity="success">
                    {t("Assigned")}: {t("No")}
                  </Alert>
                )}
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
              <Button
                variant="outlined"
                color="error"
                //onClick={() => handleDeleteTec()}
                onClick={() => handleClickOpenDelete()}
              >
                {deletTechnicianLoading ? (
                  <CircularProgress sx={{ color: "#fafafa" }} />
                ) : (
                  t("Delete")
                )}
              </Button>
            </Box>

            <Box>
              {updateTechnicianLoading ? (
                <CircularProgress sx={{ color: "#fafafa" }} />
              ) : (
                <Button
                  variant="outlined"
                  color="success"
                  // onClick={() => handleUpdateTec(!technician.active)}
                  onClick={() => handleClickOpenEdit()}
                >
                  {technician.active === true
                    ? t("Deactivate")
                    : t("Reactivate")}
                </Button>
              )}
            </Box>
          </Box>
        </Box>

        {/* Orders */}
        <Box
          sx={{
            boxShadow: "2px 2px 2px 2px rgba(0,0,0,0.25)",
            mx: "1rem",
            mt: "1rem",
            p: "1.5rem",
            borderRadius: "10px",
          }}
        >
          <Header title={t("Orders")} />
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
              <Typography variant="h6">
                {t("Orders")} : {technician && techOrders.length}
              </Typography>
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
                rows={techOrders || []}
                // loading={fetchAllTechniciansLoading || !techRates}
                getRowId={(row) => row.id}
                columns={ordersColumns}
                pageSizeOptions={[20]}
              />
            </Box>
          </Box>
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
              <Typography variant="h6">
                {t("Over All Rates")} :{" "}
                {technician && Math.ceil(technician?.rateAverage)}
              </Typography>
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
                rows={techRates || []}
                // loading={fetchAllTechniciansLoading || !techRates}
                getRowId={(row) => row.orderId}
                columns={columns}
                pageSizeOptions={[20]}
              />
            </Box>
          </Box>
        </Box>
        {/* Dualogs */}

        {/* edit */}
        <Dialog
          open={openEdit}
          onClose={handleCloseEdit}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {technician.active === true ? t("Deactivate") : t("Reactivate")}
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
              onClick={() => handleUpdateTec(!technician.active)}
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
              onClick={() => handleDeleteTec()}
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

export default TechnicianDetailsPage;
