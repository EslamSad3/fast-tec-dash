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

function EditTechData() {
  const { id } = useParams();
  const [t] = useTranslation();
  const { editTechData, isLoading } = useContext(Context);
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required(t("Name Required"))
      .min(2, t("To Short Name (Min 2)")),
    phone: Yup.string()
      .required(t("Phone Number Required"))
      .min(8, t("Min Phone Number (8)"))
      .matches(/^[4569]\d{7}$/, t("Invalid Phone Number")),
  });

  async function hanldeEditTecData(values) {
    // Combine country code with phone number
    const phoneNumber = values.countryCode + values.phone;
    // Create a new object with the combined phone number
    const updatedValues = { ...values, phone: phoneNumber };
    // Call the addNewTechnician function with the updated values
    console.log(updatedValues);
    await editTechData(updatedValues);
    // Log the updated values
  }
  let formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      countryCode: "+965",
      techId: id,
    },
    validationSchema,
    onSubmit: hanldeEditTecData,
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
      <Header title={t("Edit Tech Details")}></Header>
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          {/* Name */}

          <TextField
            margin="normal"
            required
            fullWidth
            label={t("Technician Name")}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="name"
            id="name"
          />
          {formik.errors.name && formik.touched.name ? (
            <Alert severity="error">
              <AlertTitle>{t("Error")}</AlertTitle>
              {formik.errors.name}
            </Alert>
          ) : null}

          {/* phone */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              onBlur={formik.handleBlur}
              className=""
              sx={{ width: "15%", fontWeight: "bold" }}
              type="text"
              name=""
              id=""
              disabled
              value={"+965"}
              margin="normal"
              fullWidth
            />
            <TextField
              sx={{ width: "85%" }}
              className=""
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              name="phone"
              id="phone"
              label={t("Phone ex.(51234567)")}
              margin="normal"
              required
              fullWidth
            />
          </Box>
          {formik.errors.phone && formik.touched.phone ? (
            <Alert severity="error">
              <AlertTitle>{t("Error")}</AlertTitle>
              {formik.errors.phone}
            </Alert>
          ) : null}

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

export default EditTechData;
