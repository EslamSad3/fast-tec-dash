import React, { useContext } from "react";
import { useFormik } from "formik";
import { Context } from "../../context";

import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  FormControl,
  Input,
  TextField,
} from "@mui/material";
import Header from "../../components/Header";
import * as Yup from "yup";

function AddNewCoupon() {
  const { createCoupons, isLoading } = useContext(Context);
  const validationSchema = Yup.object().shape({
    couponCode: Yup.string()
      .required("coupon Name Required")
      .min(2, "To Short coupon Name (Min 2)"),
    expires: Yup.date().required("Expiration Date Required"),
    discountValue: Yup.string().required("Discount Value Required"),
  });

  let formik = useFormik({
    initialValues: {
      couponCode: "",
      expires: "",
      discountValue: "",
    },
    validationSchema,
    onSubmit: hanldeAddNewCoupons,
  });

  async function hanldeAddNewCoupons() {
    await createCoupons(formik.values);
    console.log(formik.values);
  }

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Header title="Add New Coupon"></Header>
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          {/* couponCode */}

          <TextField
            margin="normal"
            required
            fullWidth
            label="Coupon Code"
            value={formik.values.couponCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="couponCode"
            id="couponCode"
          />
          {formik.errors.couponCode && formik.touched.couponCode ? (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {formik.errors.couponCode}
            </Alert>
          ) : null}

          {/* Expiration Date */}
          <Box sx={{ marginTop: "2rem" }}>
            <label>Expiration Date</label>
            <Input
              value={formik.values.expires}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Coupon Expiration Date"
              margin="normal"
              required
              fullWidth
              name="expires"
              id="expires"
              type="date"
            />
          </Box>

          {formik.errors.expires && formik.touched.expires ? (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {formik.errors.expires}
            </Alert>
          ) : null}

          {/* discountValue */}

          <TextField
            value={formik.values.discountValue}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="number"
            name="discountValue"
            id="discountValue"
            margin="normal"
            required
            fullWidth
            label="Discount Value"
          />
          {formik.errors.discountValue && formik.touched.discountValue ? (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {formik.errors.password}
            </Alert>
          ) : null}

          <Button
            disabled={!(formik.isValid && formik.dirty)}
            variant="contained"
            sx={{ marginY: "20px" }}
            type="submit"
          >
            {isLoading ? <CircularProgress color="success" /> : "Add"}
          </Button>
        </FormControl>
      </form>
    </Box>
  );
}

export default AddNewCoupon;
