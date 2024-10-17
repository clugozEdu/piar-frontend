import { useState } from "react";
import { useTheme } from "@emotion/react";
import { Typography, Menu, Box, IconButton } from "@mui/material";
import { CalendarDays } from "lucide-react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { formatDate, getColorsScheme } from "@/utilities/helpers";
import PropTypes from "prop-types";
import { putData } from "@/services/api";

const DateMenuCard = ({ text, task, keyUpdate, setShowAlert }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [dateVisit, setDateVisit] = useState(task[keyUpdate]);

  // Formatear la fecha para mostrarla en el componente
  const formattedDate = task[keyUpdate]
    ? formatDate(task[keyUpdate])
    : "Sin Fecha";

  const handleDateChange = async (newValue) => {
    setDateVisit(newValue);

    const formattedDate = newValue ? new Date(newValue) : null;

    const dataPost = {
      [keyUpdate]: formattedDate,
    };

    await putData(`api/clickup/tasks/${task.id}`, dataPost);
    setShowAlert(true);
    handleMenuClose();
  };

  // Mostrar el menú al hacer clic en el icono
  const handleIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Cerrar el menú
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box display="flex" alignItems="center">
        <IconButton
          sx={{
            padding: 0,
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
            borderRadius: 1,
          }}
          onClick={handleIconClick}
        >
          <CalendarDays
            size={24}
            color={getColorsScheme(task.status.name, theme.palette.statusTask)}
          />
        </IconButton>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: "0.8rem",
            ml: 1,
          }}
        >
          {text} {formattedDate}
        </Typography>
      </Box>

      <Menu
        id="menu-calendar"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <Box sx={{ p: 1 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateCalendar
              views={["month", "day"]}
              value={dateVisit ? new Date(dateVisit) : null}
              onChange={handleDateChange}
              format="dd/MM/yyyy"
            />
          </LocalizationProvider>
        </Box>
      </Menu>
    </>
  );
};

// Validar las props del componente
DateMenuCard.propTypes = {
  date: PropTypes.string,
  text: PropTypes.string,
  task: PropTypes.object,
  keyUpdate: PropTypes.string,
  setShowAlert: PropTypes.func,
};

export default DateMenuCard;
