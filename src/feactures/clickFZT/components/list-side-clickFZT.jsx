import { useEffect, useState, useCallback } from "react";
import {
  List,
  ListItemText,
  ListItemButton,
  Collapse,
  IconButton,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  Folder,
  FolderOpen,
  CreateNewFolder,
  Home,
  MoreVert,
  Add,
  Delete,
} from "@mui/icons-material";
import ListIcon from "@mui/icons-material/List";
import EditIcon from "@mui/icons-material/Edit";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getData } from "@/services/api";
import CreateDialog from "./create-dialog";
import AddSpacing from "../forms/add-spacing";
import AddList from "../forms/addList";
import ConfirmDeleteItems from "./delete-items";
import SnackbarMessage from "@/common/components/ui/snackbar";
import useWebSocket from "@/common/hooks/web-socket";

const ListSideClickFZT = ({ advisorLogin }) => {
  const token = localStorage.getItem("token-advisor");
  const [open, setOpen] = useState({});
  const [spacings, setSpacings] = useState([]);
  const [isResponsible, setIsResponsible] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSpacing, setSelectedSpacing] = useState(null);
  const [contextDialog, setContextDialog] = useState("");
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const message = useWebSocket("http://192.168.1.197/ws", token);

  // Function to fetch spacings and update state
  const fetchSpacings = useCallback(() => {
    getData(`api/clickup/spacing/advisor/${advisorLogin.id}`).then((data) => {
      setSpacings(data);
      // determine resposible spacing
      setIsResponsible(
        data.some((spacing) => spacing.owner_advisor.id === advisorLogin.id)
      );
    });
  }, [advisorLogin.id]);

  // Fetch spacings on initial render
  useEffect(() => {
    fetchSpacings();
  }, [fetchSpacings]);

  // Handle websocket messages
  useEffect(() => {
    const event = message[0]?.event;
    if (event === "spacing_created") {
      fetchSpacings();
    }
  }, [message, fetchSpacings]);

  // handle to open and close item list
  const handleClick = useCallback((e, id) => {
    e.preventDefault();
    setOpen((prevOpen) => ({
      ...prevOpen,
      [id]: !prevOpen[id],
    }));
    setSelectedSpacing(id);
  }, []);

  // handle to open menu to item list and set spacing id
  const handleMenuClick = useCallback((event, spacingId) => {
    event.preventDefault();
    setSelectedSpacing(spacingId);
    setAnchorEl(event.currentTarget);
  }, []);

  // handle to close menu to item list and reset spacing id
  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
    setSelectedSpacing(null);
  }, []);

  // handle to delete spacing and open delete confirmation
  const handleDeleteClick = () => {
    setIsDeleteConfirmOpen(true);
  };

  // handle to create new spacing
  const handleCreateSpacing = () => {
    setContextDialog("createSpacing");
    setIsDialogOpen(true);
  };

  const handleEditSpacing = () => {
    setContextDialog("editSpacing");
    handleMenuClose();
    setIsDialogOpen(true);
  };

  // handle to create new list
  const handleCreateList = () => {
    console.log(selectedSpacing);
    handleMenuClose();
    setContextDialog("createList");
    setIsDialogOpen(true);
  };

  // handle to close dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  // get component dialog to show depending on the context
  const getDialogComponent = () => {
    switch (contextDialog) {
      case "createSpacing":
        return (
          <AddSpacing
            setOpenDialog={setIsDialogOpen}
            setShowAlert={setShowAlert}
            context={contextDialog}
          />
        );

      case "editSpacing":
        return (
          <AddSpacing
            setOpenDialog={setIsDialogOpen}
            setShowAlert={setShowAlert}
            context={contextDialog}
          />
        );
      case "createList":
        return <AddList />;
      default:
        return null;
    }
  };

  return (
    <Box>
      <List>
        {/* Render home button */}
        <ListItemButton component={Link} to="/clickFZT/inicio">
          <Home
            sx={{
              fill: "#0084cb",
            }}
          />
          <ListItemText sx={{ pl: 1 }} primary="Inicio" />
        </ListItemButton>

        {/* Render create spacing button */}
        <ListItemButton onClick={handleCreateSpacing}>
          <CreateNewFolder
            sx={{
              fill: "#0084cb",
            }}
          />
          <ListItemText sx={{ pl: 1 }} primary="Crear Espacio" />
        </ListItemButton>

        {/* Render spacings list */}
        <SpacingsList
          spacings={spacings}
          open={open}
          handleClick={handleClick}
          handleMenuClick={handleMenuClick}
          isResponsible={isResponsible}
        />
      </List>

      {/* Render menu to item list */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
        >
          {/* Render menu edit spacing */}
          <MenuItem onClick={handleEditSpacing}>
            <EditIcon
              sx={{
                mr: 2,
              }}
            />
            Editar Espacio
          </MenuItem>
          {/* Render menu add list */}
          <MenuItem onClick={handleCreateList}>
            <Add
              sx={{
                mr: 2,
              }}
            />
            Agregar Lista
          </MenuItem>
          {/* Render menu delete spacing */}
          <MenuItem onClick={handleDeleteClick}>
            <Delete
              sx={{
                mr: 2,
              }}
            />
            Eliminar Espacio
          </MenuItem>
        </Box>
      </Menu>

      {/* Render dialog to create spacing or list */}
      <CreateDialog open={isDialogOpen} onClose={handleCloseDialog}>
        {getDialogComponent()}
      </CreateDialog>

      {/* Render delete confirmation */}
      {isDeleteConfirmOpen && selectedSpacing && (
        <ConfirmDeleteItems
          idElement={selectedSpacing}
          onClose={handleMenuClose}
          handleOpen={setIsDeleteConfirmOpen}
        />
      )}

      {/* Render alert message */}
      {showAlert && (
        <SnackbarMessage
          open={showAlert}
          message="Espacio creado correctamente"
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
    </Box>
  );
};

const SpacingsList = ({
  spacings,
  open,
  handleClick,
  handleMenuClick,
  isResponsible,
}) => {
  return (
    <div>
      {spacings.map((spacing) => (
        <div
          key={spacing.id}
          style={{
            margin: 3,
          }}
        >
          {/* Render Items */}
          <ListItemButton
            component={Link}
            to={`clickFZT/spacing/${spacing.id}`}
            sx={{
              // backgroundColor: "#0269a4",
              mb: 1,
              // borderLeft: "3px solid #0084cb",
              boxShadow: 1,
              borderRadius: 5,
              "&:hover": {
                backgroundColor: "f0f0f0",
              },
            }}
          >
            {open[spacing.id] ? (
              <FolderOpen
                sx={{
                  fill: "#578e22",
                }}
              />
            ) : (
              <Folder
                sx={{
                  fill: "#578e22",
                }}
              />
            )}
            <ListItemText primary={spacing.title} sx={{ pl: 1 }} />

            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleClick(e, spacing.id);
              }}
            >
              {open[spacing.id] ? (
                <ExpandLess
                  sx={{
                    fill: "#578e22",
                  }}
                />
              ) : (
                <ExpandMore
                  sx={{
                    fill: "#578e22",
                  }}
                />
              )}
            </IconButton>
            <IconButton
              edge="end"
              onClick={(e) => handleMenuClick(e, spacing.id)}
            >
              <MoreVert
                sx={{
                  fill: "#000",
                }}
              />
            </IconButton>
          </ListItemButton>
          <Collapse in={open[spacing.id]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {spacing?.lists?.map((list) => (
                <ListItemButton
                  key={list.id}
                  component={Link}
                  to={`clickFZT/spacings/${spacing.id}/list/${list.id}`}
                  sx={{
                    mb: 1,
                    borderRadius: 5,
                  }}
                >
                  <ListIcon
                    sx={{
                      fill: "#000",
                    }}
                  />
                  <ListItemText sx={{ pl: 1 }} primary={list.title} />
                  {isResponsible && (
                    <IconButton edge="end">
                      <Delete
                        sx={{
                          fill: "#000",
                        }}
                      />
                    </IconButton>
                  )}
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </div>
      ))}
    </div>
  );
};

SpacingsList.propTypes = {
  spacings: PropTypes.array.isRequired,
  open: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleMenuClick: PropTypes.func.isRequired,
  isResponsible: PropTypes.bool.isRequired,
};

ListSideClickFZT.propTypes = {
  advisorLogin: PropTypes.object.isRequired,
};

export default ListSideClickFZT;
