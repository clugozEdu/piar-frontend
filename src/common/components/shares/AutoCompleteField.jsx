import { TextField, Autocomplete, CircularProgress, Chip } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useField, useFormikContext } from "formik";
import PropTypes from "prop-types";

const AutoCompleteFormField = ({
  name,
  label,
  options,
  getOptionLabel,
  getOptionSelectedValue,
  getOptionDisabled,
  xs = 12,
  sm = 12,
  md = 6,
  lg = 3,
  limitTags = 4,
  maxSelections,
  onDeleteTag, // Add onDeleteTag prop
  icon,
  ...props
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const loading = options.length === 0;

  const handleChange = (event, newValue) => {
    if (!maxSelections || newValue.length <= maxSelections) {
      setFieldValue(
        name,
        newValue.map((option) => getOptionSelectedValue(option))
      );
    }
  };

  const handleDelete = (optionToDelete) => {
    const newValue = field.value.filter(
      (value) => value !== getOptionSelectedValue(optionToDelete)
    );
    setFieldValue(name, newValue);
    if (onDeleteTag) onDeleteTag(optionToDelete); // Call onDeleteTag prop
  };

  return (
    <Grid size={{ xs: xs, sm: sm, md: md, lg: lg }}>
      <Autocomplete
        multiple
        limitTags={limitTags}
        {...props}
        options={options}
        getOptionLabel={getOptionLabel}
        getOptionDisabled={getOptionDisabled}
        value={options.filter((option) =>
          (field.value || []).includes(getOptionSelectedValue(option))
        )}
        onChange={handleChange}
        disableCloseOnSelect
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => {
            /* eslint-disable-next-line no-unused-vars */
            const { key, onDelete, ...tagProps } = getTagProps({ index });
            const isDisabled = getOptionDisabled
              ? getOptionDisabled(option)
              : false;

            return (
              <Chip
                key={key} // Explicitly use key here
                label={getOptionLabel(option)}
                disabled={isDisabled}
                onDelete={isDisabled ? undefined : () => handleDelete(option)}
                icon={icon}
                {...tagProps} // Spread other props excluding key and onDelete
              />
            );
          })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            error={meta.touched && Boolean(meta.error)}
            helperText={meta.touched && meta.error}
            slotProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: "20px",
              },
            }}
          />
        )}
      />
    </Grid>
  );
};

AutoCompleteFormField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  getOptionLabel: PropTypes.func.isRequired,
  getOptionSelectedValue: PropTypes.func.isRequired,
  getOptionDisabled: PropTypes.func,
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  limitTags: PropTypes.number,
  maxSelections: PropTypes.number,
  onDeleteTag: PropTypes.func, // Define onDeleteTag prop
  icon: PropTypes.node,
};

export default AutoCompleteFormField;
