/**
 * Componente PriorityChip
 * - Este componente muestra un chip con la prioridad de una tarea
 * - Al hacer clic en el chip, se despliega un menú con opciones de prioridad
 * - El usuario puede seleccionar una opción y esta se actualiza en la base de datos
 * * Props:
 * - priority: object - Prioridad de la tarea
 * - priority.id: number - ID de la prioridad
 * - priority.priority_name: string - Nombre de la prioridad
 * - idTask: number - ID de la tarea
 * * Dependencias:
 * - initialItemsMenu: array - Arreglo con las opciones de prioridad
 */

import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import PropTypes from "prop-types";
import { Box, MenuItem, Menu, IconButton, Typography } from "@mui/material";
import { Flag } from "lucide-react";
import { getColorsScheme } from "@/utilities/helpers";
import { putData } from "@/services/api";

// Opciones de prioridad
const PriorityChip = ({ priority, task, setShowAlert, priorityTask }) => {
  // const { advisorLogin } = useUser();
  const [itemsMenu, setItemsMenu] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();

  // Actualizar el estado de las opciones de prioridad
  useEffect(() => {
    if (priority) {
      setItemsMenu(priorityTask?.filter((item) => item.id !== priority.id));
    }
  }, [priority, priorityTask]);

  // Mostrar el menú al hacer clic en el chip
  const handleMenuClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  // Cerrar el menú de prioridades
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Actualizar la prioridad de la tarea
  const handlePriorityUpdate = async (e) => {
    const dataPost = {
      priority_id: e.target.id,
    };

    await putData(`api/clickup/tasks/${task.id}`, dataPost);
    setShowAlert(true);

    // Actualizar la base de datos
    handleMenuClose();
  };

  return (
    <>
      <Box display="flex" alignItems="center">
        <IconButton
          onClick={(e) => handleMenuClick(e)}
          sx={{
            padding: 0,
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
            borderRadius: 1,
          }}
        >
          <Flag
            color={getColorsScheme(priority.name, theme.palette.priorityTask)}
            size={24}
          />
        </IconButton>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: "0.8rem", ml: 1 }}
        >
          {priority.name}
        </Typography>
      </Box>

      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {itemsMenu?.map((item) => (
          <MenuItem
            id={item.id}
            key={item.id}
            onClick={(e) => {
              handlePriorityUpdate(e);
            }}
          >
            <Flag
              color={getColorsScheme(item.name, theme.palette.priorityTask)}
              size={24}
            />
            <Typography variant="body2" sx={{ ml: 1 }}>
              {item.name}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

// Validar props del componente PriorityChip
PriorityChip.propTypes = {
  priority: PropTypes.object.isRequired,
  task: PropTypes.object,
  setShowAlert: PropTypes.func,
  priorityTask: PropTypes.array,
};

export default PriorityChip;
