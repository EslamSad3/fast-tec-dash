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
import  { themeSettings } from "./theme";
import { ContextProvider } from "./context";
import { ToastContainer } from "react-toastify";
import Availtechnicians from "./components/AvailableTechs";
import Coupons from "./components/Coupons";
import AddNewTech from "./Actions/Techs/AddNewTech";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import { useMemo } from "react";

function App() {
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
                element={
                  <ProtectedRoute>
                    <Customers />
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
                path="/availabletechnicians"
                element={
                  <ProtectedRoute>
                    <Availtechnicians />
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
                path="/orders"
                element={
                  <ProtectedRoute>
                    <Orders />
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
        </ContextProvider>
      </ThemeProvider>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
