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
  TextField,
} from "@mui/material";
import Header from "../../components/Header";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

function ChangeTechPassword() {
  const { id } = useParams();
  const [t] = useTranslation();
  const { changeTechPassword, isLoading } = useContext(Context);


  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required(t("Password Required"))
      .min(6, t("To Shore Password (Min 6)"))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/,
        t("Invalid Password Formate (Q1@we34rt5)")
      ),
    // password: Yup.string()
    //   .required("Password confirmation required")
    //   .oneOf([Yup.ref("newPassword")], "Passwords must match"),
  });

  async function hanldeChangeTechPassword(values) {
    console.log(values);
    await changeTechPassword(values);
    // Log the updated values
  }
  let formik = useFormik({
    initialValues: {
      newPassword: "",
      techId: id,
    },
    validationSchema,
    onSubmit: hanldeChangeTechPassword,
  });

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Header title={t("Change Tech Password")}></Header>

      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          {/* password */}

          <TextField
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="newPassword"
            id="newPassword"
            margin="normal"
            required
            fullWidth
            label={t("new Password")}
          />
          {formik.errors.newPassword && formik.touched.newPassword ? (
            <Alert severity="error">
              <AlertTitle>{t("Error")}</AlertTitle>
              {formik.errors.newPassword}
            </Alert>
          ) : null}

{/* Confirm */}
          {/* <TextField
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="password"
            id="password"
            margin="normal"
            required
            fullWidth
            label={t("Password")}
          />
          {formik.errors.password && formik.touched.password ? (
            <Alert severity="error">
              <AlertTitle>{t("Error")}</AlertTitle>
              {formik.errors.password}
            </Alert>
          ) : null} */}


          <Button
            disabled={!(formik.isValid && formik.dirty)}
            variant="contained"
            sx={{ marginY: "20px" }}
            type="submit"
          >
            {isLoading ? <CircularProgress color="success" /> : t("Edit Tech")}
          </Button>
        </FormControl>
      </form>
    </Box>
  );
}

export default ChangeTechPassword;
