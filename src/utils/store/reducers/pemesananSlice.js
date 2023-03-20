import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API } from "../../constants";
import { getLocalStorage } from "../../helper/localStorage";
import { LOCAL_STORAGE_TOKEN } from "../../constants";

export const getAllDataPemesanan = createAsyncThunk(
  "pemesanan/getAllData",
  async () => {
    const URL = `${BASE_API}/pemesanan/getAllData`;
    try {
      const data = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_TOKEN)}`,
        },
      });
      const res = data.data;

      if (res.status === "success") {
        return Promise.resolve({
          status: "success",
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

export const getAllDataPemesananByIdUser = createAsyncThunk(
  "pemesanan/getAllDataByIdUser",
  async (id) => {
    const URL = `${BASE_API}/pemesanan/getByIdUser/${id}`;
    try {
      const data = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_TOKEN)}`,
        },
      });
      const res = data.data;

      if (res.status === "success") {
        return Promise.resolve({
          status: "success",
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

export const searchNamaTamu = createAsyncThunk(
  "pemesanan/searchNamaTamu",
  async (name) => {
    const URL = `${BASE_API}/pemesanan/search/${name}`;
    try {
      const data = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_TOKEN)}`,
        },
      });
      const res = data.data;

      if (res.status === "success") {
        return Promise.resolve({
          status: "success",
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

export const searchByEmailAndNumber = createAsyncThunk(
  "pemesanan/searchByEmailAndNumber",
  async (values) => {
    const URL = `${BASE_API}/pemesanan/searchByEmailAndNumber`;
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

export const filterCheckIn = createAsyncThunk(
  "pemesanan/filterCheckIn",
  async (date) => {
    const URL = `${BASE_API}/pemesanan/filter/check_in/${date}T00:00:00.000Z`;
    try {
      const data = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_TOKEN)}`,
        },
      });
      const res = data.data;

      if (res.status === "success") {
        return Promise.resolve({
          status: "success",
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

export const addPemesanan = createAsyncThunk(
  "pemesanan/addPemesanan",
  async (values) => {
    const URL = `${BASE_API}/pemesanan/create`;
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
          message: "Berhasil menambahkan pemesanan",
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

export const updatePemesanan = createAsyncThunk(
  "pemesanan/updatePemesanan",
  async ({ values, id }) => {
    const URL = `${BASE_API}/pemesanan/edit/${id}`;
    try {
      const data = await axios.patch(URL, values, {
        headers: {
          Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_TOKEN)}`,
        },
      });
      const res = data.data;

      if (res.status === "success") {
        return Promise.resolve({
          status: "success",
          message: "Berhasil mengubah kamar",
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

export const deletePemesanan = createAsyncThunk(
  "pemesanan/deletePemesanan",
  async (id) => {
    const URL = `${BASE_API}/pemesanan/delete/${id}`;
    try {
      const data = await axios.delete(URL, {
        headers: {
          Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_TOKEN)}`,
        },
      });
      const res = data.data;

      if (res.status === "success") {
        return Promise.resolve({
          status: "success",
          message: "Berhasil menghapus pemesanan",
          data: res.data.id_pemesanan,
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

const pemesananAdapter = createEntityAdapter({
  selectId: (pemesanan) => pemesanan.id_pemesanan,
});

const pemesananSlice = createSlice({
  name: "pemesanan",
  initialState: pemesananAdapter.getInitialState(),
  extraReducers: (builder) => {
    builder.addCase(getAllDataPemesanan.fulfilled, (state, action) => {
      if (action.payload.status === "success") {
        pemesananAdapter.setAll(state, action.payload.data);
      }
    });
    builder.addCase(getAllDataPemesananByIdUser.fulfilled, (state, action) => {
      if (action.payload.status === "success") {
        pemesananAdapter.setAll(state, action.payload.data);
      }
    });
    builder.addCase(searchNamaTamu.fulfilled, (state, action) => {
      if (action.payload.status === "success") {
        pemesananAdapter.setAll(state, action.payload.data);
      }
    });
    builder.addCase(filterCheckIn.fulfilled, (state, action) => {
      if (action.payload.status === "success") {
        pemesananAdapter.setAll(state, action.payload.data);
      }
    });
    builder.addCase(searchByEmailAndNumber.fulfilled, (state, action) => {
      if (action.payload.status === "success") {
        pemesananAdapter.setAll(state, action.payload.data);
      }
    });
    builder.addCase(addPemesanan.fulfilled, (state, action) => {
      if (action.payload.status === "success") {
        pemesananAdapter.addOne(state, action.payload.data);
      }
    });
    builder.addCase(updatePemesanan.fulfilled, (state, action) => {
      if (action.payload.status === "success") {
        pemesananAdapter.updateOne(state, {
          id: action.payload.data.id_pemesanan,
          changes: action.payload.data,
        });
      }
    });
    builder.addCase(deletePemesanan.fulfilled, (state, action) => {
      if (action.payload.status === "success") {
        pemesananAdapter.removeOne(state, action.payload.data);
      }
    });
  },
});

export const pemesananSelector = pemesananAdapter.getSelectors(
  (state) => state.pemesanan
);

export default pemesananSlice.reducer;
