import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import PublicRoutes from "./utils/routes/PublicRoutes";
import ProtectedRoutes from "./utils/routes/ProtectedRoutes";
import {
  Login,
  AdminKamar,
  AdminTipeKamar,
  AdminUser,
  AdminDashboard,
} from "./pages";
import AdminLayout from "./components/layout/AdminLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<ProtectedRoutes />}>
        <Route path="dashboard/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="kamar" element={<AdminKamar />} />
          <Route path="tipe-kamar" element={<AdminTipeKamar />} />
          <Route path="user" element={<AdminUser />} />
        </Route>
      </Route>
      <Route path="login" element={<PublicRoutes />}>
        <Route index element={<Login />} />
      </Route>
    </>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
