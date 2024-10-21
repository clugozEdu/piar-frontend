import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { esES } from "@mui/x-date-pickers/locales";
import Grid from "@mui/material/Grid2";
import { useField } from "formik";
import PropTypes from "prop-types";
import { format } from "date-fns";
import InputAdornment from "@mui/material/InputAdornment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
};

function TimeFormField({ xs = 12, sm = 12, md = 6, lg = 3, ...props }) {
  const [field, meta, helpers] = useField(props);

  const handleChange = (value) => {
    // Format the date to avoid timezone issues
    const formattedValue = format(value, "HH:mm:ss");
    helpers.setValue(formattedValue);
  };

  return (
    <Grid size={{ xs: xs, sm: sm, md: md, lg: lg }}>
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        localeText={
          esES.components.MuiLocalizationProvider.defaultProps.localeText
        }
      >
        <MobileTimePicker
          slotProps={{
            textField: {
              fullWidth: true,
              InputProps: {
                endAdornment: (
                  <InputAdornment position="end">
                    <AccessTimeIcon />
                  </InputAdornment>
                ),
                error: !!(meta.touched && meta.error),
                helperText: meta.touched && meta.error ? meta.error : "",
              },
            },
          }}
          onChange={handleChange}
          value={field.value ? new Date(`1970-01-01T${field.value}`) : null}
          autoOk
          {...props}
          sx={{
            "& .MuiInputBase-root": {
              borderRadius: "20px",
            },
          }}
        />
      </LocalizationProvider>
    </Grid>
  );
}

TimeFormField.propTypes = propTypes;

export default TimeFormField;
