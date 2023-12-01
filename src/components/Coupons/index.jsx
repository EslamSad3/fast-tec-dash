import { Box } from "@mui/material";
import Header from "./../Header";
import { DataGrid } from "@mui/x-data-grid";
import React, { useContext, useState } from "react";
import { Context } from "../../context";

const Coupons = () => {
  const { allCoupons, isLoading } = useContext(Context);
  console.log(allCoupons);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "couponCode",
      headerName: "Code",
      flex: 0.5,
    },
    // {
    //   field: "phone",
    //   headerName: "Phone",
    //   flex: 1,
    // },
    {
      field: "expires",
      headerName: "Expires",
      flex: 0.5,
    },
    {
      field: "active",
      headerName: "Active",
      flex: 0.4,
      renderCell: (params) =>  <Box>{(params.formattedValue = "1" ? "Yes" : "No")}</Box>,
    },
    {
      field: "discountValue",
      headerName: "Discount Value",
      flex: 1,
    },
    // {
    //   field: "role",
    //   headerName: "Role",
    //   flex: 0.5,
    // },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Coupons" subtitle="List of Coupons" />
      <h4>Number of Coupons : {allCoupons.length}</h4>
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
            backgroundColor: "",
            color: "",
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "",
            color: "",
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: ` !important`,
          },
        }}
      >
        <DataGrid
          rows={allCoupons || []}
          loading={isLoading || !allCoupons}
          getRowId={(row) => row.id}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Coupons;
