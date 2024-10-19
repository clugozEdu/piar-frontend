import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
} from "@mui/material";
import { CircleX } from "lucide-react";
import LoadingGLobal from "@/common/components/ui/loading-global";
import PropTypes from "prop-types";

const CreateDialog = ({ open, onClose, children, title, isLoading }) => {
  const handleClose = () => {
    onClose(false);
  };

  /** Set a fixed or minimum height */
  const dialogContentStyle = {
    minHeight: "300px", // Adjust this value as needed
    display: "flex",
    flexDirection: "column",
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle
        id="title-dialog"
        sx={{
          padding: 1,
        }}
      >
        {title}
      </DialogTitle>
      {isLoading && <LoadingGLobal />}

      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 4,
          color: theme.palette.primary.main,
        })}
      >
        <CircleX size={25} />
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
