// CustomerDetailsPage.jsx
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../../context";
import { Box, Button, CircularProgress } from "@mui/material";
import Header from "../../Header";

const CouponDetailsPage = () => {
  const { id } = useParams(); // Access the id parameter from the URL
  const {
    allCoupons,
  } = useContext(Context);
  const [coupon, setCoupon] = useState(null);
  const [error, setError] = useState(null);

  // //  update Customer
  // async function handleUpdateCus(verified, active) {
  //   try {
  //     await updateCustomer(id, verified, active);
  //   } catch (error) {
  //     setError("Failed to update customer. Please try again.");
  //     console.error("Error updating customer:", error);
  //   }
  // }

  // // Delete Customer
  // async function handleDeleteCus() {
  //   try {
  //     await deleteCustomer(id);
  //   } catch (error) {
  //     setError("Failed to Delete customer. Please try again.");
  //     console.error("Error Delete customer:", error);
  //   }
  // }

  useEffect(() => {
    // Find the customer with the matching id from the URL
    const selectedCoupon = allCoupons.find((c) => String(c.id) === id);
    // Set the customer state with the selected customer data
    setCoupon(selectedCoupon);
  }, [id, allCoupons]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!coupon) {
    return <div>Loading...</div>; // Add a loading state or redirect as needed
  }

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      <Header title={coupon.couponCode} />

      <p>ID: {coupon.id}</p>
      <p>Expires At : {coupon.expires}</p>
      <p>Discount Value: {coupon.discountValue}</p>
      <p>Active: {coupon.active === '1' ? "yes" : "no"}</p>
      {/* Add more customer details as needed */}
      {/* {updateCustomerLoading ? (
        <CircularProgress sx={{ color: "#fafafa" }} />
      ) : (
        <Button
          variant="outlined"
          color="success"
          onClick={() => handleUpdateCus(customer.verified, !customer.active)}
        >
          {customer.active === true ? "Deactivate" : "Reactivate"}
        </Button>
      )}

      {updateCustomerLoading ? (
        <CircularProgress sx={{ color: "#fafafa" }} />
      ) : (
        <Button
          variant="outlined"
          color="error"
          onClick={() => handleUpdateCus(!customer.verified, customer.active)}
        >
          {customer.verified === true ? "Unverfied" : "Verified"}
        </Button>
      )}

      {deleteCustomersLoading ? (
        <CircularProgress sx={{ color: "#fafafa" }} />
      ) : (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDeleteCus()}
        >
          Delete
        </Button>
      )} */}
    </Box>
  );
};

export default CouponDetailsPage;
