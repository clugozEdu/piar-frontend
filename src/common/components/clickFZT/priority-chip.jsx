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
import SnackbarMessage from "../ui/snackbar";
import useLoading from "@/common/hooks/calllbacks/loading";

// Opciones de prioridad
const PriorityChip = ({ priority, task, setShowAlert, priorityTask }) => {
  // const { advisorLogin } = useUser();
  const [itemsMenu, setItemsMenu] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const theme = useTheme();
  const { setIsLoading } = useLoading();

  // Actualizar el estado de las opciones de prioridad
  useEffect(() => {
    if (priority) {
      setItemsMenu(priorityTask?.filter((item) => item.id !== priority.id));
    } else {
      setItemsMenu(priorityTask);
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
    setIsLoading(true);
    try {
      const priorityId = e.currentTarget.dataset.id; // Accede al data-id
      const dataPost = {
        priority_id: priorityId,
      };
      await putData(`api/clickfzt/tasks/${task.id}`, dataPost);
      setShowAlert(true);
      handleMenuClose();
    } catch (error) {
      setError(true);
      setMessage(error.response.data.errorDetails.detail);
      handleMenuClose();
      setIsLoading(false);
    }
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
            color={
              priority
                ? getColorsScheme(priority.name, theme.palette.priorityTask)
                : "gray"
            }
            size={24}
          />
        </IconButton>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: "0.8rem", ml: 1 }}
        >
          {priority ? priority.name : "Sin prioridad"}
        </Typography>
      </Box>

      <Menu
        id="priority-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {itemsMenu.length > 0 &&
          itemsMenu.map((item) => (
            <MenuItem
              data-id={item.id} // Usa data-id en lugar de id
              key={item.id}
              onClick={handlePriorityUpdate}
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
      {error && (
        <SnackbarMessage
          open={error}
          message={`${message}`}
          title={"Error"}
          onCloseHandler={() => {
            setError(false);
          }}
          duration={3000}
          severity="error"
          vertical="bottom"
          horizontal="right"
        />
      )}
    </>
  );
};

// Validar props del componente PriorityChip
PriorityChip.propTypes = {
  priority: PropTypes.object,
  task: PropTypes.object,
  setShowAlert: PropTypes.func,
  priorityTask: PropTypes.array,
};

export default PriorityChip;
