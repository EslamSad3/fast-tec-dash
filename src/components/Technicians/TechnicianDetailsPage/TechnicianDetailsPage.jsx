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
  Card,
  CardContent,
} from "@mui/material";
import Header from "../../Header";
import { useTranslation } from "react-i18next";
import LinkIcon from "@mui/icons-material/Link";
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
    fetchAllTechniciansLoading,
  } = useContext(Context);

  const [techOrders, setOrder] = useState(null);
  const [technician, setTechnician] = useState(null);
  const [techRates, setTechRates] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
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

  useEffect(() => {
    // Find the technician with the matching id from the URL
    const selectedtechnician = technicians.find((c) => String(c.id) === id);
    // Set the technician state with the selected technician data
    setTechnician(selectedtechnician);
    setTechRates(technician && technician?.rates);
    // get selected tection orders
    const selectedtechnicianOrders = orders.filter(
      (order) => String(order.techId) === id
    );
    setOrder(selectedtechnicianOrders);
  }, [id, technicians, orders,techRates]);


  console.log(technician, "technician");

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
            <Box>
              <Typography variant="h6">
                {t("Technician ID")} : {technician.id}
              </Typography>
              <Typography variant="small">
                {" "}
                {t("Creation Date")} : {technician.created_at}
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

              <Box sx={{ my: "1rem" }}>
                {technician.active === true ? (
                  <Alert severity="success">
                    {t("Active")}: {t("Yes")}
                  </Alert>
                ) : (
                  <Alert severity="error">
                    {t("Active")}: {t("No")}
                  </Alert>
                )}
              </Box>
              <Box sx={{ my: "1rem" }}>
                {technician.assigned === true ? (
                  <Alert severity="success">
                    {t("Assigned")}: {t("No")}
                  </Alert>
                ) : (
                  <Alert severity="error">
                    {t("Assigned")}: {t("Yes")}
                  </Alert>
                )}
              </Box>
            </Box>
          </Box>
          {/* Rates

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
                <Typography variant="h6">{t("Technician")} </Typography>

                <Typography variant="p">
                  {t("Name")} :
                  {technicians && technician && technician && technician.name}{" "}
                </Typography>
                <br />
                <Typography variant="p">
                  {t("Phone")} :
                  {technicians && technician && technician && technician.phone}{" "}
                </Typography>
              </Box>
            </Box>
          </Box> */}
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
              <Header title={t("Technician Orders")} />
              <Typography variant="p" mx="20px">
                {t("Number Of Orders")} :
                {technicians && technician && orders && techOrders.length}
              </Typography>
            </Box>

            {technicians && technician && orders && techOrders ? (
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
                {technicians &&
                  technician &&
                  orders &&
                  techOrders.map((torder) => {
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
