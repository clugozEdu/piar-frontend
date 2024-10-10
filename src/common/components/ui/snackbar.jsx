import { AlertTitle, Alert, Snackbar } from "@mui/material";
import PropTypes from "prop-types";

const SnackbarMessage = ({
  open,
  message,
  title,
  duration,
  onCloseHandler,
  severity,
  vertical,
  horizontal,
}) => {
  return (
    <Snackbar
      open={open}
      onClose={onCloseHandler}
      autoHideDuration={duration}
      anchorOrigin={{ vertical: vertical, horizontal: horizontal }}
    >
      <Alert
        severity={severity}
        variant="filled"
        onClose={onCloseHandler}
        sx={{ width: "100%", borderRadius: 4 }}
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </Alert>
    </Snackbar>
  );
};

SnackbarMessage.propTypes = {
  open: PropTypes.bool.isRequired,
  onCloseHandler: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  title: PropTypes.string,
  duration: PropTypes.number,
  severity: PropTypes.string.isRequired,
  vertical: PropTypes.string,
  horizontal: PropTypes.string,
};

export default SnackbarMessage;
