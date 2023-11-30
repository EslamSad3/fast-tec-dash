import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import Customers from "./components/Customers";
import Technicians from "./components/Technicians";
import Orders from "./components/Orders";
import Configuration from "./components/Configuration";
import Login from "./components/Login";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Layout from "./components/LayOut";
import theme from "./theme";
import { ContextProvider } from "./context";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Home />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/technicians" element={<Technicians />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/configuration" element={<Configuration />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </ThemeProvider>
      </ContextProvider>
        <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
