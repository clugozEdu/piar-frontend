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
import AddSpacing from "./add-spacing";
import AddList from "./add-lists";
import ConfirmDeleteItems from "./delete-items";
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
   * @param {object} event - Event to prevent default
   * @param {string} spacingId - Id of the spacing
   * @returns {object} anchorEl - Object with the anchorEl
   * @returns {string} selectedSpacing - Id of the selected spacing
   */
  const handleMenuClick = useCallback((event, spacingId) => {
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
    <Box>
      <List>
        {/** Render home button */}
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

        {/* <Divider
          sx={{
            backgroundColor: "#0084cb",
          }}
        /> */}

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
  // isResponsible,
}) => {
  console.log(spacings);
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
            {/* Render change the Folder Icon */}
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

            {/* Name Spacing */}
            <ListItemText primary={spacing.title} sx={{ pl: 1 }} />

            {/* Render the ExpandLess or ExpandMore Icon */}
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

            {/* Render the MoreVert Icon */}
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

          {/* Collapse content list */}
          <Collapse in={open[spacing.id]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {spacing?.lists?.map((list) => (
                /* Render the lists of spacing */
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

                  {/* Render the List Text */}
                  <ListItemText sx={{ pl: 1 }} primary={list.title} />

                  {/* Render the Delete Icon only is owner list */}
                  {list.isOwner && (
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
};

/** PropTypes ListSideClickFZT
 * @param {object} advisorLogin - Object with the advisor login data
 */
ListSideClickFZT.propTypes = {
  advisorLogin: PropTypes.object.isRequired,
};

export default ListSideClickFZT;
