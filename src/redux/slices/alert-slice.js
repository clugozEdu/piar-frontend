// alertSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Object with the messages for each event
const eventMessages = {
  task_created: "Tarea creada con éxito",
  task_deleted: "Tarea eliminada con éxito",
  task_updated: "Tarea actualizada con éxito",
  spacing_updated: "Espacio actualizado con éxito",
  spacing_deleted: "Espacio eliminado con éxito",
  spacing_created: "Espacio creado con éxito",
  list_updated: "Lista actualizada con éxito",
  list_deleted: "Lista eliminada con éxito",
  list_created: "Lista creada con éxito",
};

const alertSlice = createSlice({
  name: "alert",
  initialState: {
    showAlert: false,
    messageAlert: "",
  },
  reducers: {
    setAlert: (state, action) => {
      state.showAlert = true;
      // Map the event to the corresponding message
      const event = action.payload.event;
      const message = eventMessages[event] || "Acción realizada con éxito";
      state.messageAlert = message;
    },
    clearAlert: (state) => {
      state.showAlert = false;
      state.messageAlert = "";
    },
  },
});

export const { setAlert, clearAlert } = alertSlice.actions;
export default alertSlice.reducer;
