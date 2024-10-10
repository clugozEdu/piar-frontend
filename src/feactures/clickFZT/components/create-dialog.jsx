import { Dialog, DialogContent } from "@mui/material";
import PropTypes from "prop-types";

/** Dialog component
 * @param {boolean} open - Dialog open state
 * @param {function} onClose - Function to close the dialog
 * @param {JSX.Element} children - Child component to render
 */
const CreateDialog = ({ open, onClose, children }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm">
      <DialogContent>{children}</DialogContent>
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
};

export default CreateDialog;
