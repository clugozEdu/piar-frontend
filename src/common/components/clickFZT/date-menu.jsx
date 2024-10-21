import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { Typography, Menu, Box, IconButton } from "@mui/material";
import { CalendarDays } from "lucide-react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { formatDate, getColorsScheme } from "@/utilities/helpers";
import PropTypes from "prop-types";
import { putData } from "@/services/api";
import useLoading from "@/common/hooks/calllbacks/loading";
import { useSnackbar } from "notistack";

const DateMenuCard = ({ text, task, keyUpdate, keyValidate }) => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = useState(null);
  const [dateVisit, setDateVisit] = useState(task[keyUpdate]);
  const { setIsLoading } = useLoading();

  useEffect(() => {
    setDateVisit(task[keyUpdate]);
  }, [task, keyUpdate]);

  // Formatear la fecha para mostrarla en el componente
  const formattedDate = task[keyUpdate]
    ? formatDate(task[keyUpdate])
    : "Sin Fecha";

  const handleDateChange = async (newValue) => {
    handleMenuClose();

    const formatNewValue = newValue ? new Date(newValue) : null;

    // Perform validation
    let isValid = true;
    let errorMessage = "";

    const validateDate = task[keyValidate] ? new Date(task[keyValidate]) : null;

    if (keyUpdate === "start_date") {
      if (validateDate && formatNewValue && formatNewValue > validateDate) {
        isValid = false;
        errorMessage =
          "La fecha de inicio no puede ser mayor que la fecha de fin";
      }
    } else if (keyUpdate === "end_date") {
      if (validateDate && formatNewValue && formatNewValue < validateDate) {
        isValid = false;
        errorMessage =
          "La fecha de fin no puede ser menor que la fecha de inicio";
      }
    }

    if (!isValid) {
      // Show error message using enqueueSnackbar
      enqueueSnackbar(errorMessage, {
        variant: "error",
        autoHideDuration: 3000,
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
      });
      setIsLoading(false);
      return;
    }

    // Proceed with API call
    setIsLoading(true);
    try {
      setDateVisit(newValue);
      const dataPost = {
        [keyUpdate]: formatNewValue,
      };
      await putData(`api/clickfzt/tasks/${task.id}`, dataPost);
    } catch (error) {
      // Show error message from API error
      const apiErrorMessage =
        error.response?.data?.errorDetails?.detail ||
        "Error al actualizar la fecha";
      enqueueSnackbar(apiErrorMessage, {
        variant: "error",
        autoHideDuration: 3000,
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
      });
    } finally {
      setIsLoading(false);
    }
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

// Validate the component's props
DateMenuCard.propTypes = {
  text: PropTypes.string.isRequired,
  task: PropTypes.object.isRequired,
  keyUpdate: PropTypes.string.isRequired,
  keyValidate: PropTypes.string.isRequired,
};

export default DateMenuCard;
