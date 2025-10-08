import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const ProtectedRoute = ({ children }) => {
  const { user, fetchingUser } = useAuthStore();

  if (fetchingUser) {
    return <p className="text-white text-center mt-10">Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
