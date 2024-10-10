import { Formik, Form } from "formik";
import PropTypes from "prop-types";

const FormInit = ({ initialValues, validationSchema, onSubmit, children }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {/* Render child pass at component */}
      {({ values, errors, isSubmitting }) => (
        <Form>
          {children({ values, errors, isSubmitting })}
          {/* <pre>{JSON.stringify(errors, null, 2)}</pre>
          <pre>{JSON.stringify(values, null, 2)}</pre> */}
        </Form>
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
