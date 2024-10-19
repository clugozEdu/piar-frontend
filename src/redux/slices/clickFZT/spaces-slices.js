import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "@/services/api";

/* Thunk to get data from the API */
export const fetchSpaces = createAsyncThunk(
  "spaces/fetchSpaces",
  async (idAdvisor, { rejectWithValue }) => {
    try {
      const response = await getData(`api/clickfzt/spacing/advisor/`);

      // Aquí puedes transformar la respuesta si es necesario
      const transformedResponse = response
        .map((space) => ({
          ...space,
          isOwner: space.owner_advisor.id === idAdvisor,
          lists: space.lists
            .map((list) => ({
              ...list,
              isOwner: list.owner_advisor.id === idAdvisor,
              tasks: list.tasks.map((task) => ({
                ...task,
                isOwner: task.owner_advisor.id === idAdvisor,
              })),
            }))
            .sort((a, b) => a.title.localeCompare(b.title)), // Ordenada alfabeticamente
        }))
        .sort((a, b) => a.title.localeCompare(b.title)); // ordenada alfabeticamente

      console.log("transformedResponse", transformedResponse);
      return transformedResponse;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* Initial state for spaces */
const initStateSpaces = {
  spaces: [],
  loading: false,
  error: null,
};

/* Slice to manage spaces events */
const spacesSlice = createSlice({
  name: "spaces",
  initialState: initStateSpaces,
  reducers: {
    clearSpaces: (state) => {
      state.spaces = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpaces.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSpaces.fulfilled, (state, action) => {
        state.loading = false;
        state.spaces = action.payload;
      })
      .addCase(fetchSpaces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSpaces } = spacesSlice.actions;
export default spacesSlice.reducer;
