import { useEffect, useState } from "react";
import { Box, Menu, MenuItem, IconButton } from "@mui/material";
import { useTheme } from "@emotion/react";
import { ArrowRightLeft } from "lucide-react";
import { getColorsScheme } from "@/utilities/helpers";
import { putData } from "@/services/api";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import { isValid } from "date-fns";

const MenuCards = ({ task, statusTask }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [itemsMenu, setItemsMenu] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();

  // Get the backlog status
  const backlogStatus = statusTask.find((status) => status.name === "Backlog");

  // Filter statuses to exclude the current one
  useEffect(() => {
    setItemsMenu(statusTask?.filter((item) => item.id !== task.status.id));
  }, [task.status.id, statusTask]);

  const handleMenuClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const onClickHandler = async (e) => {
    const newStatusId = e.currentTarget.id;

    // Check if current status is "Backlog"
    if (backlogStatus && task.status.id === backlogStatus.id) {
      // Perform validation
      let errors = [];

      // Validate title
      if (!task.title || task.title.trim() === "") {
        errors.push("El título es requerido.");
      }

      // Validate start_date
      if (!task.start_date) {
        errors.push("La fecha de inicio es requerida.");
      }

      // Validate end_date
      if (!task.end_date) {
        errors.push("La fecha de fin es requerida.");
      }

      // Validate that end_date is after start_date
      if (task.start_date && task.end_date) {
        const startDate = new Date(task.start_date);
        const endDate = new Date(task.end_date);
        if (isValid(startDate) && isValid(endDate)) {
          if (endDate < startDate) {
            errors.push(
              "La fecha de fin debe ser posterior a la fecha de inicio."
            );
          }
        }
      }

      // Validate time_task
      if (!task.time_task || task.time_task <= 0) {
        errors.push("El tiempo de tarea debe ser mayor a 0.");
      }

      // Validate priority
      if (!task.priority) {
        errors.push("Debe seleccionar una prioridad.");
      }

      // If there are errors, display them and prevent the status change
      if (errors.length > 0) {
        errors.forEach((error) => {
          enqueueSnackbar(error, { variant: "error" });
        });
        handleMenuClose();
        return; // Prevent the status change
      }
    }

    // Proceed with status change
    const dataPost = {
      status_id: newStatusId,
    };
    try {
      await putData(`api/clickfzt/tasks/${task.id}`, dataPost);
    } catch (error) {
      // Handle error from API
      const errorMessage =
        error.response?.data?.errorDetails?.detail ||
        "Error al actualizar el estado de la tarea.";
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
    handleMenuClose();
  };

  return (
    <Box
      display="flex"
      sx={{
        alignItems: "center",
        pl: 1,
      }}
    >
      <IconButton
        onClick={handleMenuClick}
        sx={{
          padding: 0,
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
          borderRadius: 1,
        }}
      >
        <ArrowRightLeft
          size={20}
          color={getColorsScheme(task.status.name, theme.palette.statusTask)}
        />
      </IconButton>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {itemsMenu?.map((item, index) => (
          <MenuItem key={index} id={item.id} onClick={onClickHandler}>
            {item.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

MenuCards.propTypes = {
  task: PropTypes.object.isRequired,
  statusTask: PropTypes.array.isRequired,
};

export default MenuCards;
