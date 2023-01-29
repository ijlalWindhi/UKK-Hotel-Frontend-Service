import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API } from "../../constants";
import { getLocalStorage } from "../../helper/localStorage";
import { LOCAL_STORAGE_TOKEN } from "../../constants";

export const getAllDataKamar = createAsyncThunk(
  "kamar/getAllData",
  async () => {
    const URL = `${BASE_API}/kamar/getAllData`;
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

export const searchNomorKamar = createAsyncThunk(
  "kamar/searchNomorKamar",
  async (value) => {
    const URL = `${BASE_API}/kamar/search/${value}`;
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

export const addKamar = createAsyncThunk("kamar/addKamar", async (values) => {
  const URL = `${BASE_API}/kamar/create`;
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
        message: "Berhasil menambahkan kamar",
        data: res.data,
      });
    }
  } catch (err) {
    return Promise.resolve({
      status: "error",
      message: err.response.data.message,
    });
  }
});

export const updateKamar = createAsyncThunk(
  "kamar/updateKamar",
  async ({ values, id }) => {
    const URL = `${BASE_API}/kamar/edit/${id}`;
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

export const deleteKamar = createAsyncThunk("kamar/deleteKamar", async (id) => {
  const URL = `${BASE_API}/kamar/delete/${id}`;
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
        message: "Berhasil menghapus kamar",
        data: res.data.id_kamar,
      });
    }
  } catch (err) {
    return Promise.resolve({
      status: "error",
      message: err.response.data.message,
    });
  }
});

const kamarAdapter = createEntityAdapter({
  selectId: (kamar) => kamar.id_kamar,
});

const kamarSlice = createSlice({
  name: "kamar",
  initialState: kamarAdapter.getInitialState(),
  extraReducers: (builder) => {
    builder.addCase(getAllDataKamar.fulfilled, (state, action) => {
      if (action.payload.status === "success") {
        kamarAdapter.setAll(state, action.payload.data);
      }
    });
    builder.addCase(searchNomorKamar.fulfilled, (state, action) => {
      if (action.payload.status === "success") {
        kamarAdapter.setAll(state, action.payload.data);
      }
    });
    builder.addCase(addKamar.fulfilled, (state, action) => {
      if (action.payload.status === "success") {
        kamarAdapter.addOne(state, action.payload.data);
      }
    });
    builder.addCase(updateKamar.fulfilled, (state, action) => {
      if (action.payload.status === "success") {
        kamarAdapter.updateOne(state, {
          id: action.payload.data.id_kamar,
          changes: action.payload.data,
        });
      }
    });
    builder.addCase(deleteKamar.fulfilled, (state, action) => {
      if (action.payload.status === "success") {
        kamarAdapter.removeOne(state, action.payload.data);
      }
    });
  },
});

export const kamarSelector = kamarAdapter.getSelectors((state) => state.kamar);

export default kamarSlice.reducer;
