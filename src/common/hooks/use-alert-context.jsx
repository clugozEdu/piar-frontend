import { createContext, useState } from "react";
import PropTypes from "prop-types";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });

  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

AlertProvider.propTypes = {
  children: PropTypes.node,
};

export default AlertContext;
