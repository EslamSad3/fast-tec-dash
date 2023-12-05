// CustomerDetailsPage.jsx
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../../context";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import Header from "../../Header";
import { useTranslation } from "react-i18next";

const CustomerDetailsPage = () => {
  const { id } = useParams(); // Access the id parameter from the URL
  const [t] = useTranslation();
  const {
    customers,
    updateCustomerLoading,
    deleteCustomersLoading,
    updateCustomer,
    deleteCustomer,
  } = useContext(Context);
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState(null);

  console.log(customer);

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openVerfy, setOpenVerfy] = useState(false);

  // Edit
  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const handleClickOpenVerfy = () => {
    setOpenVerfy(true);
  };
  const handleCloseVerfy = () => {
    setOpenVerfy(false);
  };
  //  update Customer
  async function handleUpdateCus(verified, active) {
    try {
      await updateCustomer(id, verified, active);
      setOpenEdit(false);
      setOpenVerfy(false);
    } catch (error) {
      setError("Failed to update customer. Please try again.");
      console.error("Error updating customer:", error);
      setOpenEdit(false);
      setOpenVerfy(false);
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
      setOpenDelete(false);
    } catch (error) {
      setError("Failed to Delete customer. Please try again.");
      console.error("Error Delete customer:", error);
      setOpenDelete(false);
    }
  }

  useEffect(() => {
    // Find the customer with the matching id from the URL
    const selectedCustomer = customers.find((c) => String(c.id) === id);
    // Set the customer state with the selected customer data
    setCustomer(selectedCustomer);
  }, [id, customers]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!customer) {
    return <div>Loading...</div>; // Add a loading state or redirect as needed
  }

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      <Header title={customer.name} />

      <p>
        {t("ID")}: {customer.id}
      </p>
      <p>
        {t("Name")}: {customer.name}
      </p>
      <p>
        {t("Phone")}: {customer.phone}
      </p>
      <p>
        {t("Language")}: {t(`${customer.lang}`)}
      </p>
      {/* <p>
        {t("Verified")}: {customer.verified === true ? t("Yes") : t("No")}
      </p> */}
      <p>
        {t("Active")}: {customer.active === true ? t("Yes") : t("No")}
      </p>
      {/* Add more customer details as needed */}
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

      {/* {updateCustomerLoading ? (
        <CircularProgress sx={{ color: "#fafafa" }} />
      ) : (
        <Button
          variant="outlined"
          color="error"
          // onClick={() => handleUpdateCus(!customer.verified, customer.active)}
          onClick={() => handleClickOpenVerfy()}
        >
          {customer.verified === true ? "Unverfied" : "Verified"}
        </Button>
      )} */}

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
            onClick={() => handleUpdateCus(customer.verified, !customer.active)}
            autoFocus
          >
            {t("Yes")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Verfied */}
      {/* <Dialog
        open={openVerfy}
        onClose={handleCloseVerfy}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {customer.verified === true ? t("UnVerfied") : t("Verfied")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t("Edit")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleCloseVerfy}>
            {t("No")}
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleUpdateCus(!customer.verified, customer.active)}
            autoFocus
          >
            {t("Yes")}
          </Button>
        </DialogActions>
      </Dialog> */}

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
          <Button variant="contained" color="error" onClick={handleCloseDelete}>
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
  );
};

export default CustomerDetailsPage;
