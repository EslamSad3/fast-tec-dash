import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../../context";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import * as dayjs from "dayjs";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  Box,
  Typography,
  Alert,
  useMediaQuery,
  Button,
  CircularProgress,
  DialogActions,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Header from "../../Header";
import { useTranslation } from "react-i18next";
const OrderDetailsPage = () => {
  const [t] = useTranslation();
  const { id } = useParams();
  const {
    order,
    fetchOneOrder,
    refreshData,
    oneCustomer,
    oneTech,
    changeOrderStatusByAdmin,
    isLoading,
    rejectOrder,
    acceptOrder,
    availableTechnicians,
    assignTechByAdmin,
  } = useContext(Context);

  console.log(availableTechnicians, "avaulableTech");
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const navigate = useNavigate();

  console.log(order);
  const [openReject, setopenReject] = useState(false);
  const [openAccept, setopenAccept] = useState(false);
  const [openSelectTech, setopenSelectTech] = useState(false);
  // const [timeArrival, settimeArrival] = useState(null);
  const [timeArrival, settimeArrival] = useState(dayjs().add(10, "minute")); // Initial value: current time + 10 minutes
  const [accetpData, setAcceptData] = useState({
    orderId: id,
    status: 3,
    estimatedArrivalTime: timeArrival,
  });

  const [tech, setTech] = useState("");

  const handleSetTec = (event) => {
    setTech(event.target.value);
  };

  console.log(timeArrival, "timeArrival");

  // Reject
  const handleClickopenReject = () => {
    setopenReject(true);
  };

  const handleCloseReject = () => {
    setopenReject(false);
  };

  // accept
  const handleClickopenAccept = () => {
    setopenAccept(true);
  };

  const handleCloseAccept = () => {
    setopenAccept(false);
  };
  // Select Tech
  const handleClickopenSelectTech = () => {
    setopenSelectTech(true);
  };

  const handleCloseSelectTech = () => {
    setopenSelectTech(false);
  };

  // cancel order
  async function handleChangeStatus() {
    await changeOrderStatusByAdmin(id);
    fetchOrder();
  }

  // reject order
  async function handleRejectOrder() {
    await rejectOrder(id);
    handleCloseReject();
    fetchOrder();
  }

  // accept
  async function handleAcceptOrder() {
    if (timeArrival == null) {
      // handle the case where timeArrival is null (e.g., show an error message)
      console.log("time null");
    } else {
      // format the time using dayjs
      const formattedTimeArrival = dayjs(timeArrival).format("hh:mm");
      console.log(formattedTimeArrival, "formattedTimeArrival");
      // update the accept data with formatted time
      const updatedAcceptData = {
        ...accetpData,
        estimatedArrivalTime: formattedTimeArrival,
      };

      await acceptOrder(updatedAcceptData);
      console.log(updatedAcceptData);
      handleCloseAccept();
      fetchOrder();
    }
  }

  // Fetch order
  async function fetchOrder() {
    await fetchOneOrder(id);
    refreshData();
  }

  // Assign tech
  async function assignTech(tech) {
    await assignTechByAdmin(id, tech);
    fetchOrder();
    handleCloseSelectTech();
  }

  useEffect(() => {
    // setOrderStatus(order.data?.status);
    fetchOrder();
  }, []);

  // console.log(orderStatus);

  if (!order) {
    return <div>Loading...</div>; // Add a loading state or redirect as needed
  }

  return (
    <Box>
      <Header title={t("Order Details")} />

      <Box
        sx={{
          boxShadow: "2px 2px 2px 2px rgba(0,0,0,0.25)",
          mx: "1rem",
          p: "1.5rem",
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Box>
              <Typography variant="h6">
                {t("Order ID")} : {order && order.data?.id}
              </Typography>
              <Typography variant="small">
                {" "}
                {t("Date")} : {order && order.data?.creationDate}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {order && order.data?.status !== "1" && (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleChangeStatus()}
                >
                  {isLoading ? (
                    <CircularProgress color="primary" />
                  ) : (
                    t("Cancel Order")
                  )}
                </Button>
              )}
            </Box>
          </Box>
          <Box>
            <Typography variant="p" component="div">
              {order && order.data?.status === "0" ? (
                <Alert severity="success">{t("NEW")}</Alert>
              ) : order && order.data?.status === "1" ? (
                <Alert severity="error">{t("CANCELLED")}</Alert>
              ) : order && order.data?.status === "2" ? (
                <Alert severity="warning">{t("REJECTED")}</Alert>
              ) : order && order.data?.status === "3" ? (
                <Alert severity="info">{t("ON_WAY")}</Alert>
              ) : order && order.data?.status === "4" ? (
                <Alert severity="info">{t("IN_PROGRESS")}</Alert>
              ) : order && order.data?.status === "5" ? (
                <Alert severity="info">{t("PENDING_PAYMENT")}</Alert>
              ) : order && order.data?.status === "6" ? (
                <Alert severity="success">{t("COMPLETED")}</Alert>
              ) : order && order.data?.status === "7" ? (
                <Alert severity="error">{t("FAILED PAYMENT")}</Alert>
              ) : order && order.data?.status === "8" ? (
                <Alert severity="error">{t("No tech assigned")}</Alert>
              ) : order && order.data?.status === "9" ? (
                <Alert severity="success">{t("Assigned by Admin")}</Alert>
              ) : (
                "Not Listed"
              )}
            </Typography>
          </Box>
          {order && order.data?.status === "8" && (
            <Button
              variant="outlined"
              color="success"
              onClick={() => handleClickopenSelectTech()}
            >
              {isLoading ? <CircularProgress color="primary" /> : t("Assign")}
            </Button>
          )}
        </Box>

        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(2, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            {/* Customer */}
            {order && oneCustomer ? (
              <Box
                sx={{
                  boxShadow: "2px 2px 2px 2px rgba(0,0,0,0.25)",
                  borderRadius: "10px",
                  cursor: "pointer",
                  p: "1rem",
                }}
                onClick={() => navigate(`/customers/${oneCustomer.id}`)}
              >
                <Typography variant="h6">{t("Customer")} </Typography>

                <Typography variant="p">
                  {t("Name")} :{order && oneCustomer && oneCustomer.name}
                </Typography>
                <br />
                <Typography variant="p">
                  {t("Phone")} :{order && oneCustomer && oneCustomer.phone}
                </Typography>
              </Box>
            ) : (
              <Typography variant="h6">{t("Customer Not Found")} </Typography>
            )}
          </Box>
          {/* Tec */}
          {order && oneTech ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  boxShadow: "2px 2px 2px 2px rgba(0,0,0,0.25)",
                  borderRadius: "10px",
                  cursor: "pointer",
                  p: "1rem",
                }}
                onClick={() => navigate(`/technicians/${oneTech.id}`)}
              >
                <Typography variant="h6">{t("Technician")} </Typography>

                <Typography variant="p">
                  {t("Name")} :{order && oneTech && oneTech.name}{" "}
                </Typography>
                <br />
                <Typography variant="p">
                  {t("Phone")} :{order && oneTech && oneTech.phone}{" "}
                </Typography>
              </Box>
            </Box>
          ) : (
            <Typography variant="h6">{t("Technician Not Found")} </Typography>
          )}

          {/* Cost */}

          {order && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  boxShadow: "2px 2px 2px 2px rgba(0,0,0,0.25)",
                  borderRadius: "10px",
                  cursor: "pointer",
                  p: "1rem",
                }}
              >
                <Typography variant="h6">{t("Cost")} </Typography>

                <Typography variant="p">
                  {t("Total Cost")} :{order && order.data?.totalCost}
                </Typography>
                <br />
                <Typography variant="p">
                  {t("Discount")} :{order && order.data?.discountValue}
                </Typography>
                <br />
                <Typography variant="p">
                  {t("Total Cost After Discound")} :
                  {order && order.data?.totalCostAfterDiscount}{" "}
                </Typography>
              </Box>
            </Box>
          )}
          {/* invoice */}

          <Box
            sx={{
              boxShadow: "2px 2px 2px 2px rgba(0,0,0,0.25)",
              borderRadius: "10px",
              cursor: "pointer",
              p: "1rem",
            }}
          >
            {order && order && order.data?.invoiceId ? (
              <Box>
                <Typography variant="h6">{t("Order Info")} </Typography>

                <Typography variant="p">
                  {t("Invoice ID")}:
                  {order && order && order.data?.invoiceId === null
                    ? t("No ID")
                    : order && order.data?.invoiceId}{" "}
                </Typography>
              </Box>
            ) : (
              <Typography variant="p">
                {" "}
                {t("Invoice ID")}: {t("No ID")}
              </Typography>
            )}
          </Box>

          {/* Paymnet */}
          <Box>
            <Typography variant="h6">{t("Payment Info")} </Typography>
            {order && order && order.data?.paymentInfo ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                }}
              >
                <Typography variant="p">
                  {t("Invoice ID")} :
                  {order && order && order.data?.paymentInfo === null
                    ? t("No ID")
                    : order && order.data?.paymentInfo}
                </Typography>
              </Box>
            ) : (
              <Typography variant="p">
                {" "}
                {t("Invoice ID")}: {t("No ID")}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
      {/* Actions */}

      {order && order.data?.status === "0" && (
        <Box
          sx={{
            boxShadow: "2px 2px 2px 2px rgba(0,0,0,0.25)",
            mx: "1rem",
            mt: "1rem",
            p: "1.5rem",
            borderRadius: "10px",
          }}
        >
          <Header title={t("Actions")} />

          <Box
            mt="20px"
            mx="20px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="row"
            rowGap="5px"
            columnGap="5px"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <Button
              variant="outlined"
              color="error"
              onClick={handleClickopenReject}
            >
              {isLoading ? (
                <CircularProgress sx={{ color: "#fafafa" }} />
              ) : (
                t("Reject")
              )}
            </Button>
            <Button
              variant="outlined"
              color="success"
              onClick={handleClickopenAccept}
            >
              {isLoading ? (
                <CircularProgress sx={{ color: "#fafafa" }} />
              ) : (
                t("Accept")
              )}
            </Button>
          </Box>
        </Box>
      )}
      {/* Reject */}
      <Dialog
        open={openReject}
        onClose={handleCloseReject}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{t("Reject")}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t("Are you sure you to reject")}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button variant="contained" color="error" onClick={handleCloseReject}>
            {t("No")}
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleRejectOrder()}
            sx={{ m: 2 }}
          >
            {t("Yes")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* accept */}
      <Dialog
        open={openAccept}
        onClose={handleCloseAccept}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{t("Accept")}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t("Pick Time")}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["TimePicker"]}>
              <TimePicker
                label={t("Estimated Time Arrival")}
                disablePast
                timeSteps={{ hours: 1, minutes: 1 }}
                value={timeArrival || new Date()}
                onChange={(newTime) => {
                  settimeArrival(newTime);
                }}
              />

              <Button
                variant="contained"
                color="success"
                onClick={handleAcceptOrder}
              >
                {t("Accept")}
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleCloseAccept}
                sx={{ m: 2 }}
              >
                {t("Cancel")}
              </Button>
            </DemoContainer>
          </LocalizationProvider>
        </DialogActions>
      </Dialog>

      {/* Assign Tech */}

      <Dialog
        open={openSelectTech}
        onClose={handleCloseSelectTech}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t("Assign Technician")}
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel id="select-tech">Tech</InputLabel>
            <Select
              labelId="select-tech"
              id="demo-simple-select"
              value={tech}
              label="Tech"
              onChange={handleSetTec}
            >
              {availableTechnicians.map((technician) => {
                return (
                  <MenuItem key={technician.id} value={technician.id}>
                    {technician.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            color="success"
            onClick={() => assignTech(tech)}
          >
            {isLoading ? (
              <CircularProgress sx={{ color: "#fafafa" }} />
            ) : (
              t("Assign")
            )}
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleCloseSelectTech}
            sx={{ m: 2 }}
          >
            {t("Cancel")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrderDetailsPage;
