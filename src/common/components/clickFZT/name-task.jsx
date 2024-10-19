import { useEffect, useState } from "react";
import {
  Box,
  Menu,
  Typography,
  TextField,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material";
import PropTypes from "prop-types";
import { TypeOutline } from "lucide-react";
import { Link } from "react-router-dom";
import { putData } from "@/services/api";
import { getColorsScheme } from "@/utilities/helpers";
import useLoading from "@/common/hooks/calllbacks/loading";
import SnackbarMessage from "../ui/snackbar";

const TitleMenu = ({ task, setShowAlert }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [newTitle, setNewTitle] = useState(task.title || "");
  const [titleChanged, setTitleChanged] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const { setIsLoading } = useLoading();

  useEffect(() => {
    setNewTitle(task.title);
    setTitleChanged(false); // Restablece cuando la tarea cambie
    setIsLoading(false);
  }, [task.title, setIsLoading]);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setNewTitle(task.title);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUpdateTitle = async () => {
    setIsLoading(true);
    try {
      const dataPost = {
        title: newTitle,
      };
      await putData(`api/clickfzt/tasks/${task.id}`, dataPost);
      setShowAlert(true);
      handleMenuClose();
    } catch (error) {
      setError(true);
      setMessage(error.response.data.errorDetails.detail);
      handleMenuClose();
      setIsLoading(false);
    }
  };

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
    setTitleChanged(e.target.value !== task.title && e.target.value !== "");
  };

  return (
    <>
      <Box display={"flex"} alignItems={"center"}>
        <IconButton
          onClick={handleMenuClick}
          sx={{
            padding: 0,
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
            borderRadius: 1,
          }}
        >
          <TypeOutline
            size={20}
            color={getColorsScheme(task.status.name, theme.palette.statusTask)}
          />
        </IconButton>
        <Divider
          orientation={"vertical"}
          flexItem
          sx={{
            mr: 1,
            ml: 1,
            background: getColorsScheme(
              task.status.name,
              theme.palette.statusTask
            ),
          }}
        />
        <Typography
          component={Link}
          sx={{
            textDecoration: "none",
            fontSize: "1rem",
          }}
          color={"text.secondary"}
          to={`clickFZT/task/${task.id}`}
        >
          {task.title}
        </Typography>
      </Box>
      <Menu
        id="menu-name"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <Box p={2}>
          <TextField
            label="Nuevo Título"
            value={newTitle}
            onChange={handleTitleChange}
            fullWidth
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: "20px",
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateTitle}
            sx={{ mt: 2, borderRadius: 2, width: "100%" }}
            disabled={!titleChanged}
          >
            Actualizar
          </Button>
        </Box>
      </Menu>

      {error && (
        <SnackbarMessage
          open={error}
          message={`${message}`}
          title={"Error"}
          onCloseHandler={() => {
            setError(false);
          }}
          duration={3000}
          severity="error"
          vertical="bottom"
          horizontal="right"
        />
      )}
    </>
  );
};

// Validar las props del componente
TitleMenu.propTypes = {
  task: PropTypes.object.isRequired,
  setShowAlert: PropTypes.func,
};

export default TitleMenu;
