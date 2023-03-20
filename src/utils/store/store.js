import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "./reducers/globalSlice";
import kamarSlice from "./reducers/kamarSlice";
import tipeKamarSlice from "./reducers/tipeKamarSlice";
import penggunaSlice from "./reducers/penggunaSlice";
import pemesananSlice from "./reducers/pemesananSlice";
import detailPemesananSlice from "./reducers/detailPemesananSlice";

export const store = configureStore({
  reducer: {
    global: globalSlice,
    kamar: kamarSlice,
    tipeKamar: tipeKamarSlice,
    pengguna: penggunaSlice,
    pemesanan: pemesananSlice,
    detailPemesanan: detailPemesananSlice,
  },
});
