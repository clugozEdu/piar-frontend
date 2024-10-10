import { Dialog, DialogContent } from "@mui/material";
import PropTypes from "prop-types";

const CreateDialog = ({ open, onClose, children }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      {/* <DialogTitle>{title}</DialogTitle> */}
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

CreateDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  // title: PropTypes.string,
  children: PropTypes.node,
};

export default CreateDialog;
