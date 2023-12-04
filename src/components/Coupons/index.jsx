// import { Box } from "@mui/material";
// import Header from "./../Header";
// import { DataGrid } from "@mui/x-data-grid";
// import React, { useContext } from "react";
// import { Context } from "../../context";

// const Coupons = () => {
//   const { allCoupons, isLoading } = useContext(Context);
//   console.log(allCoupons);

//   const columns = [
//     {
//       field: "id",
//       headerName: "ID",
//       flex: 1,
//     },
//     {
//       field: "couponCode",
//       headerName: "Code",
//       flex: 0.5,
//     },
//     {
//       field: "expires",
//       headerName: "Expires",
//       flex: 0.5,
//     },
//     {
//       field: "active",
//       headerName: "Active",
//       flex: 0.4,
//       renderCell: (params) =>  <Box>{(params.formattedValue = "1" ? "Yes" : "No")}</Box>,
//     },
//     {
//       field: "discountValue",
//       headerName: "Discount Value",
//       flex: 1,
//     },
//   ];

//   return (
//     <Box m="1.5rem 2.5rem">
//       <Header title="Coupons" subtitle="List of Coupons" />
//       <h4>Number of Coupons : {allCoupons.length}</h4>
//       <Box
//         mt="40px"
//         height="75vh"
//         sx={{
//           "& .MuiDataGrid-root": {
//             border: "none",
//           },
//           "& .MuiDataGrid-cell": {
//             borderBottom: "none",
//           },
//           "& .MuiDataGrid-columnHeaders": {
//             backgroundColor: "",
//             color: "",
//             borderBottom: "none",
//           },
//           "& .MuiDataGrid-virtualScroller": {
//             backgroundColor: "",
//           },
//           "& .MuiDataGrid-footerContainer": {
//             backgroundColor: "",
//             color: "",
//             borderTop: "none",
//           },
//           "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
//             color: ` !important`,
//           },
//         }}
//       >
//         <DataGrid
//           rows={allCoupons || []}
//           loading={isLoading || !allCoupons}
//           getRowId={(row) => row.id}
//           columns={columns}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default Coupons;

import { Box, Button, Typography, useTheme } from "@mui/material";
import Header from "./../Header";
import { DataGrid } from "@mui/x-data-grid";
import React, { useContext } from "react";
import { Context } from "../../context";
import { Link } from "react-router-dom";
import FlexBetween from "../FlexBetween";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Coupons = () => {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const { allCoupons, isLoading } = useContext(Context);
  const theme = useTheme();

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.25,
    },
    {
      field: "couponCode",
      headerName: t("Code"),
      flex: 0.5,
    },
    {
      field: "expires",
      headerName: t("Expires"),
      flex: 0.5,
    },
    {
      field: "active",
      headerName: t("Active"),
      flex: 0.4,
      renderCell: (params) => (
        <Box>{(params.formattedValue = "1" ? t("Yes") : t("No"))}</Box>
      ),
    },
    {
      field: "discountValue",
      headerName: t("Discount Value"),
      flex: 0.5,
    },
    {
      field: "viewDetails",
      headerName: t("View Details"),
      flex: 1,
      renderCell: (params) => (
        <Link to={`/coupons/${params.row.id}`}>
          <Button variant="contained" color="primary">
            {t("View Details")}
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Box>
          <Header title={t("Coupons")} subtitle={t("list of Coupons")} />
          <small>{t("Number of Coupons")} : {allCoupons.length}</small>
        </Box>
        <Button variant="contained" onClick={() => navigate("/addCoupons")}>
          {t("Add New Coupon")}
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
