import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import * as Yup from "yup";
import PropTypes from "prop-types";
import FormInit from "@/common/components/form/form-init";
import CardsForms from "@/common/components/ui/cards";
import SpacingForm from "../forms/spacing-form";
import { postData, getData, putData } from "@/services/api";
import { CircularProgress } from "@mui/material";

/** Component AddSpacing
 * Initial form to create or edit a spacing using Formik and Yup
 * @param {function} setOpenDialog - Function to close the dialog
 * @param {function} setShowAlert - Function to show an alert
 * @param {string} context - Context to create or edit a spacing
 * @returns {JSX.Element} - FormInit component
 */

const AddSpacing = ({ setOpenDialog, setShowAlert, context, idSpacing }) => {
  // console.log(idSpacing);
  /** Init state the component */
  const [initValues, setInitValues] = useState({
    title: "",
    description: "",
    advisor_ids: [],
  });
  const [isLoading, setIsLoading] = useState(context === "editSpacing"); // Muestra loading solo en edit

  /** UseEffect to get the data of the spacing
   * getData: Function to get data from the API
   * urlApi: api/clickup/spacing/advisor/${advisor.id}
   * @param {string} context - Context to create or edit a spacing
   * @param {string} advisor.id - Id of the advisor login
   * @return {object} - initValues
   * @return {boolean} - isLoading
   */
  useEffect(() => {
    if (context === "editSpacing") {
      getData(`api/clickup/spacing/${idSpacing}`).then((data) => {
        const spacing = data;
        setInitValues({
          title: spacing.title,
          description: spacing.description,
          advisor_ids: spacing.advisors.map((advisor) => advisor.id),
        });
        setIsLoading(false);
      });
    }
  }, [context, idSpacing]);

  /** Function to validate the schema of the spacing
   * Yup: Library to validate the schema
   * Validate the title, description and advisor_ids
   */
  const validateShemaSpacing = () =>
    Yup.object({
      title: Yup.string().required("El título es requerido"),
      description: Yup.string().notRequired(),
      advisor_ids: Yup.array().notRequired(),
    });

  // Si está cargando en el contexto de edición, muestra un "Loading"
  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    /** Component FormInit
     * Initial form to create or edit a spacing using Formik and Yup
     * @param {object} initialValues - Initial values of the form
     * @param {function} validationSchema - Function to validate the schema
     * @param {function} onSubmit - Function to submit the form
     * @param {boolean} enableReinitialize - Enable reinitialize the form
     */
    <FormInit
      initialValues={initValues}
      validationSchema={validateShemaSpacing}
      onSubmit={async (values) => {
        context === "editSpacing"
          ? await putData(`api/clickup/spacing/${idSpacing}`, values)
          : await postData("api/clickup/spacing/", values);
        setOpenDialog(false);
        setShowAlert(true);
      }}
      enableReinitialize={true}
    >
      {/** Render child pass at component
       * Get Props values, errors and isSubmitting
       */}
      {({ isSubmitting }) => (
        <Grid container spacing={2} id="spacing-init-form-grid">
          <Grid size={12} id="spacing-init-form">
            {/** Component CardsForms
             * Render the form of the spacing
             * @param {string} title - Title of the card
             * @param {JSX.Element} formComponent - Component to render
             * @param {string} hcolor - Color of the card
             * @param {string} height - Height of the card
             */}
            <CardsForms
              title={
                context === "createSpacing"
                  ? "Creando Espacio"
                  : "Editando Espacio"
              }
              formComponent={
                /** Component SpacingForm
                 * Render the form of the spacing
                 * @param {boolean} isSubmitting - Submitting status
                 */
                <SpacingForm isSubmitting={isSubmitting} />
              }
              hcolor={"#1d2e3d"}
              height={"400px"}
            />
          </Grid>
        </Grid>
      )}
    </FormInit>
  );
};

/** PropTypes
 * @param {function} setOpenDialog - Function to close the dialog
 * @param {function} setShowAlert - Function to show an alert
 * @param {string} context - Context to create or edit a spacing
 */
AddSpacing.propTypes = {
  setOpenDialog: PropTypes.func.isRequired,
  setShowAlert: PropTypes.func,
  context: PropTypes.string,
  idSpacing: PropTypes.string,
};

export default AddSpacing;
