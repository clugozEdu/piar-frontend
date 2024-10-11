import { useEffect, useState } from "react";
// import Grid from "@mui/material/Grid2";
import * as Yup from "yup";
import PropTypes from "prop-types";
import FormInit from "@/common/components/form/form-init";
// import CardsForms from "@/common/components/ui/cards";
import CreateDialog from "./create-dialog";
import SpacingForm from "../forms/spacing-form";
import { postData, getData, putData } from "@/services/api";
import { CircularProgress, Typography } from "@mui/material";

/** Component AddSpacing
 * Initial form to create or edit a spacing using Formik and Yup
 * @param {function} setOpenDialog - Function to close the dialog
 * @param {function} setShowAlert - Function to show an alert
 * @param {string} context - Context to create or edit a spacing
 * @returns {JSX.Element} - FormInit component
 */

const AddSpacing = ({
  openDialog,
  setOpenDialog,
  setShowAlert,
  context,
  idSpacing,
}) => {
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
        console.log(values);
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
      {({ isSubmitting, handleSubmit }) => (
        <CreateDialog
          title={
            context === "createSpacing" ? (
              <>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  Creando Espacio
                </Typography>
                <Typography variant="body2" sx={{ flexGrow: 1 }}>
                  Un espacio representa a los equipos, departamentos o grupos,
                  cada uno con sus propias listas, flujos de trabajo y ajustes.
                </Typography>
              </>
            ) : (
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Editando Espacio
              </Typography>
            )
          }
          open={openDialog}
          onClose={setOpenDialog}
          isSubmitting={isSubmitting}
          handleSubmit={handleSubmit}
        >
          <SpacingForm />
        </CreateDialog>
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
  openDialog: PropTypes.bool.isRequired,
  setOpenDialog: PropTypes.func.isRequired,
  setShowAlert: PropTypes.func,
  context: PropTypes.string,
  idSpacing: PropTypes.string,
};

export default AddSpacing;
