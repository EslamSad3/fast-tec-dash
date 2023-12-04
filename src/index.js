import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./i18n";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import { setupListeners } from "@reduxjs/toolkit/query";
import { Provider } from "react-redux";
import globalReducer from "./state";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    global: globalReducer,
  },
});
setupListeners(store.dispatch);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
