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
import { CircularProgress } from "@mui/material";

function Login() {
  const { handleLogingIn, isLoading } = useContext(Context);
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Incorect Email Formate")
      .required("Email Required"),
    password: Yup.string().required(""),
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
              Sign in
            </Typography>

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
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
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <Button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {isLoading ? (
                <CircularProgress sx={{ color: "#fafafa" }} />
              ) : (
                "Sign In"
              )}
            </Button>
          </Box>
        </form>
      </Container>
    </>
  );
}

export default Login;
