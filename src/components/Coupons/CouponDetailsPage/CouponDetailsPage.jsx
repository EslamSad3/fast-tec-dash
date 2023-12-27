import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../../context";
import { Box } from "@mui/material";
import Header from "../../Header";

const CouponDetailsPage = () => {
  const { id } = useParams(); // Access the id parameter from the URL
  const { allCoupons, refreshData } = useContext(Context);
  const [coupon, setCoupon] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Find the customer with the matching id from the URL
    const selectedCoupon = allCoupons.find((c) => String(c.id) === id);
    // Set the customer state with the selected customer data
    setCoupon(selectedCoupon);
    refreshData()
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
      
    </Box>
  );
};

export default CouponDetailsPage;
