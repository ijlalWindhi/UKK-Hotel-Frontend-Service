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
  ResepsionisDashboard,
  ResepsionisPemesanan,
  ReseprionisDetailPemesanan,
  TamuDashboard,
  TamuKamar,
  TamuDetailKamar,
  TamuCekPemesanan,
  TamuCetakPemesanan,
  TamuPemesanan,
  TamuHistoriPemesanan,
} from "./pages";
import AdminLayout from "./components/layout/AdminLayout";
import ResepsionisLayout from "./components/layout/ResepsionisLayout";
import TamuLayout from "./components/layout/TamuLayout";

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
        <Route path="dashboard/resepsionis" element={<ResepsionisLayout />}>
          <Route index element={<ResepsionisDashboard />} />
          <Route path="pemesanan" element={<ResepsionisPemesanan />} />
          <Route
            path="detail-pemesanan/:id_pemesanan"
            element={<ReseprionisDetailPemesanan />}
          />
        </Route>
        <Route path="dashboard/tamu" element={<TamuLayout />}>
          <Route index element={<TamuDashboard />} />
          <Route path="kamar" element={<TamuKamar />} />
          <Route
            path="detail-kamar/:id_tipe_kamar"
            element={<TamuDetailKamar />}
          />
          <Route path="cek-pemesanan" element={<TamuCekPemesanan />} />
          <Route path="pemesanan/:id_tipe_kamar" element={<TamuPemesanan />} />
          <Route path="histori-pemesanan" element={<TamuHistoriPemesanan />} />
        </Route>
        <Route
          path="dashboard/tamu/cek-pemesanan/cetak-pemesanan/:id"
          element={<TamuCetakPemesanan />}
        />
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
