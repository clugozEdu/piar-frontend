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
import { useTheme } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import {
  Folder,
  FolderOpen,
  ChevronDown,
  ChevronUp,
  Ellipsis,
  ListCollapse,
  Pencil,
  ListX,
} from "lucide-react";

import PropTypes from "prop-types";
import ConfirmDeleteItems from "../delete-items";
import AddList from "../add-lists";
import SnackbarMessage from "@/common/components/ui/snackbar";

const SpacingSideClickFZT = ({
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
  const { spacingId, listId } = useParams();
  const theme = useTheme();

  const handleEditList = (e, idList, idSpacing) => {
    e.preventDefault();
    setSelectedList(idList);
    setIsDialogOpen(true);
    setSelectedSpacing(idSpacing);
  };

  const handleDeleteList = (e, idList) => {
    e.preventDefault();
    setIsAlertDelete(true);
    setSelectedList(idList);
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
          horizontal="right"
        />
      )}

      {/* Filter according to context (owner or shared) */}
      {spacings.map(
        (spacing) =>
          ((context === "owner" && spacing.isOwner) ||
            (context === "shared" && !spacing.isOwner)) && (
            <div
              key={spacing.id}
              style={{
                marginBottom: "10px",
                boxShadow: open[spacing.id]
                  ? "0px 0px 4px rgba(0, 0, 0, 0.1)"
                  : "none",
                borderRadius: 8,
              }}
            >
              {/* Render Items */}
              <ListItemButton
                id="spacing-item-button"
                component={spacing.isOwner ? Link : "div"}
                to={spacing.isOwner ? `clickFZT/spacing/${spacing.id}` : "#"}
                sx={{
                  padding: 0.5,
                  mb: open[spacing.id] ? 0.5 : 0.5,
                  borderRadius: open[spacing.id] ? "5px 5px 0 0" : 5,
                  backgroundColor:
                    open[spacing.id] || spacingId === spacing.id
                      ? theme.palette.action.selected
                      : "transparent",
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
                // Remove the onClick handler from ListItemButton
              >
                {/* Folder Icon */}
                {open[spacing.id] ? (
                  <FolderOpen size={24} color={theme.palette.secondary.main} />
                ) : (
                  <Folder size={24} color={theme.palette.secondary.main} />
                )}
                {/* Spacing Name */}
                <ListItemText primary={spacing.title} sx={{ pl: 0.5 }} />

                {/* Expand/Collapse Icon */}
                <IconButton
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation(); // Prevent navigation
                    handleClick(e, spacing.id);
                  }}
                  sx={{
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  {open[spacing.id] ? (
                    <ChevronUp size={20} color={theme.palette.secondary.main} />
                  ) : (
                    <ChevronDown
                      size={20}
                      color={theme.palette.secondary.main}
                    />
                  )}
                </IconButton>

                {/* More Options */}
                <IconButton
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation(); // Prevent navigation
                    handleMenuClick(e, spacing.id);
                  }}
                  sx={{
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  <Ellipsis size={20} color={theme.palette.primary.main} />
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
                  pr: 1,
                }}
              >
                <List component="div" disablePadding>
                  {spacing?.lists?.map((list) => (
                    <ListItemButton
                      id="list-item-button"
                      key={list.id}
                      component={Link}
                      to={`clickFZT/spacing/${spacing.id}/list/${list.id}`}
                      sx={{
                        mt: 1,
                        mb: 1,
                        p: "0px 10px 0px 0px",
                        borderRadius: 2,
                        background:
                          listId === list.id
                            ? theme.palette.action.selected
                            : "transparent",
                        "&:hover": {
                          backgroundColor: theme.palette.action.hover,
                        },
                      }}
                    >
                      <ListCollapse
                        size={18}
                        color={theme.palette.primary.secondary}
                      />
                      {/* List Name */}
                      <ListItemText sx={{ pl: 1 }} primary={list.title} />

                      {/* Edit/Delete Buttons if owner */}
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
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation(); // Prevent navigation
                                  handleEditList(e, list.id, spacing.id);
                                }}
                                sx={{
                                  "&:hover": {
                                    backgroundColor: "transparent",
                                  },
                                }}
                              >
                                <Pencil
                                  size={18}
                                  color={theme.palette.primary.secondary}
                                />
                              </IconButton>
                            </Tooltip>
                          </Box>
                          <Box display={"flex"}>
                            <Tooltip title={"Eliminar Lista"}>
                              <IconButton
                                edge="end"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation(); // Prevent navigation
                                  handleDeleteList(e, list.id);
                                }}
                                sx={{
                                  "&:hover": {
                                    backgroundColor: "transparent",
                                  },
                                }}
                              >
                                <ListX
                                  size={18}
                                  color={theme.palette.primary.secondary}
                                />
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

SpacingSideClickFZT.propTypes = {
  spacings: PropTypes.array.isRequired,
  open: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleMenuClick: PropTypes.func.isRequired,
  context: PropTypes.string,
};

export default SpacingSideClickFZT;
