import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import Customers from "./components/Customers";
import Technicians from "./components/Technicians";
import Orders from "./components/Orders";
import Configuration from "./components/Configuration";
import Login from "./components/Login";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import Layout from "./components/LayOut";
import { themeSettings } from "./theme";
import { ContextProvider } from "./context";
import { ToastContainer } from "react-toastify";
import Availtechnicians from "./components/AvailableTechs";
import Coupons from "./components/Coupons";
import AddNewTech from "./Actions/Techs/AddNewTech";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import CustomerDetailsPage from "./components/Customers/CustomerDetailsPage/CustomerDetailsPage";
import TechnicianDetailsPage from "./components/Technicians/TechnicianDetailsPage/TechnicianDetailsPage";
import AvailableTechnicianDetails from "./components/AvailableTechs/AvailableTechnicianDetails/AvailableTechniciansDetails";
import CouponDetailsPage from "./components/Coupons/CouponDetailsPage/CouponDetailsPage";
import AddNewCoupon from "./Actions/Coupons/AddNewCoupon";
import OrderDetailsPage from "./components/Orders/OrderDetailsPage/OrderDetailsPage";
import NotificationsToAll from "./Actions/Notifications/NotificationsToAll";
import Notification from "./FCM/Notification/Notification";

function App() {
  console.log('v2')
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ContextProvider>
          <CssBaseline />
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route path="/" element={<Navigate to="/dashboard" replace />} />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customers"
                forceRefresh={true}
                element={
                  <ProtectedRoute>
                    <Customers />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customers/:id"
                element={
                  <ProtectedRoute>
                    <CustomerDetailsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/technicians"
                element={
                  <ProtectedRoute>
                    <Technicians />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/technicians/:id"
                element={
                  <ProtectedRoute>
                    <TechnicianDetailsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/availabletechnicians"
                element={
                  <ProtectedRoute>
                    <Availtechnicians />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/availabletechnicians/:id"
                element={
                  <ProtectedRoute>
                    <AvailableTechnicianDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/coupons"
                element={
                  <ProtectedRoute>
                    <Coupons />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/coupons/:id"
                element={
                  <ProtectedRoute>
                    <CouponDetailsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/addCoupons"
                element={
                  <ProtectedRoute>
                    <AddNewCoupon />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders/:id"
                element={
                  <ProtectedRoute>
                    <OrderDetailsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/configuration"
                element={
                  <ProtectedRoute>
                    <Configuration />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notifications"
                element={
                  <ProtectedRoute>
                    <NotificationsToAll />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/addtech"
                element={
                  <ProtectedRoute>
                    <AddNewTech />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
          <Notification />
        </ContextProvider>
      </ThemeProvider>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
