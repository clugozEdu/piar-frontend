import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "../../services/api";

/* Thunk to get data from the API */
export const fetchAdvisors = createAsyncThunk(
  "advisors/fetchAdvisors",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getData("api/advisor");
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* Initial state to advisors */
const initStateAdvisors = {
  advisors: [],
  loading: false,
  error: null,
};

/* Slice to manage advisors events */
const advisorsSlice = createSlice({
  name: "advisors",
  initialState: initStateAdvisors,
  reducers: {
    clearAdvisors: (state) => {
      state.advisors = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdvisors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdvisors.fulfilled, (state, action) => {
        state.loading = false;
        state.advisors = action.payload;
      })
      .addCase(fetchAdvisors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAdvisors } = advisorsSlice.actions;
export default advisorsSlice.reducer;
