import { useEffect, useState, useCallback } from "react";
import {
  List,
  ListItemText,
  ListItemButton,
  Box,
  Menu,
  MenuItem,
  Typography,
  Divider,
  Tooltip,
} from "@mui/material";
import { CreateNewFolder, Home, Add, Delete } from "@mui/icons-material";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import EditIcon from "@mui/icons-material/Edit";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getData } from "@/services/api";
import CreateDialog from "../create-dialog";
import AddSpacing from "../add-spacing";
import AddList from "../add-lists";
import ConfirmDeleteItems from "../delete-items";
import SpacingsList from "./spacing-side-click-fzt";
import SnackbarMessage from "@/common/components/ui/snackbar";
import useWebSocket from "@/common/hooks/web-socket";
import useLoading from "@/common/hooks/calllbacks/loading";

/** Component ListSideClickFZT
 * Render the list of spacings and lists for the advisor
 * useWebSocket to listen to websocket messages and update the spacings
 * @param {object} advisorLogin - Object with the advisor login data
 */

const ListSideClickFZT = ({ advisorLogin }) => {
  /** Init state the component */
  const [open, setOpen] = useState({});
  const [spacings, setSpacings] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSpacing, setSelectedSpacing] = useState(null);
  const [contextDialog, setContextDialog] = useState("");
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const { setIsLoading } = useLoading();
  const [showAlert, setShowAlert] = useState(false);
  const message = useWebSocket();

  /** Function to fetch spacing in api
   * useCallback: hook to save in cache the function
   * getData: function to get data from api
   * urlApi: api/clickup/spacing/advisor/${advisorLogin.id}
   * setIsLoading: function to set loading
   * Filter the spacings and lists to add the property "isOwner"
   * @param {string} advisorLogin.id - Id of the advisor login
   * @returns {array} spacings - Array of objects with the spacings
   * @returns {boolean} isResponsible - Boolean to check if the advisor is responsible
   *
   */
  const fetchSpacings = useCallback(() => {
    setIsLoading(true);
    getData(`api/clickup/spacing/advisor/`).then((data) => {
      /** Add isOwner to spacing and list */
      const updatedSpacings = data.map((spacing) => ({
        ...spacing,
        isOwner: spacing.owner_advisor.id === advisorLogin.id,
        lists: spacing.lists.map((list) => ({
          ...list,
          isOwner: list.owner_advisor.id === advisorLogin.id,
        })),
      }));

      setSpacings(updatedSpacings);
      setIsLoading(false);
    });
  }, [advisorLogin.id, setIsLoading]);

  /** UseEffect to fetchSpacing when the component is mounted
   * fetchSpacings: function to fetch spacings
   * dependecies: fetchSpacings
   * setIsLoading: function to set loading
   */
  useEffect(() => {
    fetchSpacings();
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [fetchSpacings, setIsLoading]);

  console.log(spacings);

  /** UseEffect to read message to webSocket
   * @param {object} message - [Object] with the message from webSocket
   * event: event to create spacing
   * fetchSpacings: function to fetch spacings
   * dependecies: message, fetchSpacings
   */
  useEffect(() => {
    console.log(message);
    const event = message[0]?.event;
    if (event) {
      fetchSpacings();
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [message, fetchSpacings, setIsLoading]);

  /** Handle to open and close item list
   * useCallback: hook to save in cache the function
   * @param {object} e - Event to prevent default
   * @param {string} id - Id of the spacing
   * @returns {object} open - Object with the spacings open
   * @returns {string} selectedSpacing - Id of the selected spacing
   *
   */
  const handleClick = useCallback((e, id) => {
    e.preventDefault();
    setOpen((prevOpen) => ({
      ...prevOpen,
      [id]: !prevOpen[id],
    }));
    setSelectedSpacing(id);
  }, []);

  /** Handle to when click and open Menu
   * useCallback: hook to save in cache the function
   * @param {object} event - Event to prevent default and stop propagation
   * @param {string} spacingId - Id of the spacing
   * @returns {object} anchorEl - Object with the anchorEl
   * @returns {string} selectedSpacing - Id of the selected spacing
   */
  const handleMenuClick = useCallback((event, spacingId) => {
    event.stopPropagation();
    event.preventDefault();
    setSelectedSpacing(spacingId);
    setAnchorEl(event.currentTarget);
  }, []);

  /** Handle to close Menu
   * useCallback: hook to save in cache the function
   * @param {boolean} clearSection - Boolean to clear spacing section
   * @returns {null} anchorEl - null anchorEl
   * @returns {null} selectedSpacing - null spacing
   */
  const handleMenuClose = useCallback((clearSection = true) => {
    setAnchorEl(null);
    if (clearSection) {
      setSelectedSpacing(null);
    }
  }, []);

  /** Handle to detele click menu
   * @returns {true} isDeleteConfirmOpen - open dialog to delete
   */
  const handleDeleteClick = () => {
    setIsDeleteConfirmOpen(true);
  };

  /** Handle to create spacing
   * @returns {string} contextDialog - context to create spacing
   * @returns {true} isDialogOpen - open dialog to create spacing
   */
  const handleCreateSpacing = () => {
    setContextDialog("createSpacing");
    setIsDialogOpen(true);
  };

  /** Handle to edit spacing
   * @returns {string} contextDialog - context to edit spacing
   * @returns {true} isDialogOpen - open dialog to edit spacing
   * @returns {true} handleMenuClose - close menu
   */
  const handleEditSpacing = () => {
    handleMenuClose(false); // Cierra el menú primero
    setContextDialog("editSpacing");
    setIsDialogOpen(true);
  };

  /** Handle to create list
   * @returns {string} contextDialog - context to create list
   * @returns {true} isDialogOpen - open dialog to create list
   * @returns {true} handleMenuClose - close menu
   */
  const handleCreateList = () => {
    console.log(selectedSpacing);
    handleMenuClose(false);
    setContextDialog("createList");
    setIsDialogOpen(true);
  };

  /** Handle to close dialog
   * @returns {false} isDialogOpen - close dialog
   */
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  /** Get component dialog to show depending on the context
   * @returns {component} AddSpacing - Component to create spacing
   * @returns {component} AddList - Component to create list
   */
  const getDialogComponent = () => {
    switch (contextDialog) {
      /** Case create or edit spacing
       * component AddSpacing
       */
      case "createSpacing":
      case "editSpacing":
        return (
          /** Component AddSpacing
           * @param {func} setOpenDialog - Function to open dialog
           * @param {func} setShowAlert - Function to show alert message
           * @param {string} context - context to spacing edit or create
           */

          <AddSpacing
            openDialog={isDialogOpen}
            setOpenDialog={setIsDialogOpen}
            setShowAlert={setShowAlert}
            context={contextDialog}
            idSpacing={selectedSpacing}
          />
        );
      /** Case create list */
      case "createList":
        return (
          <AddList
            openDialog={isDialogOpen}
            setOpenDialog={setIsDialogOpen}
            setShowAlert={setShowAlert}
            context={contextDialog}
            idSpacing={selectedSpacing}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box id="box-side-click-fzt">
      <List id="list-side-click-fzt">
        {/** Render home button */}
        <ListItemButton
          component={Link}
          to="/clickFZT/inicio"
          sx={{
            padding: 0,
            borderRadius: 5,
          }}
        >
          <Home
            sx={{
              fill: "#0084cb",
            }}
          />
          <ListItemText sx={{ pl: 1 }} primary="Inicio" />
        </ListItemButton>

        {/* Render create spacing button
        <ListItemButton
          onClick={handleCreateSpacing}
          sx={{
            padding: 0,
            borderRadius: 5,
          }}
        >
          <CreateNewFolder
            sx={{
              fill: "#0084cb",
            }}
          />
          <ListItemText sx={{ pl: 1 }} primary="Crear Espacio" />
        </ListItemButton> */}

        {/* Render title Mis Espacios */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            mt: 1,
          }}
        >
          <FolderSpecialIcon
            sx={{
              fill: "#c9b202",
            }}
          />
          <Typography
            variant="body2"
            sx={{
              mt: 0,
              ml: 1,
              mb: 0,
              mr: 1,
              fontSize: "1rem",
            }}
          >
            Mis Espacios
          </Typography>

          <ListItemButton
            sx={{
              display: "flex",
              justifyContent: "end",
              padding: "0px 10px 0px 0px",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
            onClick={handleCreateSpacing}
          >
            <Tooltip title={"Crear Espacio"}>
              <CreateNewFolder
                sx={{
                  fill: "#c9b202",
                }}
              />
            </Tooltip>
          </ListItemButton>
        </Box>

        <Divider
          sx={{
            m: 1,
          }}
        />

        {/* Component SpacingsList
         * @param {array} spacings - Array with the spacings
         * @param {object} open - Object with the spacings open
         * @param {func} handleClick - Function to open and close item list
         * @param {func} handleMenuClick - Function to open menu
         * @param {boolean} isResponsible - Boolean to check if the advisor is responsible
         */}
        <SpacingsList
          spacings={spacings}
          open={open}
          handleClick={handleClick}
          handleMenuClick={handleMenuClick}
          context={"owner"}
        />

        {/* Render Espacios Compartidos */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <FolderSharedIcon
            sx={{
              fill: "#c9b202",
            }}
          />
          <Typography
            variant="body2"
            sx={{
              mt: 0,
              ml: 1,
              mb: 0,
              mr: 1,
              fontSize: "1rem",
            }}
          >
            Espacios Compartidos
          </Typography>
        </Box>

        <Divider
          sx={{
            m: 1,
          }}
        />

        <SpacingsList
          spacings={spacings}
          open={open}
          handleClick={handleClick}
          handleMenuClick={handleMenuClick}
          context={"shared"}
        />
      </List>

      {/* Render menu to item list
       * @param {object} anchorEl - Object with the anchorEl
       * @param {boolean} isDeleteConfirmOpen - Boolean to check if the dialog is open
       * @param {func} handleMenuClose - Function to close menu
       */}
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
          {/* Render menu edit spacing only if owner */}
          {selectedSpacing &&
            spacings.find((s) => s.id === selectedSpacing)?.isOwner && (
              <MenuItem onClick={handleEditSpacing}>
                <EditIcon
                  sx={{
                    mr: 2,
                  }}
                />
                Editar Espacio
              </MenuItem>
            )}
          {/* Render menu add list */}
          <MenuItem onClick={handleCreateList}>
            <Add
              sx={{
                mr: 2,
              }}
            />
            Agregar Lista
          </MenuItem>
          {/* Render menu delete spacing only if owner */}
          {selectedSpacing &&
            spacings.find((s) => s.id === selectedSpacing)?.isOwner && (
              <MenuItem onClick={handleDeleteClick}>
                <Delete
                  sx={{
                    mr: 2,
                  }}
                />
                Eliminar Espacio
              </MenuItem>
            )}
        </Box>
      </Menu>

      {/* Render dialog to create spacing or list */}
      <CreateDialog open={isDialogOpen} onClose={handleCloseDialog}>
        {getDialogComponent()}
      </CreateDialog>

      {/* Render delete confirmation */}
      {isDeleteConfirmOpen && selectedSpacing && (
        <ConfirmDeleteItems
          pathGet={`api/clickup/spacing/${selectedSpacing}`}
          pathDelete={`api/clickup/spacing/${selectedSpacing}`}
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

/** PropTypes ListSideClickFZT
 * @param {object} advisorLogin - Object with the advisor login data
 */
ListSideClickFZT.propTypes = {
  advisorLogin: PropTypes.object.isRequired,
};

export default ListSideClickFZT;
