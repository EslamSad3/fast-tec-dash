// // CustomerDetailsPage.jsx
// import React, { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Context } from "../../../context";
// import {
//   Box,
//   Button,
//   CircularProgress,
//   Dialog,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   DialogActions,
// } from "@mui/material";
// import Header from "../../Header";
// import { useTranslation } from "react-i18next";

// const CustomerDetailsPage = () => {
//   const { id } = useParams(); // Access the id parameter from the URL
//   const [t] = useTranslation();
//   const {
//     customers,
//     updateCustomerLoading,
//     deleteCustomersLoading,
//     updateCustomer,
//     deleteCustomer,
//   } = useContext(Context);
//   const [customer, setCustomer] = useState(null);
//   const [error, setError] = useState(null);

//   console.log(customer);

//   const [openEdit, setOpenEdit] = useState(false);
//   const [openDelete, setOpenDelete] = useState(false);
//   const [openVerfy, setOpenVerfy] = useState(false);

//   // Edit
//   const handleClickOpenEdit = () => {
//     setOpenEdit(true);
//   };
//   const handleCloseEdit = () => {
//     setOpenEdit(false);
//   };
//   const handleClickOpenVerfy = () => {
//     setOpenVerfy(true);
//   };
//   const handleCloseVerfy = () => {
//     setOpenVerfy(false);
//   };
//   //  update Customer
//   async function handleUpdateCus(verified, active) {
//     try {
//       await updateCustomer(id, verified, active);
//       setOpenEdit(false);
//       setOpenVerfy(false);
//     } catch (error) {
//       setError("Failed to update customer. Please try again.");
//       console.error("Error updating customer:", error);
//       setOpenEdit(false);
//       setOpenVerfy(false);
//     }
//   }

//   // Delete
//   const handleClickOpenDelete = () => {
//     setOpenDelete(true);
//   };
//   const handleCloseDelete = () => {
//     setOpenDelete(false);
//   };

//   // Delete Customer
//   async function handleDeleteCus() {
//     try {
//       await deleteCustomer(id);
//       setOpenDelete(false);
//     } catch (error) {
//       setError("Failed to Delete customer. Please try again.");
//       console.error("Error Delete customer:", error);
//       setOpenDelete(false);
//     }
//   }

//   useEffect(() => {
//     // Find the customer with the matching id from the URL
//     const selectedCustomer = customers.find((c) => String(c.id) === id);
//     // Set the customer state with the selected customer dataconst selectedCustomer = customers.find((c) => String(c.id) === id);
//     setCustomer(selectedCustomer);
//   }, [id, customers]);

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (!customer) {
//     return <div>Loading...</div>; // Add a loading state or redirect as needed
//   }

//   return (
//     <Box
//       display={"flex"}
//       justifyContent={"center"}
//       alignItems={"center"}
//       flexDirection={"column"}
//     >
//       <Header title={customer.name} />

//       <p>
//         {t("ID")}: {customer.id}
//       </p>
//       <p>
//         {t("Name")}: {customer.name}
//       </p>
//       <p>
//         {t("Phone")}: {customer.phone}
//       </p>
//       <p>
//         {t("Language")}: {t(`${customer.lang}`)}
//       </p>
//       {/* <p>
//         {t("Verified")}: {customer.verified === true ? t("Yes") : t("No")}
//       </p> */}
//       <p>
//         {t("Active")}: {customer.active === true ? t("Yes") : t("No")}
//       </p>
//       {/* Add more customer details as needed */}
//       {updateCustomerLoading ? (
//         <CircularProgress sx={{ color: "#fafafa" }} />
//       ) : (
//         <Button
//           variant="outlined"
//           color="success"
//           onClick={() => handleClickOpenEdit()}
//         >
//           {customer.active === true ? t("Deactivate") : t("Reactivate")}
//         </Button>
//       )}

//       {/* {updateCustomerLoading ? (
//         <CircularProgress sx={{ color: "#fafafa" }} />
//       ) : (
//         <Button
//           variant="outlined"
//           color="error"
//           // onClick={() => handleUpdateCus(!customer.verified, customer.active)}
//           onClick={() => handleClickOpenVerfy()}
//         >
//           {customer.verified === true ? "Unverfied" : "Verified"}
//         </Button>
//       )} */}

//       {deleteCustomersLoading ? (
//         <CircularProgress sx={{ color: "#fafafa" }} />
//       ) : (
//         <Button
//           variant="contained"
//           color="error"
//           onClick={() => handleClickOpenDelete()}
//         >
//           {t("Delete")}
//         </Button>
//       )}

//       {/* Edit Active */}
//       <Dialog
//         open={openEdit}
//         onClose={handleCloseEdit}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">
//           {customer.active === true ? t("Deactivate") : t("Reactivate")}
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//             {t("Edit")}
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button variant="contained" color="error" onClick={handleCloseEdit}>
//             {t("No")}
//           </Button>
//           <Button
//             variant="contained"
//             color="success"
//             onClick={() => handleUpdateCus(customer.verified, !customer.active)}
//             autoFocus
//           >
//             {t("Yes")}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Edit Verfied */}
//       {/* <Dialog
//         open={openVerfy}
//         onClose={handleCloseVerfy}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">
//           {customer.verified === true ? t("UnVerfied") : t("Verfied")}
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//             {t("Edit")}
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button variant="contained" color="error" onClick={handleCloseVerfy}>
//             {t("No")}
//           </Button>
//           <Button
//             variant="contained"
//             color="success"
//             onClick={() => handleUpdateCus(!customer.verified, customer.active)}
//             autoFocus
//           >
//             {t("Yes")}
//           </Button>
//         </DialogActions>
//       </Dialog> */}

//       {/* Delete */}

//       <Dialog
//         open={openDelete}
//         onClose={handleCloseDelete}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">{t("Delete")}</DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//             {t("Edit")}
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button variant="contained" color="error" onClick={handleCloseDelete}>
//             {t("No")}
//           </Button>
//           <Button
//             variant="contained"
//             color="success"
//             onClick={() => handleDeleteCus()}
//             autoFocus
//           >
//             {t("Yes")}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default CustomerDetailsPage;




// customerDetailsPage.jsx
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

const CustomerDetailsPage = () => {
  const [t] = useTranslation();
  const { id } = useParams();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  const {
    deletcustomer,
    updatecustomer,
    updatecustomerLoading,
    deletcustomerLoading,
    orders,
    customers
  } = useContext(Context);

  const [techOrders, setOrder] = useState(null);
  const [customer, setCustomer] = useState(null);
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
    await updatecustomer(id, status);
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
    await deletcustomer(id);
    setOpenDelete(false);
  }

  useEffect(() => {
    // Find the customer with the matching id from the URL
    const selectedCustomer = customers.find((c) => String(c.id) === id);
    // Set the customer state with the selected customer data
    setCustomer(selectedCustomer);

    // get selected tection orders
    const selectedCustomerOrders = orders.filter(
      (order) => String(order.customerId) === id
    );
    setOrder(selectedCustomerOrders);
  }, [id, customers, orders]);

  console.log(techOrders);
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
              <Box sx={{ my: "1rem" }}>
                {customer.assigned === true ? (
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
              <Button
                variant="outlined"
                color="error"
                //onClick={() => handleDeleteTec()}
                onClick={() => handleClickOpenDelete()}
              >
                {deletcustomerLoading ? (
                  <CircularProgress sx={{ color: "#fafafa" }} />
                ) : (
                  t("Delete")
                )}
              </Button>
            </Box>

            <Box>
              {updatecustomerLoading ? (
                <CircularProgress sx={{ color: "#fafafa" }} />
              ) : (
                <Button
                  variant="outlined"
                  color="success"
                  // onClick={() => handleUpdateTec(!customer.active)}
                  onClick={() => handleClickOpenEdit()}
                >
                  {customer.active === true
                    ? t("Deactivate")
                    : t("Reactivate")}
                </Button>
              )}
            </Box>
          </Box>
        </Box>
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
              <Header title={t("Customer Orders")} />
              <Typography variant="p" mx="20px">
                {t("Number Of Orders")} :
                {customers && customer && orders && techOrders.length}
              </Typography>
            </Box>

            {customers && customer && orders && techOrders ? (
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

        {/* Dualogs */}

        {/* edit */}
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
              onClick={() => handleUpdateTec(!customer.active)}
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

export default CustomerDetailsPage;
