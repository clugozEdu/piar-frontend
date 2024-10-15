import { useState, useEffect } from "react";
import Swal from "sweetalert2";
// import { Navigate } from "react-router-dom";
import { getData, deleteData } from "@/services/api";
import PropTypes from "prop-types";
import "../../../styles.css";

const handleDelete = (
  nameItem,
  idElement,
  // setRedirect,
  onClose,
  handleOpen,
  pathDelete
) => {
  onClose();
  Swal.fire({
    title: "¿Estás seguro de eliminar este elemento?",
    text: `Eliminarás  ${nameItem}`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
    // background: "linear-gradient(to top, #578e22,  #0084cb)",
    // color: "#ffffff",
    animation: true,
  }).then(async (result) => {
    if (result.isConfirmed) {
      await deleteData(pathDelete)
        .then(() => {
          Swal.fire("Eliminado", "El elemento ha sido eliminado", "success");
          // setRedirect(true);
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
        idElement,
        // setRedirect,
        onClose,
        handleOpen,
        pathDelete
      );
    }
  }, [nameItem, idElement, onClose, handleOpen, pathDelete]);

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
