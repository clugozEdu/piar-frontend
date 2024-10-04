import { useEffect } from "react";
import { TextField, MenuItem } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useField } from "formik";
import PropTypes from "prop-types";

/**
 ** Component to show a select field with options
 * This component is controlled by formik
 *
 * @param {*} {
 *   catalog, --> array of objects with the options
 *   menuItemValue, --> value to show in the menu
 *   optionValue, --> value to set in the formik values
 *   fatherValue, --> value to compare with the option and change the value
 *   xs = 12, --> size for extra small devices
 *   sm = 12, --> size for small devices
 *   md = 6, --> size for medium devices
 *   lg = 3, --> size for large devices
 *   ...props --> rest of the props
 * }
 * @return {*} a select field with options
 */

const SelectFormField = ({
  catalog,
  menuItemValue,
  optionValue,
  fatherValue,
  xs = 12,
  sm = 12,
  md = 6,
  lg = 3,
  ...props
}) => {
  //** Get the field, meta and helpers from formik ***//
  const [field, meta, helpers] = useField(props);

  //** UseEffect to check if the value is in the catalog, if not set the value to empty ***//
  useEffect(() => {
    if (!catalog.some((item) => item[optionValue] === field.value)) {
      helpers.setValue("");
    }
  }, [fatherValue, catalog, field.value, helpers, optionValue]);

  return (
    <Grid size={{ xs: xs, sm: sm, md: md, lg: lg }}>
      <TextField
        fullWidth
        select
        helperText={meta.touched && meta.error}
        error={!!(meta.touched && meta.error)}
        {...field}
        {...props}
        sx={{
          "& .MuiInputBase-root": {
            borderRadius: "20px",
          },
        }}
      >
        {catalog.map((option, index) => (
          <MenuItem key={index} value={option && option[optionValue]}>
            {option && option[menuItemValue]}
          </MenuItem>
        ))}
      </TextField>
    </Grid>
  );
};

//*** Define props types for Component ***//
SelectFormField.propTypes = {
  catalog: PropTypes.array.isRequired,
  menuItemValue: PropTypes.string.isRequired,
  optionValue: PropTypes.string.isRequired,
  fatherValue: PropTypes.string,
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
};

export default SelectFormField;
