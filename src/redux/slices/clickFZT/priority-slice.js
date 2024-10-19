import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "@/services/api";

/* Thunk to get data from the API */
export const fetchPriorityTask = createAsyncThunk(
  "task/fetchPriorityTask",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getData(`api/clickfzt/priority`);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* Initial state for spaces */
const initStateSpaces = {
  priorityTask: [],
  loading: false,
  error: null,
};

/* Slice to manage spaces events */
const prioritySlice = createSlice({
  name: "spaces",
  initialState: initStateSpaces,
  reducers: {
    clearSpaces: (state) => {
      state.priorityTask = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPriorityTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPriorityTask.fulfilled, (state, action) => {
        state.loading = false;
        state.priorityTask = action.payload;
      })
      .addCase(fetchPriorityTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSpaces } = prioritySlice.actions;

export default prioritySlice.reducer;
