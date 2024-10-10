import { forwardRef } from "react";
import { Dialog, DialogContent, Slide } from "@mui/material";
import PropTypes from "prop-types";

const CreateDialog = ({ open, onClose, children }) => {
  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      fullWidth
      maxWidth="sm"
    >
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
