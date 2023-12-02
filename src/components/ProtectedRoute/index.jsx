import React, { useContext } from "react";
import { Context } from "../../context";
import { Navigate } from "react-router-dom";

function ProtectedRoute(props) {
  const { adminToken } = useContext(Context);
  if (!localStorage.getItem("AdminToken")) {
    return <Navigate to={"/login"} />;
  } else {
    return props.children;
  }
}

export default ProtectedRoute;
