import { Box, Button, Typography, useTheme } from "@mui/material";
import Header from "./../Header";
import { DataGrid } from "@mui/x-data-grid";
import React, { useContext } from "react";
import { Context } from "../../context";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const Availtechnicians = () => {
  const [t] = useTranslation();
  const {
    availableTechnicians,
    fetchAvailableTechniciansLoading,
    refreshData,
  } = useContext(Context);
  const theme = useTheme();

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.1,
    },
    {
      field: "name",
      headerName: t("Name"),
      flex: 1,
      minWidth: 150,
    },
    {
      field: "phone",
      headerName: t("Phone"),
      flex: 1,
      minWidth: 100,
    },
    {
      field: "online",
      headerName: t("Online"),
      flex: 0.25,
      renderCell: (params) => {
        console.log(params);
        return (
          <>
            {params.value === true ? (
              <Typography variant="body1">{t("Yes")}</Typography>
            ) : (
              <Typography variant="body1">No</Typography>
            )}
          </>
        );
      },
    },
    {
      field: "suspended",
      headerName: t("Suspended"),
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
      field: "assigned",
      headerName: t("Assigned"),
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
      minWidth: 100,
      renderCell: (params) => (
        <Link to={`/availableTechnicians/${params.row.id}`}>
          <Button variant="contained" color="primary">
            {t("View Details")}
          </Button>
        </Link>
      ),
    },
  ];

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title={t("Available Technicians")}
        subtitle={t("List of Available Technicians")}
      />
      <h4 sx={{ backgroundColor: theme.palette.secondary.main }}>
        {t("Number of Available Technicians")} : {availableTechnicians.length}
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
