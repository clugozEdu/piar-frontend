import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LoadingGLobal from "@/common/components/ui/loading-global";
import PropTypes from "prop-types";

const CreateDialog = ({ open, onClose, children, title, isLoading }) => {
  const handleClose = () => {
    onClose(false);
  };

  /** Set a fixed or minimum height */
  const dialogContentStyle = {
    minHeight: "200px", // Adjust this value as needed
    display: "flex",
    flexDirection: "column",
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle id="title-dialog">{title}</DialogTitle>
      {isLoading && <LoadingGLobal />}

      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent dividers sx={dialogContentStyle}>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {children}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

CreateDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
  title: PropTypes.node,
  isLoading: PropTypes.bool,
};

export default CreateDialog;
