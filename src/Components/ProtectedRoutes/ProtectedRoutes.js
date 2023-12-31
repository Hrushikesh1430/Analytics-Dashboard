import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const ProtectedRoutes = ({ component, redirect }) => {
  if (!localStorage.getItem("chartAnalytics")) {
    return <Navigate to={`/${redirect}`} replace />;
  }
  return component;
};
