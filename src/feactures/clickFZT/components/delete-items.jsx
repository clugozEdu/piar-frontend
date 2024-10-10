import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";
import { getData, deleteData } from "@/services/api";
import PropTypes from "prop-types";
import "../../../styles.css";

const handleDelete = (
  nameItem,
  idElement,
  setRedirect,
  onClose,
  handleOpen
) => {
  onClose();
  Swal.fire({
    title: "¿Estás seguro de eliminar este elemento?",
    text: `Eliminarás el elemento ${nameItem}`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
    animation: true,
  }).then(async (result) => {
    if (result.isConfirmed) {
      await deleteData(`api/clickup/spacing/${idElement}`)
        .then(() => {
          Swal.fire("Eliminado", "El elemento ha sido eliminado", "success");
          setRedirect(true);
        })
        .catch((error) => {
          Swal.fire({
            title: "Error",
            text: `${error.response.data.errorDetails.detail}`,
            icon: "error",
            animation: true,
          });
        });
    }
  });
  handleOpen(false);
};

const ConfirmDeleteItems = ({ idElement, onClose, handleOpen }) => {
  console.log(idElement);
  const [nameItem, setNameItem] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    // Obtener el nombre del elemento a eliminar
    getData(`api/clickup/spacing/${idElement}`).then((data) => {
      setNameItem(data.title);
    });
  }, [idElement]);

  useEffect(() => {
    if (nameItem) {
      handleDelete(nameItem, idElement, setRedirect, onClose, handleOpen);
    }
  }, [nameItem, idElement, onClose, handleOpen]);

  if (redirect) {
    return <Navigate to="/clickup/inicio" />;
  }

  return null;
};

ConfirmDeleteItems.propTypes = {
  idElement: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  handleOpen: PropTypes.func.isRequired,
};

export default ConfirmDeleteItems;
