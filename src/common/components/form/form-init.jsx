import { Formik, Form } from "formik";
import PropTypes from "prop-types";

/** Component FormInit
 * Initial form to create or edit a spacing using Formik and Yup
 * @param {object} initialValues - Initial values of the form
 * @param {function} validationSchema - Function to validate the schema
 * @param {function} onSubmit - Function to submit the form
 * @param {JSX.Element} children - Child component to render
 */
const FormInit = ({ initialValues, validationSchema, onSubmit, children }) => {
  return (
    /** Component Formik
     * Formik component to manage the form
     * @param {object} initialValues - Initial values of the form
     * @param {function} validationSchema - Function to validate the schema
     * @param {function} onSubmit - Function to submit the form
     */
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {/* Render child pass at component
       * @param {object} values - Values of the form
       * @param {object} errors - Errors of the form
       * @param {boolean} isSubmitting - Submitting status
       */}
      {({ values, errors, isSubmitting }) => (
        <Form>{children({ values, errors, isSubmitting })}</Form>
      )}
    </Formik>
  );
};

FormInit.propTypes = {
  initialValues: PropTypes.object.isRequired,
  validationSchema: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
};

export default FormInit;
