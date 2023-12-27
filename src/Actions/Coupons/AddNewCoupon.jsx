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
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function AddNewCoupon() {
  const [t] = useTranslation();
  const { createCoupons, isLoading, refreshData } = useContext(Context);
  const navigate = useNavigate()
  const validationSchema = Yup.object().shape({
    couponCode: Yup.string()
      .required(t("Coupon Name Required"))
      .min(2, t("To Short coupon Name (Min 2)")),
    expires: Yup.date()
      .required(t("Expiration Date Required"))
      .test(
        "not-in-past",
        t("Expiration Date must be in the future"),
        (value) => {
          // Custom validation function to check if the date is not in the past
          const currentDate = new Date();
          return !value || new Date(value) > currentDate;
        }
      ),
    discountValue: Yup.string().required(t("Discount Value Required")),
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
    refreshData()
navigate("/coupons");
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
      <Header title={t("Add New Coupon")}></Header>
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          {/* couponCode */}

          <TextField
            margin="normal"
            required
            fullWidth
            label={t("Coupon Code")}
            value={formik.values.couponCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="couponCode"
            id="couponCode"
          />
          {formik.errors.couponCode && formik.touched.couponCode ? (
            <Alert severity="error">
              <AlertTitle>{t("Error")}</AlertTitle>
              {formik.errors.couponCode}
            </Alert>
          ) : null}

          {/* Expiration Date */}
          <Box sx={{ marginTop: "2rem" }}>
            <label>{t("Expiration Date")}</label>
            <Input
              value={formik.values.expires}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label={t("Coupon Expiration Date")}
              margin="normal"
              required
              fullWidth
              name="expires"
              id="expires"
              type="date"
            />
          </Box>

          {formik.errors.expires && formik.touched.expires  ? (
            <Alert severity="error">
              <AlertTitle>{t("Error")}</AlertTitle>
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
            label={t("Discount Value")}
          />
          {formik.errors.discountValue && formik.touched.discountValue ? (
            <Alert severity="error">
              <AlertTitle>{t("Error")}</AlertTitle>
              {formik.errors.discountValue}
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
