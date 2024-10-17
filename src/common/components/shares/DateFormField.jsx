import Grid from "@mui/material/Grid2";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useField } from "formik";
import PropTypes from "prop-types";

const propTypes = {
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
};

function DateFormField({ xs = 12, sm = 12, md = 6, lg = 3, ...props }) {
  const [field, meta, helpers] = useField(props);

  const handleDateChange = (value) => {
    helpers.setValue(value);
  };

  return (
    <Grid size={{ xs: xs, sm: sm, md: md, lg: lg }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          variant="inline"
          slotProps={{ textField: { fullWidth: true } }}
          onChange={handleDateChange}
          value={field.value || null}
          format="dd/MM/yyyy"
          autoOk
          error={!!(meta.touched && meta.error)}
          helperText={meta.touched && meta.error}
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

DateFormField.propTypes = propTypes;

export default DateFormField;
