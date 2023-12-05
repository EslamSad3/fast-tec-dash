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
} from "@mui/material";
import Header from "../../Header";
import { useTranslation } from "react-i18next";

const TechnicianDetailsPage = () => {
  const [t] = useTranslation();
  const { id } = useParams();

  const {
    technicians,
    deletTechnician,
    updateTechnician,
    updateTechnicianLoading,
    deletTechnicianLoading,
  } = useContext(Context);

  const [technician, setTechnician] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  // Edit
  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  async function handleUpdateTec(status) {
    await updateTechnician(id, status);
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
    setOpenDelete(false);
  }

  useEffect(() => {
    // Find the technician with the matching id from the URL
    const selectedtechnician = technicians.find((c) => String(c.id) === id);
    // Set the technician state with the selected technician data
    setTechnician(selectedtechnician);
  }, [id, technicians]);

  if (!technician) {
    return <div>Loading...</div>; // Add a loading state or redirect as needed
  }

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      <Header title={technician.name} />

      <p>
        {t("ID")}: {technician.id}
      </p>
      <p>
        {t("Name")}: {technician.name}
      </p>
      <p>
        {t("Phone")}: {technician.phone}
      </p>
      <p>
        {t("Active")}: {technician.active === true ? t("Yes") : t("No")}
      </p>

      <Button
        variant="outlined"
        color="error"
        // onClick={() => handleDeleteTec()}
        onClick={() => handleClickOpenDelete()}
      >
        {deletTechnicianLoading ? (
          <CircularProgress sx={{ color: "#fafafa" }} />
        ) : (
          t("Delete")
        )}
      </Button>

      {updateTechnicianLoading ? (
        <CircularProgress sx={{ color: "#fafafa" }} />
      ) : (
        <Button
          variant="outlined"
          color="success"
          // onClick={() => handleUpdateTec(!technician.active)}
          onClick={() => handleClickOpenEdit()}
        >
          {technician.active === true ? t("Deactivate") : t("Reactivate")}
        </Button>
      )}
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
          <Button variant="contained" color="error" onClick={handleCloseDelete}>
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
  );
};

export default TechnicianDetailsPage;
