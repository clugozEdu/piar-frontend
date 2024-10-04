import { useFormikContext } from "formik";
import { MenuItem } from "@mui/material";
import PropTypes from "prop-types";

const MenuItemForms = ({
  children,
  name,
  getOptionSelectedValue,
  ...props
}) => {
  const { setFieldValue } = useFormikContext();

  const handleChange = (_, newValue) => {
    setFieldValue(
      name,
      newValue.map((option) => getOptionSelectedValue(option))
    );
  };

  return (
    <MenuItem {...props} onClick={handleChange}>
      {children}
    </MenuItem>
  );
};

MenuItemForms.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  getOptionSelectedValue: PropTypes.func.isRequired,
};

export default MenuItemForms;
