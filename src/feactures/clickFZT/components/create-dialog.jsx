import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  DialogTitle,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import PropTypes from "prop-types";

/** Dialog component
 * @param {boolean} open - Dialog open state
 * @param {function} onClose - Function to close the dialog
 * @param {JSX.Element} children - Child component to render
 */
const CreateDialog = ({
  open,
  onClose,
  children,
  isSubmitting,
  handleSubmit,
  title,
}) => {
  const handleForSubmit = () => {
    handleSubmit();
  };

  return (
    <Dialog open={open} onClose={() => onClose(false)} maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          type="button"
          variant="contained"
          disabled={isSubmitting}
          onClick={handleForSubmit}
          startIcon={
            isSubmitting ? <CircularProgress size={24} /> : <SaveIcon />
          }
          sx={{
            backgroundColor: "#0dac3a",
            "&:hover": {
              backgroundColor: "#075f20",
            },
          }}
        >
          {isSubmitting ? "Guardando..." : "Guardar Espacio"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

/** PropTypes
 * @property {boolean} open - Dialog open state
 * @property {function} onClose - Function to close the dialog
 * @property {JSX.Element} children - Child component to render
 */
CreateDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
  isSubmitting: PropTypes.bool,
  handleSubmit: PropTypes.func,
  title: PropTypes.string,
};

export default CreateDialog;
