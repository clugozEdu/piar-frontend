import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getData, deleteData } from "@/services/api";
import { Trash2, Ban } from "lucide-react";
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import "../../../styles.css";

const handleDelete = (
  nameItem,
  setRedirect,
  onClose,
  handleOpen,
  pathDelete,
  enqueueSnackbar,
  closeSnackbar
) => {
  onClose();

  // Mostrar la notificación usando notistack
  const action = (snackbarId) => (
    <>
      <Button
        type="button"
        variant="contained"
        style={{ marginRight: "10px" }} // Espaciado entre botones
        onClick={async () => {
          await deleteData(pathDelete); // Ejecutar la eliminación
          setRedirect(true); // Redirigir después de eliminar
          closeSnackbar(snackbarId); // Cerrar la notificación
        }}
        startIcon={<Trash2 size={24} />} // Icono de botón
        sx={{
          backgroundColor: "#0dac3a",
          "&:hover": {
            backgroundColor: "#075f20",
          },
        }}
      >
        Sí, eliminar
      </Button>
      <Button
        type="button"
        variant="contained"
        onClick={() => closeSnackbar(snackbarId)} // Cerrar la notificación al cancelar
        startIcon={<Ban size={24} />}
      >
        Cancelar
      </Button>
    </>
  );

  // Disparar la notificación con la acción personalizada
  enqueueSnackbar(`¿Estás seguro de que deseas eliminar "${nameItem}"?`, {
    variant: "warning", // Tipo de notificación (warning, info, success, etc.)
    persist: true, // No se autocierra, el usuario debe interactuar
    action,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "center",
    },
  });

  handleOpen(false);
};

const ConfirmDeleteItems = ({
  idElement,
  onClose,
  handleOpen,
  pathGet,
  pathDelete,
  pathRedirect = false,
}) => {
  const [nameItem, setNameItem] = useState("");
  const [redirect, setRedirect] = useState(pathRedirect);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar(); // Hook de notistack para mostrar notificaciones

  useEffect(() => {
    // Obtener el nombre del elemento a eliminar
    getData(`${pathGet}`).then((data) => {
      setNameItem(data.title);
    });
  }, [idElement, pathGet]);

  useEffect(() => {
    if (nameItem) {
      handleDelete(
        nameItem,
        setRedirect,
        onClose,
        handleOpen,
        pathDelete,
        enqueueSnackbar,
        closeSnackbar
      );
    }
  }, [
    nameItem,
    onClose,
    handleOpen,
    pathDelete,
    enqueueSnackbar,
    closeSnackbar,
  ]);

  if (redirect) {
    return <Navigate to="/clickFZT/inicio" />;
  }

  return null;
};

ConfirmDeleteItems.propTypes = {
  idElement: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  handleOpen: PropTypes.func.isRequired,
  pathGet: PropTypes.string.isRequired,
  pathDelete: PropTypes.string.isRequired,
  pathRedirect: PropTypes.bool,
};

export default ConfirmDeleteItems;
