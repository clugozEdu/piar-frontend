import { useState, useEffect } from "react";
import { Typography, Box, Menu, Button, IconButton } from "@mui/material";
import { useTheme } from "@emotion/react";
import { FileText } from "lucide-react";
import TextAreaCustom from "./text-area";
import { getColorsScheme } from "@/utilities/helpers";
import { putData } from "@/services/api";
import PropTypes from "prop-types";

const DescriptionMenuCard = ({ task, setShowAlert }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [descriptionTask, setDescriptionTask] = useState(
    task.description || ""
  );
  const [descriptionTruncate, setDescriptionTruncate] =
    useState(descriptionTask);

  // Actualizar el estado de la descripción truncada
  useEffect(() => {
    if (descriptionTask.length > 45) {
      setDescriptionTruncate(descriptionTask.substring(0, 45) + "...");
    } else {
      setDescriptionTruncate(descriptionTask);
    }
  }, [descriptionTask]);

  // Mostrar el menú al hacer clic en el ícono
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setDescriptionTask(task.description || "");
  };

  // Cerrar el menú
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Guardar los cambios en la descripción
  const handleSaveClick = async () => {
    const dataPost = {
      description: descriptionTask,
    };
    await putData(`api/clickup/tasks/${task.id}`, dataPost);
    setShowAlert(true);
    handleMenuClose();
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
          <FileText
            sixe={20}
            color={getColorsScheme(task.status.name, theme.palette.statusTask)}
          />
        </IconButton>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            fontSize: "0.8rem",
            ml: 1,
          }}
        >
          {descriptionTruncate || "Descripción no disponible"}
        </Typography>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <Box sx={{ p: 1, maxWidth: 500 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontSize: "0.8rem",
            }}
          >
            Descripción
          </Typography>
          <TextAreaCustom
            minRows={3}
            value={descriptionTask}
            onChange={(e) => setDescriptionTask(e.target.value)}
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              color="error"
              onClick={handleMenuClose}
              sx={{ mt: 1, mr: 1 }}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSaveClick()}
              sx={{ mt: 1 }}
            >
              Guardar
            </Button>
          </Box>
        </Box>
      </Menu>
    </>
  );
};

// Validar las props del componente
DescriptionMenuCard.propTypes = {
  // description: PropTypes.object,
  task: PropTypes.object,
  setShowAlert: PropTypes.func,
};

export default DescriptionMenuCard;
