import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
  name: "global",
  initialState: { ciutkan: false },
  reducers: {
    handleCiutkan: (state, action) => {
      state.ciutkan = action.payload;
    },
  },
});

export const { handleCiutkan } = globalSlice.actions;
export default globalSlice.reducer;
