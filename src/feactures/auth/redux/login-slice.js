import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postLogin } from "../../../services/api";

// Thunk asíncrono para manejar el login
export const fetchLogin = createAsyncThunk(
  "advisorLogin/fetchLogin",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await postLogin("auth/token", { username, password });

      /* save response in local storage */
      if (response) {
        const { access_token, token_type } = response;
        const token = `${token_type} ${access_token}`;
        // Guardar en local storage
        localStorage.setItem("token-advisor", token);
        localStorage.setItem("is_authenticated", true);
        localStorage.setItem("advisor", JSON.stringify(response.advisor));
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* Initial state to login */
const initStateLogin = {
  advisor: JSON.parse(localStorage.getItem("advisor")) || "",
  access_token: "",
  token_type: "",
  loading: false,
  error: null,
  is_authenticated: localStorage.getItem("is_authenticated") === "true",
};

/* Slice to manage login advisor events */
const advisorLoginSlice = createSlice({
  name: "advisorLogin",
  initialState: initStateLogin,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token-advisor");
      localStorage.removeItem("is_authenticated");
      localStorage.removeItem("advisor");
      state.advisor = "";
      state.access_token = "";
      state.token_type = "";
      state.is_authenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.advisor = action.payload.advisor;
        state.access_token = action.payload.access_token;
        state.token_type = action.payload.token_type;
        state.is_authenticated = true;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.is_authenticated = false;
      });
  },
});

/* export reducer logout */
export const { logout } = advisorLoginSlice.actions;
export default advisorLoginSlice.reducer;
