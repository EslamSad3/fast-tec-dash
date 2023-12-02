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
import FlexBetween from "../FlexBetween";
import { useNavigate } from "react-router-dom";
const Technicians = () => {
   const navigate = useNavigate();
  const { technicians, fetchAllTechniciansLoading } = useContext(Context);
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
      flex: 0.45,
    },
    // {
    //   field: "email",
    //   headerName: "Email",
    //   flex: 1,
    // },
    {
      field: "phone",
      headerName: "Phone",
      flex: 0.65,
    },
    {
      field: "online",
      headerName: "Online",
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
      field: "suspended",
      headerName: "Suspended ",
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
        <Link to={`/technicians/${params.row.id}`}>
          <Button variant="contained" color="primary">
            View Details
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Box>
          <Header
            title="Technicians"
            subtitle="See your list of Technicians."
          />
          <small>Number of Technicians : {technicians.length}</small>
        </Box>
        <Button variant="contained" onClick={() => navigate("/addtech")}>
          Add New Technicians
        </Button>
      </FlexBetween>

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
          rows={technicians || []}
          loading={fetchAllTechniciansLoading || !technicians}
          getRowId={(row) => row.id}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Technicians;