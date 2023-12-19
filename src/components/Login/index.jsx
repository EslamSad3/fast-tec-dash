import React, { useContext } from "react";
import { Context } from "../../context";
import * as Yup from "yup";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

// import Link from "@mui/material/Link";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { CircularProgress, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useState } from "react";
import { Us, Sa } from "react-flags-select";
import FlexBetween from "../FlexBetween";

function Login() {
  const [Language, setLanguage] = useState("en");
  const handleChange = (event) => {
    setLanguage(event.target.value || "en");
    localStorage.setItem("locale", event.target.value);
  };
  const [t, i18n] = useTranslation();
  const { handleLogingIn, isLoading } = useContext(Context);
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("Incorect Email Formate"))
      .required(t("Email Required")),
    password: Yup.string().required(t("Password Required")),
  });

  async function handleLogin(values) {
    await handleLogingIn(values);
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("locale"));
  }, [i18n]);

  return (
    <>
      <Container component="main" maxWidth="xs">
        <form onSubmit={formik.handleSubmit}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              {t("Sign in")}
            </Typography>

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={t("Email Address")}
              name="email"
              autoComplete="email"
              autoFocus
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={t("Password")}
              type="password"
              id="password"
              autoComplete="current-password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <FlexBetween>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Lang
                </InputLabel>
                <Select
                  sx={{
                    "& .MuiSelect-select": { paddingX: "2rem", mx: "1rem" },
                  }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={Language}
                  label="Language"
                  onChange={handleChange}
                >
                  <MenuItem
                    value="ar"
                    onClick={() => {
                      i18n.changeLanguage("ar");
                    }}
                  >
                    عربي <Sa />
                  </MenuItem>
                  <MenuItem
                    value="en"
                    onClick={() => {
                      i18n.changeLanguage("en");
                    }}
                  >
                    English <Us />
                  </MenuItem>
                </Select>
              </FormControl>
              <Button
                disabled={!(formik.isValid && formik.dirty)}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mx: "1rem" }}
              >
                {isLoading ? (
                  <CircularProgress sx={{ color: "#fafafa" }} />
                ) : (
                  t("Sign in")
                )}
              </Button>
            </FlexBetween>
          </Box>
        </form>
      </Container>
    </>
  );
}

export default Login;
