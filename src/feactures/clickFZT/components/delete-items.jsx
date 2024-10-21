import { useState, useEffect } from "react";
import Swal from "sweetalert2";
// import { Navigate } from "react-router-dom";
import { getData, deleteData } from "@/services/api";
import PropTypes from "prop-types";
import "../../../styles.css";

const handleDelete = (
  nameItem,
  // setRedirect,
  onClose,
  handleOpen,
  pathDelete
) => {
  onClose();
  Swal.fire({
    title: "¿Estás seguro de eliminar este elemento?",
    html: `Eliminarás <strong>${nameItem}</strong>`, // Usamos <strong> para poner en negrita
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#0d1f2d",
    cancelButtonColor: "#f44336",
    background: "#f0f4f8",
    animation: true,
  }).then(async (result) => {
    if (result.isConfirmed) {
      await deleteData(pathDelete);
    }
  });
  handleOpen(false);
};

const ConfirmDeleteItems = ({
  idElement,
  onClose,
  handleOpen,
  pathGet,
  pathDelete,
}) => {
  const [nameItem, setNameItem] = useState("");
  // const [redirect, setRedirect] = useState(false);

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
        // setRedirect,
        onClose,
        handleOpen,
        pathDelete
      );
    }
  }, [nameItem, onClose, handleOpen, pathDelete]);

  // if (redirect) {
  //   return <Navigate to="/clickFZT/inicio" />;
  // }

  return null;
};

ConfirmDeleteItems.propTypes = {
  idElement: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  handleOpen: PropTypes.func.isRequired,
  pathGet: PropTypes.string.isRequired,
  pathDelete: PropTypes.string.isRequired,
};

export default ConfirmDeleteItems;
