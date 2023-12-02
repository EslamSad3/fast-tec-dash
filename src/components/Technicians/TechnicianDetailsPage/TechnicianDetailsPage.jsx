// technicianDetailsPage.jsx
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../../context";
import { Box, Button, CircularProgress } from "@mui/material";
import Header from "../../Header";

const TechnicianDetailsPage = () => {
  const { id } = useParams();
  const {
    technicians,
    deletTechnician,
    updateTechnician,
    updateTechnicianLoading,
    deletTechnicianLoading,
  } = useContext(Context);
  const [technician, setTechnician] = useState(null);
  console.log(technician);

  async function handleDeleteTec() {
    await deletTechnician(id);
  }

  async function handleUpdateTec(status) {
    await updateTechnician(id, status);
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

      <p>ID: {technician.id}</p>
      <p>Name: {technician.name}</p>
      <p>Phone: {technician.phone}</p>
      <p>suspended: {technician.suspended === true ? "Yes" : "No"}</p>
      {/* Add more technician details as needed */}
      <Button
        variant="outlined"
        color="error"
        onClick={() => handleDeleteTec()}
      >
        {deletTechnicianLoading ? (
          <CircularProgress sx={{ color: "#fafafa" }} />
        ) : (
          "Delete"
        )}
      </Button>

      {updateTechnicianLoading ? (
        <CircularProgress sx={{ color: "#fafafa" }} />
      ) : (
        <Button
          variant="outlined"
          color="success"
          onClick={() => handleUpdateTec(!technician.suspended)}
        >
          {technician.suspended === true ? "Unsuspend" : "Suspend"}
        </Button>
      )}
    </Box>
  );
};

export default TechnicianDetailsPage;
