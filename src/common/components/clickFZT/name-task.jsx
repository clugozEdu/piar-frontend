import { useState } from "react";
import {
  Box,
  Menu,
  Typography,
  TextField,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material";
import PropTypes from "prop-types";
import { TypeOutline } from "lucide-react";
import { Link } from "react-router-dom";
import { putData } from "@/services/api";
import { getColorsScheme } from "@/utilities/helpers";

const TitleMenu = ({ task, setShowAlert }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [newTitle, setNewTitle] = useState(task.title || "");
  const theme = useTheme();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setNewTitle(task.title || ""); // Reiniciar el título al abrir el menú
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUpdateTitle = async () => {
    const dataPost = {
      title: newTitle,
    };
    await putData(`api/clickup/tasks/${task.id}`, dataPost);
    setShowAlert(true);
    handleMenuClose();
  };

  return (
    <>
      <Box display={"flex"} alignItems={"center"}>
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
          <TypeOutline
            size={20}
            color={getColorsScheme(task.status.name, theme.palette.statusTask)}
          />
        </IconButton>
        <Divider
          orientation={"vertical"}
          flexItem
          sx={{
            mr: 1,
            ml: 1,
            background: getColorsScheme(
              task.status.name,
              theme.palette.statusTask
            ),
          }}
        />
        <Typography
          component={Link}
          sx={{
            textDecoration: "none",
            fontSize: "1rem",
          }}
          color={"text.secondary"}
          to={`clickFZT/task/${task.id}`}
        >
          {task.title}
        </Typography>
      </Box>
      <Menu
        id="menu-name"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <Box p={2}>
          <TextField
            label="Nuevo Título"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            fullWidth
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: "20px",
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleUpdateTitle()}
            sx={{ mt: 2, borderRadius: 2, width: "100%" }}
          >
            Actualizar
          </Button>
        </Box>
      </Menu>
    </>
  );
};

// Validar las props del componente
TitleMenu.propTypes = {
  task: PropTypes.object.isRequired,
  setShowAlert: PropTypes.func,
};

export default TitleMenu;
