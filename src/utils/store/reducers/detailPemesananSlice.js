import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API } from "../../constants";
import { getLocalStorage } from "../../helper/localStorage";
import { LOCAL_STORAGE_TOKEN } from "../../constants";

export const addDetailPemesanan = createAsyncThunk(
  "detailPemesanan/addDetailPemesanan",
  async (values) => {
    const URL = `${BASE_API}/detail_pemesanan/create`;
    try {
      const data = await axios.post(URL, values, {
        headers: {
          Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_TOKEN)}`,
        },
      });
      const res = data.data;

      if (res.status === "success") {
        return Promise.resolve({
          status: "success",
          message: "Berhasil menambahkan detail pemesanan",
          data: res.data,
        });
      }
    } catch (err) {
      return Promise.resolve({
        status: "error",
        message: err.response.data.message,
      });
    }
  }
);

const detailPemesananAdapter = createEntityAdapter({
  selectId: (detail_pemesanan) => detail_pemesanan.id_detail_pemesanan,
});

const detailPemesananSlice = createSlice({
  name: "detailPemesanan",
  initialState: detailPemesananAdapter.getInitialState(),
  extraReducers: (builder) => {
    builder.addCase(addDetailPemesanan.fulfilled, (state, action) => {
      if (action.payload.status === "success") {
        detailPemesananAdapter.addOne(state, action.payload.data);
      }
    });
  },
});

export const detailPemesananSelector = detailPemesananAdapter.getSelectors(
  (state) => state.detail_pemesanan
);

export default detailPemesananSlice.reducer;
