import { Box, Button, Typography, useTheme } from "@mui/material";
import Header from "./../Header";
import { DataGrid } from "@mui/x-data-grid";
import React, { useContext } from "react";
import { Context } from "../../context";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const Customers = () => {
  const { customers, fetchCustomersLoading } = useContext(Context);
  const theme = useTheme();
  const [t] = useTranslation();
  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.1,
    },
    {
      field: "name",
      headerName: t("Name"),
      flex: 0.25,
    },
    {
      field: "phone",
      headerName: t("Phone"),
      flex: 0.35,
    },
    {
      field: "active",
      headerName: t("Active"),
      flex: 0.25,
      renderCell: (params) => {
        return (
          <>
            {params.value === true ? (
              <Typography variant="body1">{t("Yes")}</Typography>
            ) : (
              <Typography variant="body1">{t("No")}</Typography>
            )}
          </>
        );
      },
    },
    {
      field: "verified",
      headerName: t("Verified"),
      flex: 0.25,
      renderCell: (params) => {
        return (
          <>
            {params.value === true ? (
              <Typography variant="body1">{t("Yes")}</Typography>
            ) : (
              <Typography variant="body1">{t("No")}</Typography>
            )}
          </>
        );
      },
    },
    {
      field: "viewDetails",
      headerName: t("View Details"),
      flex: 1,
      renderCell: (params) => (
        <Link to={`/customers/${params.row.id}`}>
          <Button variant="contained" color="primary">
            {t("View Details")}
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
      <Header title={t("Customers")} subtitle={t("List of Customers")} />
      <h4 sx={{ backgroundColor: theme.palette.secondary.main }}>
        {t("Number of customers")} : {customers.length}
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
