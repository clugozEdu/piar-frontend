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
import { Link } from "react-router-dom";
import AddSpacing from "../add-spacing";
import AddList from "../add-lists";
import ConfirmDeleteItems from "../delete-items";
import SpacingSideClickFZT from "./spacing-side-click-fzt";
import useLoading from "@/common/hooks/calllbacks/loading";
// redux
import { useSelector, useDispatch } from "react-redux";
import { fetchSpaces } from "@/redux/slices/clickFZT/spaces-slices";
import PropTypes from "prop-types";

const ListSideClickFZT = ({ advisorLogin }) => {
  const [open, setOpen] = useState({});
  const [spacings, setSpacings] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSpacing, setSelectedSpacing] = useState(null);
  const [contextDialog, setContextDialog] = useState("");
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const { setIsLoading } = useLoading();
  const theme = useTheme();

  // redux
  const dispatch = useDispatch();
  const { spaces } = useSelector((state) => state.spaces);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchSpaces(advisorLogin.id));
  }, [dispatch, advisorLogin.id, setIsLoading]);

  useEffect(() => {
    if (spaces.length > 0) {
      setSpacings(spaces);
      setIsLoading(false);
    }
  }, [spaces, setIsLoading]);

  const handleClick = useCallback((e, id) => {
    e.preventDefault();
    setOpen((prevOpen) => ({
      ...prevOpen,
      [id]: !prevOpen[id],
    }));
    setSelectedSpacing(id);
  }, []);

  const handleMenuClick = useCallback((event, spacingId) => {
    event.stopPropagation();
    event.preventDefault();
    setSelectedSpacing(spacingId);
    setAnchorEl(event.currentTarget);
  }, []);

  const handleMenuClose = useCallback((clearSection = true) => {
    setAnchorEl(null);
    if (clearSection) {
      setSelectedSpacing(null);
    }
  }, []);

  const handleDeleteClick = () => {
    setIsDeleteConfirmOpen(true);
  };

  const handleCreateSpacing = () => {
    setContextDialog("createSpacing");
    setIsDialogOpen(true);
  };

  const handleEditSpacing = () => {
    handleMenuClose(false);
    setContextDialog("editSpacing");
    setIsDialogOpen(true);
  };

  const handleCreateList = () => {
    handleMenuClose(false);
    setContextDialog("createList");
    setIsDialogOpen(true);
  };

  const getDialogComponent = () => {
    switch (contextDialog) {
      case "createSpacing":
      case "editSpacing":
        return (
          <AddSpacing
            openDialog={isDialogOpen}
            setOpenDialog={setIsDialogOpen}
            context={contextDialog}
            idSpacing={selectedSpacing}
          />
        );
      case "createList":
        return (
          <AddList
            openDialog={isDialogOpen}
            setOpenDialog={setIsDialogOpen}
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

        <Divider sx={{ m: 1 }} />

        <SpacingSideClickFZT
          spacings={spacings}
          open={open}
          handleClick={handleClick}
          handleMenuClick={handleMenuClick}
          context={"owner"}
        />

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

        <Divider sx={{ m: 1 }} />

        <SpacingSideClickFZT
          spacings={spacings}
          open={open}
          handleClick={handleClick}
          handleMenuClick={handleMenuClick}
          context={"shared"}
        />
      </List>

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
          <MenuItem onClick={handleCreateList}>
            <Box display={"flex"} alignContent={"center"} sx={{ pr: 2 }}>
              <ListPlus size={20} color={theme.palette.primary.secondary} />
            </Box>
            Agregar Lista
          </MenuItem>
          {selectedSpacing &&
            spacings.find((s) => s.id === selectedSpacing)?.isOwner && (
              <>
                <MenuItem onClick={handleEditSpacing}>
                  <Box display={"flex"} alignContent={"center"} sx={{ pr: 2 }}>
                    <Pencil size={20} color={theme.palette.primary.secondary} />
                  </Box>
                  Editar Espacio
                </MenuItem>

                <MenuItem onClick={handleDeleteClick}>
                  <Box display={"flex"} alignContent={"center"} sx={{ pr: 2 }}>
                    <FolderMinus
                      size={20}
                      color={theme.palette.primary.secondary}
                    />
                  </Box>
                  Eliminar Espacio
                </MenuItem>
              </>
            )}
        </Box>
      </Menu>

      {getDialogComponent()}

      {isDeleteConfirmOpen && selectedSpacing && (
        <ConfirmDeleteItems
          pathGet={`api/clickfzt/spacing/${selectedSpacing}`}
          pathDelete={`api/clickfzt/spacing/${selectedSpacing}`}
          idElement={selectedSpacing}
          onClose={handleMenuClose}
          handleOpen={setIsDeleteConfirmOpen}
        />
      )}
    </Box>
  );
};

ListSideClickFZT.propTypes = {
  advisorLogin: PropTypes.object.isRequired,
};

export default ListSideClickFZT;
