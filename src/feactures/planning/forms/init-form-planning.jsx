import { Grid } from "@mui/material/Grid2";
import PropTypes from "prop-types";
import CardsForms from "../../components/layout/cards";
import PlanningApp from "../pages/travel/travel-init";

const AddPlanningForm = ({ isSubmitting, submitStatus }) => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <CardsForms
        title="Planificación de Visitas"
        formComponent={
          <PlanningApp
            isSubmitting={isSubmitting}
            submitStatus={submitStatus}
          />
        }
        hcolor={"#1d2e3d"}
      />
    </Grid>
  </Grid>
);

AddPlanningForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  submitStatus: PropTypes.string.isRequired,
};

export default AddPlanningForm;
