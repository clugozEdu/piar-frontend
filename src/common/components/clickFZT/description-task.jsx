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
import { useTheme } from "@mui/material/styles";
import { FileText } from "lucide-react";
import { putData } from "@/services/api";
import { getColorsScheme } from "@/utilities/helpers";
import SnackbarMessage from "../ui/snackbar";
import useLoading from "@/common/hooks/calllbacks/loading";
import PropTypes from "prop-types";

const DescriptionMenuCard = ({ task }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [newDescription, setNewDescription] = useState(task.description || "");
  const [descriptionChanged, setDescriptionChanged] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const { setIsLoading } = useLoading();

  useEffect(() => {
    setNewDescription(task.description);
    setDescriptionChanged(false);
  }, [task.description]);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setNewDescription(task.description);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUpdateDescription = async () => {
    handleMenuClose();
    setIsLoading(true);
    try {
      const dataPost = {
        description: newDescription,
      };
      await putData(`api/clickfzt/tasks/${task.id}`, dataPost);
      // setShowAlert(true);
    } catch (error) {
      setError(true);
      setMessage(error.response.data.errorDetails.detail);
      handleMenuClose();
      setIsLoading(false);
    }
  };

  const handleDescriptionChange = (e) => {
    setNewDescription(e.target.value);
    setDescriptionChanged(
      e.target.value !== task.description && e.target.value !== ""
    );
  };

  return (
    <>
      <Box display="flex" alignItems="center">
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
          <FileText
            size={24}
            color={getColorsScheme(task.status.name, theme.palette.statusTask)}
          />
        </IconButton>

        <Divider
          orientation="vertical"
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
          variant="body1"
          color="text.secondary"
          sx={{
            fontSize: "0.8rem",
            ml: 1,
          }}
        >
          {task.description || "Descripción no disponible"}
        </Typography>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <Box p={2}>
          <TextField
            label="Nueva Descripción"
            value={newDescription}
            onChange={handleDescriptionChange}
            fullWidth
            multiline
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: "20px",
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleUpdateDescription}
            sx={{ mt: 2, borderRadius: 2, width: "100%" }}
            disabled={!descriptionChanged}
          >
            Actualizar
          </Button>
        </Box>
      </Menu>

      {error && (
        <SnackbarMessage
          open={error}
          message={message}
          title="Error"
          onCloseHandler={() => setError(false)}
          duration={3000}
          severity="error"
          vertical="bottom"
          horizontal="right"
        />
      )}
    </>
  );
};

DescriptionMenuCard.propTypes = {
  task: PropTypes.object.isRequired,
  // setShowAlert: PropTypes.func.isRequired,
};

export default DescriptionMenuCard;
