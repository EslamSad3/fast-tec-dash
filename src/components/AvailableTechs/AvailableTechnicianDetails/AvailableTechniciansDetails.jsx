// technicianDetailsPage.jsx
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../../context";
import { Box } from "@mui/material";
import Header from "../../Header";

const TechnicianDetailsPage = () => {
  const { id } = useParams(); // Access the id parameter from the URL
  const { availableTechnicians } = useContext(Context);
  const [technician, setTechnician] = useState(null);

  useEffect(() => {
    // Find the technician with the matching id from the URL
    const selectedtechnician = availableTechnicians.find(
      (c) => String(c.id) === id
    );

    // Set the technician state with the selected technician data
    setTechnician(selectedtechnician);
  }, [id, availableTechnicians]);

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
      {/* Add more technician details as needed */}
    </Box>
  );
};

export default TechnicianDetailsPage;
