// alertSlice.js (ejemplo con Redux Toolkit)
import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alert",
  initialState: {
    showAlert: false,
    messageAlert: "",
  },
  reducers: {
    setAlert: (state, action) => {
      state.showAlert = true;
      state.messageAlert = action.payload;
    },
    clearAlert: (state) => {
      state.showAlert = false;
      state.messageAlert = "";
    },
  },
});

export const { setAlert, clearAlert } = alertSlice.actions;
export default alertSlice.reducer;
