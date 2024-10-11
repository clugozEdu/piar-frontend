import { useEffect } from "react";
import Grid from "@mui/material/Grid2";
import { Person } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { fetchAdvisors } from "@/redux/slices/advisors-slice";
import TextFormField from "@/common/components/shares/TextFormField";
import AutoCompleteFormField from "@/common/components/shares/AutoCompleteField";

/** Component Form List Create or Update
 * @param {boolean} isSubmitting - Flag to know if the form is submitting
 */
const SpacingForm = () => {
  /** Init state the component */
  const dispatch = useDispatch();
  // const { handleSubmit } = useFormikContext();
  const { advisor } = useSelector((state) => state.loginAdvisor);
  const { advisors } = useSelector((state) => state.advisors);

  /** Fetch advisor for autocomplete component */
  useEffect(() => {
    if (advisors.length === 0) {
      dispatch(fetchAdvisors());
    }
  }, [advisors, dispatch]);

  /** Filter the advisor login from the list of advisors
   */
  const filteredAdvisors = advisors.filter((adv) => adv.id !== advisor.id);

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
        "Nombre del Espacio",
        "Nombre del Espacio",
        true,
        12,
        12,
        12,
        12
      )}

      {renderTextFormField(
        "description",
        "Descripción (Opcional)",
        "Descripción del Espacio",
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
        label="Compartir solo con: (Opcional)"
        placeholder="Asesores del Espacio"
        options={filteredAdvisors}
        getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
        getOptionSelectedValue={(option) => option.id}
        xs={12}
        sm={12}
        md={12}
        lg={12}
        icon={<Person />}
      />
    </Grid>
  );
};

export default SpacingForm;
