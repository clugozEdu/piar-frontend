import { useState } from "react";
import { useTheme } from "@emotion/react";
import {
  Menu,
  Typography,
  Box,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { Clock } from "lucide-react";
import PropTypes from "prop-types";
import { convertHours, getColorsScheme } from "@/utilities/helpers";
import { putData } from "@/services/api";

const TimeMenu = ({ task, setShowAlert }) => {
  const theme = useTheme();
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
    if (!isNaN(value) && value <= 24) {
      setInputValue(value);
    }
  };

  const handleSaveTime = () => {
    if (inputValue !== null && inputValue !== "") {
      const dataPost = {
        time_task: inputValue,
      };

      putData(`api/clickup/tasks/${task.id}`, dataPost);
      setShowAlert(true);

      handleMenuClose();
    }
  };

  return (
    <>
      <Box display="flex" alignItems="center">
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
          <Clock
            size={24}
            color={getColorsScheme(task.status.name, theme.palette.statusTask)}
          />
        </IconButton>

        <Typography
          variant="body2"
          sx={{ color: "text.secondary", fontSize: "0.8rem", ml: 1 }}
        >
          {convertHours(task.time_task)} hrs
        </Typography>
      </Box>

      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <Box sx={{ p: 2 }}>
          <TextField
            label="Tiempo (horas)"
            type="number"
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
            slotProps={{
              inputProps: {
                min: 0,
                max: 24,
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
        </Box>
      </Menu>
    </>
  );
};

TimeMenu.propTypes = {
  task: PropTypes.object.isRequired,
  setShowAlert: PropTypes.func,
};

export default TimeMenu;
