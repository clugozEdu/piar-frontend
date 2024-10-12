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
import PropTypes from "prop-types";
import { Chip, MenuItem, Menu } from "@mui/material";
import { Flag } from "@mui/icons-material";
// import { getColorsScheme, priorityColors } from "@/utilities/helpers";
// import { handlerUpdateBD } from "../../../supabaseServices";
// import useUser from "../../../context/users";

// Opciones de prioridad
const initialItemsMenu = [
  {
    id: "3e777c25-bd01-4f46-9610-4779cc353e83",
    label: "Alta",
  },
  {
    id: "164ae4c6-f030-4d67-a4d7-255e1235d6b3",
    label: "Baja",
  },
  {
    id: "fc4773b3-00dc-4535-b710-22c3f0df6c14",
    label: "Media",
  },
  {
    id: 4,
    label: "Urgente",
  },
];

const PriorityChip = ({ priority, idTask }) => {
  // const { advisorLogin } = useUser();
  const [itemsMenu, setItemsMenu] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  // Actualizar el estado de las opciones de prioridad
  useEffect(() => {
    if (priority) {
      setItemsMenu(initialItemsMenu.filter((item) => item.id !== priority.id));
    }
  }, [priority]);

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
  const handlePriorityUpdate = (e) => {
    console.log(`Prioridad seleccionada: ${e.target.id} de la tarea ${idTask}`);
    // Actualizar la base de datos

    handleMenuClose();
  };

  return (
    <>
      <Chip
        label={priority.name}
        icon={
          <Flag
            sx={
              {
                // fill: "white",
              }
            }
          />
        }
        onClick={(e) => handleMenuClick(e)}
        sx={{
          backgroundColor: "transparent",
          "&:hover": {
            backgroundColor: "transparent", // Mantener el color de fondo original
          },
          // color: "white",
          mr: 1,
        }}
      />
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{}}
      >
        {itemsMenu.map((item) => (
          <MenuItem
            id={item.id}
            key={item.id}
            onClick={(e) => {
              handlePriorityUpdate(e);
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

// Validar props del componente PriorityChip
PriorityChip.propTypes = {
  priority: PropTypes.object.isRequired,
  idTask: PropTypes.string,
};

export default PriorityChip;
