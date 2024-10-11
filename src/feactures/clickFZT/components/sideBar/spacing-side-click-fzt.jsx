import { useState } from "react";
import {
  Box,
  Collapse,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  ExpandLess,
  ExpandMore,
  Folder,
  FolderOpen,
  MoreVert,
  Delete,
} from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import ListIcon from "@mui/icons-material/List";
import PropTypes from "prop-types";
import ConfirmDeleteItems from "../delete-items";
// import CreateDialog from "../create-dialog";
import AddList from "../add-lists";
import SnackbarMessage from "@/common/components/ui/snackbar";

/** Component SpacingList
 * Render the list of spacings and lists for the advisor
 * @param {array} spacings - Array with the spacings
 * @param {object} open - Object with the spacings open
 * @param {func} handleClick - Function to open and close item list
 * @param {func} handleMenuClick - Function to open menu
 * @param {boolean} isResponsible - Boolean to check if the advisor is responsible
 */
const SpacingsList = ({
  spacings,
  open,
  handleClick,
  handleMenuClick,
  context,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertDelete, setIsAlertDelete] = useState(false);
  const [selectedSpacing, setSelectedSpacing] = useState("");
  const [selectedList, setSelectedList] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleEditList = (e, idList, idSpacing) => {
    e.preventDefault();
    console.log("Edit list", idList);
    setSelectedList(idList);
    setIsDialogOpen(true);
    setSelectedSpacing(idSpacing);
  };

  const handleDeleteList = (e, idList) => {
    e.preventDefault();
    setIsAlertDelete(true);
    setSelectedList(idList);
    console.log("Delete list", idList);
  };

  return (
    <div>
      {isAlertDelete && (
        <ConfirmDeleteItems
          pathGet={`api/clickup/list/${selectedList}`}
          pathDelete={`api/clickup/list/${selectedList}`}
          handleOpen={setIsDialogOpen}
          onClose={() => {
            setIsDialogOpen(false);
            setIsAlertDelete(false);
            setSelectedList("");
            setSelectedSpacing("");
          }}
          idElement={selectedList}
        />
      )}

      {isDialogOpen && (
        <AddList
          openDialog={isDialogOpen}
          setOpenDialog={setIsDialogOpen}
          setShowAlert={setShowAlert}
          context={"editList"}
          idList={selectedList}
          idSpacing={selectedSpacing}
        />
      )}

      {showAlert && (
        <SnackbarMessage
          open={showAlert}
          message="Lista editada correctamente"
          title={"Completado"}
          onCloseHandler={() => {
            setShowAlert(false);
          }}
          duration={3000}
          severity="success"
          vertical="bottom"
          horizontal="left"
        />
      )}

      {/* Filtrar según el contexto (owner o shared) */}
      {spacings.map(
        (spacing) =>
          ((context === "owner" && spacing.isOwner) ||
            (context === "shared" && !spacing.isOwner)) && (
            <div
              key={spacing.id}
              style={{
                marginBottom: 12,
                boxShadow: open[spacing.id]
                  ? "0px 0px 4px rgba(0, 0, 0, 0.1)"
                  : "none",
                borderRadius: 8,
              }}
            >
              {/* Render Items */}
              <ListItemButton
                component={Link}
                to={`clickFZT/spacing/${spacing.id}`}
                sx={{
                  padding: 0.5,
                  // padding: 0,
                  mb: open[spacing.id] ? 0 : 1,
                  borderRadius: open[spacing.id] ? "5px 5px 0 0" : 5,
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                  // boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(e, spacing.id);
                }}
              >
                {/* Icono de la carpeta */}
                {open[spacing.id] ? (
                  <FolderOpen sx={{ fill: "#578e22" }} />
                ) : (
                  <Folder sx={{ fill: "#578e22" }} />
                )}
                {/* Nombre del espacio */}
                <ListItemText primary={spacing.title} sx={{ pl: 0.5 }} />

                {/* Icono para expandir/cerrar */}
                <IconButton>
                  {open[spacing.id] ? <ExpandLess /> : <ExpandMore />}
                </IconButton>

                {/* Más opciones */}
                <IconButton onClick={(e) => handleMenuClick(e, spacing.id)}>
                  <MoreVert />
                </IconButton>
              </ListItemButton>

              {/* Collapse content list */}
              <Collapse
                in={open[spacing.id]}
                timeout="auto"
                unmountOnExit
                sx={{
                  boxShadow: open[spacing.id]
                    ? "0px 4px 10px rgba(0, 0, 0, 0.1)"
                    : "none",
                  borderRadius: "0 0 8px 8px",
                  pl: 1,
                }}
              >
                <List component="div" disablePadding>
                  {spacing?.lists?.map((list) => (
                    <ListItemButton
                      id="list-item-button"
                      key={list.id}
                      component={Link}
                      to={`clickFZT/spacings/${spacing.id}/list/${list.id}`}
                      sx={{
                        mt: 1,
                        mb: 1,
                        p: "0px 10px 0px 0px",
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      <ListIcon sx={{ fill: "#0084cb" }} />
                      {/* Nombre de la lista */}
                      <ListItemText sx={{ pl: 1 }} primary={list.title} />
                      {/* Botón eliminar si es dueño */}
                      {list.isOwner || spacing.isOwner ? (
                        <>
                          <Box
                            id="box-edit-list"
                            display={"flex"}
                            sx={{
                              margin: "0px 10px 0px 0px",
                            }}
                          >
                            <Tooltip title={"Editar Lista"}>
                              <IconButton
                                edge="end"
                                onClick={(e) =>
                                  handleEditList(e, list.id, spacing.id)
                                }
                              >
                                <EditIcon sx={{ fill: "#0084cb" }} />
                              </IconButton>
                            </Tooltip>
                          </Box>
                          <Box display={"flex"}>
                            <Tooltip title={"Eliminar Lista"}>
                              <IconButton
                                edge="end"
                                onClick={(e) => handleDeleteList(e, list.id)}
                              >
                                <Delete sx={{ fill: "#0084cb" }} />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </>
                      ) : null}
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </div>
          )
      )}
    </div>
  );
};

/** PropTypes SpacingsList
 * @param {array} spacings - Array with the spacings
 * @param {object} open - Object with the spacings open
 * @param {func} handleClick - Function to open and close item list
 * @param {func} handleMenuClick - Function to open menu
 * @param {boolean} isResponsible - Boolean to check if the advisor is responsible
 */
SpacingsList.propTypes = {
  spacings: PropTypes.array.isRequired,
  open: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleMenuClick: PropTypes.func.isRequired,
  context: PropTypes.string,
};

export default SpacingsList;
