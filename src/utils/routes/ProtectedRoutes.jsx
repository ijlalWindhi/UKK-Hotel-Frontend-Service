import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getLocalStorage } from "../helper/localStorage";
import { LOCAL_STORAGE_TOKEN, LOCAL_STORAGE_USER } from "../constants";
import AdminLayout from "../../components/layout/AdminLayout";

const userAuth = () => {
  const token = getLocalStorage(LOCAL_STORAGE_TOKEN);
  const user = getLocalStorage(LOCAL_STORAGE_USER);
  if (token) {
    return {
      token: token,
      user: user.role,
    };
  } else {
    return false;
  }
};

const ProtectedRoutes = () => {
  const { token, role } = userAuth();
  return token ? (
    role === "admin" ? (
      <Outlet render={(props) => <AdminLayout {...props} />} />
    ) : role === "resepsionis" ? (
      <Outlet render={(props) => <ResepsionisLayout {...props} />} />
    ) : (
      <Outlet render={(props) => <UserLayout {...props} />} />
    )
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoutes;
