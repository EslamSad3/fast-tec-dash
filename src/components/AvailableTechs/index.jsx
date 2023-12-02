import {
  Box,
  Button,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "./../Header";
import { DataGrid } from "@mui/x-data-grid";
import React, { useContext } from "react";
import { Context } from "../../context";
import { Link } from "react-router-dom";

const Availtechnicians = () => {
  const { availableTechnicians, fetchAvailableTechniciansLoading } = useContext(Context);
  const theme = useTheme();

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.75,
    },
    // {
    //   field: "email",
    //   headerName: "Email",
    //   flex: 1,
    // },
    {
      field: "phone",
      headerName: "Phone",
      flex: 0.35,
    },
    {
      field: "online",
      headerName: "Online",
      flex: 0.25,
      renderCell: (params) => {
        console.log(params);
        return (
          <>
            {params.value === true ? (
              <Typography variant="body1">Yes</Typography>
            ) : (
              <Typography variant="body1">No</Typography>
            )}
          </>
        );
      },
    },
    {
      field: "suspended ",
      headerName: "Suspended ",
      flex: 0.25,
      renderCell: (params) => {
        return (
          <>
            {params.value === true ? (
              <Typography variant="body1">Yes</Typography>
            ) : (
              <Typography variant="body1">No</Typography>
            )}
          </>
        );
      },
    },
    {
      field: "assigned  ",
      headerName: "Assigned  ",
      flex: 0.25,
      renderCell: (params) => {
        return (
          <>
            {params.value === true ? (
              <Typography variant="body1">Yes</Typography>
            ) : (
              <Typography variant="body1">No</Typography>
            )}
          </>
        );
      },
    },
    {
      field: "viewDetails",
      headerName: "View Details",
      flex: 1,
      renderCell: (params) => (
        <Link to={`/availableTechnicians/${params.row.id}`}>
          <Button variant="contained" color="primary">
            View Details
          </Button>
        </Link>
      ),
    },

  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Available Technicians"
        subtitle="List of Available Technicians"
      />
      <h4 sx={{ backgroundColor: theme.palette.secondary.main }}>
        Number of Available Technicians : {availableTechnicians.length}
      </h4>
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
          padding="2rem"
          rows={availableTechnicians || []}
          loading={fetchAvailableTechniciansLoading || !availableTechnicians}
          getRowId={(row) => row.id}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Availtechnicians;