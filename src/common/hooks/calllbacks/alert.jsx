import { useContext } from "react";
import AlertContext from "../use-alert-context";

const useAlert = () => {
  return useContext(AlertContext);
};

export default useAlert;
