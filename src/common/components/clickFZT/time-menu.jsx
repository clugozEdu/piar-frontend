import { useState } from "react";
import {
  Menu,
  MenuItem,
  Typography,
  Box,
  TextField,
  Button,
} from "@mui/material";
import ScheduleIcon from "@mui/icons-material/Schedule";
import PropTypes from "prop-types";
import { convertHours } from "@/utilities/helpers";

const TimeMenu = ({ task }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [inputValue, setInputValue] = useState(task.time_task); // Estado para almacenar el valor ingresado por el usuario

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    // Asegurarse de que el valor ingresado sea numérico
    if (!isNaN(value)) {
      setInputValue(value);
    }
  };

  const handleSaveTime = () => {
    if (inputValue !== null && inputValue !== "") {
      console.log(
        `Guardando tiempo: ${inputValue} hrs para la tarea ${task.id}`
      );
      // Aquí se puede actualizar la base de datos
      handleMenuClose(); // Cerrar el menú después de guardar
    }
  };

  return (
    <>
      <Box display="flex" alignItems="center">
        <ScheduleIcon
          onClick={handleMenuClick}
          sx={{
            mr: 1,
            color: "text.secondary",
            cursor: "pointer",
          }}
        />
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", fontSize: "0.8rem" }}
        >
          {convertHours(task.time_task)} hrs
        </Typography>
      </Box>

      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        // Usamos sx directamente en el componente Menu
        sx={{
          "& .MuiPaper-root": {
            boxShadow: "none", // Eliminar sombra del menú
            border: "1px solid #e0e0e0", // Agregar un borde si lo deseas
          },
        }}
        MenuListProps={{
          sx: {
            padding: 1, // Eliminar padding de la lista
            "& .MuiMenuItem-root": {
              "&:hover": {
                backgroundColor: "transparent", // Eliminar hover
              },
            },
          },
        }}
      >
        <MenuItem
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "200px", // Ajustar el tamaño del menú
            "&:hover": {
              backgroundColor: "transparent", // Eliminar cualquier color de fondo en hover
            },
          }}
        >
          <TextField
            label="Tiempo (horas)"
            type="number" // Solo acepta números
            value={inputValue}
            onChange={handleInputChange}
            sx={{
              marginBottom: 2,
              width: "100%",
              "&:hover": {
                backgroundColor: "transparent", // Evitar hover en TextField
              },
              "& .MuiInputBase-root": {
                borderRadius: "20px",
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleSaveTime}
            sx={{ width: "100%" }}
          >
            Actualizar
          </Button>
        </MenuItem>
      </Menu>
    </>
  );
};

TimeMenu.propTypes = {
  task: PropTypes.object.isRequired,
};

export default TimeMenu;
