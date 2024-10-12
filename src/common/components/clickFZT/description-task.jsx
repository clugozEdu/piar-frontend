import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Typography, Box, Menu, Button } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import TextAreaCustom from "./text-area";
// import { handlerUpdateBD } from "../../../supabaseServices";
// import useUser from "../../../context/users";

const DescriptionMenuCard = ({ description, taskID }) => {
  // const { advisorLogin } = useUser();
  const [anchorEl, setAnchorEl] = useState(null);
  const [descriptionTask, setDescriptionTask] = useState(description);
  const [descriptionTruncate, setDescriptionTruncate] = useState(description);
  const [tempDescription, setTempDescription] = useState(description);

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
    setTempDescription(descriptionTask); // Establecer la descripción temporal al abrir el menú
  };

  // Cerrar el menú
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Guardar los cambios en la descripción
  const handleSaveClick = async () => {
    setDescriptionTask(tempDescription);
    console.log(
      `Descripción actualizada: ${tempDescription} de la tarea ${taskID}`
    );

    handleMenuClose();
  };

  return (
    <>
      <Box display="flex" alignItems="center">
        <DescriptionIcon
          sx={{ mr: 1, color: "text.secondary", cursor: "pointer" }}
          onClick={handleMenuClick}
        />
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            fontSize: "0.8rem",
          }}
        >
          {descriptionTruncate || "Descripción no disponible"}
        </Typography>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
      >
        <Box sx={{ p: 2, maxWidth: 500 }}>
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
            value={tempDescription}
            onChange={(e) => setTempDescription(e.target.value)}
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              color="error"
              onClick={handleMenuClose}
              sx={{ mt: 1, mr: 1 }}
            >
              Cancelar
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleSaveClick}
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
  description: PropTypes.string,
  taskID: PropTypes.string,
};

export default DescriptionMenuCard;
