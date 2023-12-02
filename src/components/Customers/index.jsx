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
const Customers = () => {
  const { customers, fetchCustomersLoading } = useContext(Context);
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
      flex: 0.25,
    },
    // {
    //   field: "phone",
    //   headerName: "Phone",
    //   flex: 1,
    // },
    {
      field: "phone",
      headerName: "Phone",
      flex: 0.35,
    },
    {
      field: "active",
      headerName: "Active",
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
      field: "verified",
      headerName: "Verified",
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
        <Link to={`/customers/${params.row.id}`}>
          <Button variant="contained" color="primary">
            View Details
          </Button>
        </Link>
      ),
    },

    // {
    //   field: "role",
    //   headerName: "Role",
    //   flex: 0.5,
    // },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="customers" subtitle="List of Customers" />
      <h4 sx={{ backgroundColor: theme.palette.secondary.main }}>
        Number of customers : {customers.length}
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
          rows={customers || []}
          loading={fetchCustomersLoading || !customers}
          getRowId={(row) => row.id}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Customers;
