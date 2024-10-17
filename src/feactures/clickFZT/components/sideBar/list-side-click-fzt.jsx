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
  IconButton,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import {
  House,
  Pencil,
  FolderHeart,
  FolderPlus,
  Share2,
  ListPlus,
  FolderMinus,
} from "lucide-react";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getData } from "@/services/api";
import CreateDialog from "../create-dialog";
import AddSpacing from "../add-spacing";
import AddList from "../add-lists";
import ConfirmDeleteItems from "../delete-items";
import SpacingSideClickFZT from "./spacing-side-click-fzt";
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
  const [messageAlert, setMessageAlert] = useState("");
  const { setIsLoading } = useLoading();
  const [showAlert, setShowAlert] = useState(false);
  const message = useWebSocket();
  const theme = useTheme();

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
    // setIsLoading(true);
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
    });
  }, [advisorLogin.id]);

  /** UseEffect to fetchSpacing when the component is mounted
   * fetchSpacings: function to fetch spacings
   * dependecies: fetchSpacings
   * setIsLoading: function to set loading
   */
  useEffect(() => {
    fetchSpacings();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [fetchSpacings, setIsLoading]);

  /** UseEffect to read message to webSocket
   * @param {object} message - [Object] with the message from webSocket
   * event: event to create spacing
   * fetchSpacings: function to fetch spacings
   * dependecies: message, fetchSpacings
   */
  useEffect(() => {
    if (message?.event) {
      setMessageAlert(message.event);
      fetchSpacings();
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
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
          <House size={22} color={theme.palette.primary.main} />
          <ListItemText sx={{ pl: 1 }} primary="Inicio" />
        </ListItemButton>

        {/* Render title Mis Espacios */}
        <Box
          id="box-title-spacings"
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            mt: 1,
          }}
        >
          <FolderHeart size={22} color={theme.palette.primary.main} />
          <Typography
            variant="body1"
            sx={{
              mt: 0,
              ml: 1,
              mb: 0,
              mr: 1,
            }}
          >
            Mis Espacios
          </Typography>

          <Tooltip title={"Crear Espacio"}>
            <IconButton
              sx={{
                padding: 1,
                borderRadius: 1,
                ml: "auto",
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
              onClick={handleCreateSpacing}
            >
              <FolderPlus size={22} color={theme.palette.primary.main} />
            </IconButton>
          </Tooltip>
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
        <SpacingSideClickFZT
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
          <Share2 size={22} color={theme.palette.primary.main} />
          <Typography
            sx={{
              mt: 0,
              ml: 1,
              mb: 0,
              mr: 1,
            }}
          >
            Espacios Compartidos
          </Typography>
        </Box>

        <Divider
          sx={{
            m: 1,
            // background: theme.palette.secondary.main,
          }}
        />

        <SpacingSideClickFZT
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
          {/* Render menu add list */}
          <MenuItem onClick={handleCreateList}>
            <Box
              display={"flex"}
              alignContent={"center"}
              sx={{
                pr: 2,
              }}
            >
              <ListPlus size={20} color={theme.palette.primary.secondary} />
            </Box>
            Agregar Lista
          </MenuItem>
          {/* Render menu edit spacing only if owner */}
          {selectedSpacing &&
            spacings.find((s) => s.id === selectedSpacing)?.isOwner && (
              <MenuItem onClick={handleEditSpacing}>
                <Box
                  display={"flex"}
                  alignContent={"center"}
                  sx={{
                    pr: 2,
                  }}
                >
                  <Pencil size={20} color={theme.palette.primary.secondary} />
                </Box>
                Editar Espacio
              </MenuItem>
            )}

          {/* Render menu delete spacing only if owner */}
          {selectedSpacing &&
            spacings.find((s) => s.id === selectedSpacing)?.isOwner && (
              <MenuItem onClick={handleDeleteClick}>
                <Box
                  display={"flex"}
                  alignContent={"center"}
                  sx={{
                    pr: 2,
                  }}
                >
                  <FolderMinus
                    size={20}
                    color={theme.palette.primary.secondary}
                  />
                </Box>
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
          message={
            messageAlert === "spacing_created"
              ? "Espacio creado con éxito"
              : messageAlert === "spacing_deleted"
              ? "Espacio eliminado con éxito"
              : messageAlert === "spacing_updated"
              ? "Espacio actualizado con éxito"
              : messageAlert === "list_created"
              ? "Lista creada con éxito"
              : ""
          }
          title={"Completado"}
          onCloseHandler={() => {
            setShowAlert(false);
            setMessageAlert("");
          }}
          duration={3000}
          severity="success"
          vertical="bottom"
          horizontal="right"
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
