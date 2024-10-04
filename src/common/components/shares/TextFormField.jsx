import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useField } from "formik";
import PropTypes from "prop-types";

const TextFormField = ({ xs = 12, sm = 12, md = 6, lg = 3, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <Grid size={{ xs: xs, sm: sm, md: md, lg: lg }}>
      <TextField
        fullWidth
        helperText={meta.touched && meta.error}
        error={!!(meta.touched && meta.error)}
        {...field}
        sx={{
          "& .MuiInputBase-root": {
            borderRadius: "20px",
          },
        }}
        {...props}
      />
    </Grid>
  );
};

TextFormField.propTypes = {
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
};

export default TextFormField;
