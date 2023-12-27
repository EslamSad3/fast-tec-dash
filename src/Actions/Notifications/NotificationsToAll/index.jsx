import React, { useContext } from "react";
import { useFormik } from "formik";
import { Context } from "../../../context";

import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Input,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import Header from "../../../components/Header";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

function NotificationsToAll() {
  const [t] = useTranslation();
  const { sendNewNotification, isLoading } = useContext(Context);
  const validationSchema = Yup.object().shape({
    topic: Yup.string().required(t("Receiver Required")),
    title: Yup.string().required(t("Title Required")),
    body: Yup.string().required(t("Notification body Required")),
  });

  let formik = useFormik({
    initialValues: {
      topic: "",
      title: "",
      body: "",
    },
    validationSchema,
    onSubmit: handleSendNewNotification,
  });

  async function handleSendNewNotification() {
    await sendNewNotification(formik.values);
    formik.resetForm();
  }

  const handleTopicChange = (event) => {
    formik.setFieldValue("topic", event.target.value);
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Header title={t("Send New Notification")}></Header>
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          {/* topic */}

          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={formik.values.topic}
            onChange={handleTopicChange}
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="customers"
              control={<Radio />}
              label={t("Customers")}
            />
            <FormControlLabel
              value="techs"
              control={<Radio />}
              label={t("Technicians")}
            />
          </RadioGroup>
          {formik.errors.topic && formik.touched.topic ? (
            <Alert severity="error">
              <AlertTitle>{t("Error")}</AlertTitle>
              {formik.errors.topic}
            </Alert>
          ) : null}

          {/* title */}

          <TextField
            margin="normal"
            required
            fullWidth
            label={t("title")}
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="title"
            id="title"
          />
          {formik.errors.title && formik.touched.title ? (
            <Alert severity="error">
              <AlertTitle>{t("Error")}</AlertTitle>
              {formik.errors.title}
            </Alert>
          ) : null}

          {/* Body */}

          <TextField
            margin="normal"
            required
            fullWidth
            label={t("body")}
            value={formik.values.body}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="body"
            id="body"
            multiline
            rows={4}
            placeholder="Message"
          />
          {formik.errors.body && formik.touched.body ? (
            <Alert severity="error">
              <AlertTitle>{t("Error")}</AlertTitle>
              {formik.errors.body}
            </Alert>
          ) : null}

          <Button
            disabled={!(formik.isValid && formik.dirty)}
            variant="contained"
            sx={{ marginY: "20px" }}
            type="submit"
          >
            {isLoading ? <CircularProgress color="success" /> : t("Send")}
          </Button>
        </FormControl>
      </form>
    </Box>
  );
}

export default NotificationsToAll;
