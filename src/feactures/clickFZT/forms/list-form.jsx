import { useEffect, useCallback, useState } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useFormikContext } from "formik";
import SaveIcon from "@mui/icons-material/Save";
import { Person } from "@mui/icons-material";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getData } from "@/services/api";
import TextFormField from "@/common/components/shares/TextFormField";
import AutoCompleteFormField from "@/common/components/shares/AutoCompleteField";

/** Component Form List Create or Update
 * @param {boolean} isSubmitting - Flag to know if the form is submitting
 * @param {string} idSpacing - Id of the spacing
 * @param {function} setNameSpacing - Function to set the name of the spacing
 */
const ListForm = ({ isSubmitting, idSpacing, setNameSpacing }) => {
  /** Init state the component */
  const { handleSubmit } = useFormikContext();
  const { advisor } = useSelector((state) => state.loginAdvisor);
  const [advisorsSpacing, setAdvisorSpacing] = useState([]);

  /** Function to get the spacing
   * useCallback: to save the function in cache
   */
  const fetchSpacing = useCallback(() => {
    getData(`api/clickup/spacing/${idSpacing}`).then((data) => {
      setNameSpacing(data.title);
      setAdvisorSpacing(data.advisors);
    });
  }, [idSpacing, setNameSpacing]);

  /** Fetch spacing data when idSpacing changes */
  useEffect(() => {
    if (idSpacing) {
      fetchSpacing();
    }
  }, [idSpacing, fetchSpacing]);

  /** Function to handle the submit of the form
   * @param {function} handleSubmit - Function to submit the form in the context of Formik
   */
  const handleForSubmit = () => {
    handleSubmit();
  };

  /** Filter the advisor login from the list of advisors
   */
  const filteredAdvisors = advisorsSpacing.filter(
    (adv) => adv.id !== advisor.id
  );

  /** Function to render the text form field
   * @param {string} name - Name of the field controlled by formik
   * @param {string} label - Label of the field
   * @param {string} placeholder - Placeholder of the field
   * @param {boolean} fullWidth - Flag to know if the field is full width in the form
   * @param {number} xs,sm,md,lg - Size of the field in the form (12 is full width)
   * @return {JSX.Element} - TextFormField component
   * */
  const renderTextFormField = (
    name,
    label,
    placeholder,
    fullWidth,
    xs,
    sm,
    md,
    lg
  ) => (
    <TextFormField
      name={name}
      label={label}
      placeholder={placeholder}
      fullWidth={fullWidth}
      xs={xs}
      sm={sm}
      md={md}
      lg={lg}
    />
  );

  return (
    <Grid container spacing={2} id="grid-container-spacing-form">
      {renderTextFormField(
        "title",
        "Nombre de la Lista",
        "Nombre de la Lista",
        true,
        12,
        12,
        12,
        12
      )}

      {renderTextFormField(
        "description",
        "Descripción de la Lista",
        "Descripción de la Lista",
        true,
        12,
        12,
        12,
        12
      )}

      {/** Component AutoCompleteFormField
       * Component to controlled for formik values with options
       * @param {string} name - Name of the field controlled by formik
       * @param {string} label - Label of the field
       * @param {string} placeholder - Placeholder of the field
       * @param {object} options - Options to show in the field
       * @param {function} getOptionLabel - Function to get the label of the option
       * @param {function} getOptionSelectedValue - Function to get the value of the option
       * @param {number} xs,sm,md,lg - Size of the field in the form (12 is full width)
       * @param {object} icon - Icon to show in the field
       * @param {object} filteredAdvisors - Advisors to show in the field
       */}
      <AutoCompleteFormField
        name="advisor_ids"
        label="Asesores en el espacio"
        placeholder="Asesores de la Lista"
        options={filteredAdvisors}
        getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
        getOptionSelectedValue={(option) => option.id}
        xs={12}
        sm={12}
        md={12}
        lg={12}
        icon={<Person />}
      />

      {/** Component Box
       * Add Spacing between the button and the form
       */}
      <Box sx={{ flex: "1 1 auto" }} />

      {/** Component Button
       * Button to submit the form with the dataq
       */}
      <Button
        type="button"
        variant="contained"
        disabled={isSubmitting}
        onClick={handleForSubmit}
        startIcon={isSubmitting ? <CircularProgress size={24} /> : <SaveIcon />}
        sx={{
          backgroundColor: "#0dac3a",
          "&:hover": {
            backgroundColor: "#075f20",
          },
        }}
      >
        {/** Change text in the button */}
        {isSubmitting ? "Guardando..." : "Guardar Lista"}
      </Button>
    </Grid>
  );
};

/** PropTypes
 * @param {boolean} isSubmitting - Flag to know if the form is submitting
 * @param {string} idSpacing - Id of the spacing
 * @param {function} setNameSpacing - Function to set the name of the spacing
 */
ListForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  idSpacing: PropTypes.string,
  setNameSpacing: PropTypes.func,
};

export default ListForm;
