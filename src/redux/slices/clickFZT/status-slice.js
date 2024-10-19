import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "@/services/api";

/* Thunk to get data from the API */
export const fetchStatusTask = createAsyncThunk(
  "task/fetchStatusTask",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getData(`api/clickfzt/status`);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* Initial state for spaces */
const initStateSpaces = {
  statusTask: [],
  loading: false,
  error: null,
};

/* Slice to manage spaces events */
const statusSlice = createSlice({
  name: "spaces",
  initialState: initStateSpaces,
  reducers: {
    clearSpaces: (state) => {
      state.statusTask = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatusTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStatusTask.fulfilled, (state, action) => {
        state.loading = false;
        state.statusTask = action.payload;
      })
      .addCase(fetchStatusTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSpaces } = statusSlice.actions;

export default statusSlice.reducer;
