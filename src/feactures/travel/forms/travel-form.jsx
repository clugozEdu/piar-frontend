// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { Box, Button, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid2";
import SaveIcon from "@mui/icons-material/Save";
import PropTypes from "prop-types";
// import StepperComponent from "../../../common/components/form/stepper-form";
import GeneralSectionTravel from "../components/generals-form";

const TravelForm = ({ isSubmitting, submitStatus, errors }) => {
  const handleForSubmit = () => {
    console.log(submitStatus + "probando submit");
  };

  return (
    <Box sx={{ flexGrow: 1, p: 1, paddingTop: 0 }} id="box-trave-form">
      <Box>
        <Grid container spacing={2}>
          <Grid size={12}>
            <GeneralSectionTravel />
          </Grid>
          <Box sx={{ flex: "1 1 auto" }} />
          {/* show button only if error is empty */}
          {Object.keys(errors).length === 0 && (
            <Button
              type="button"
              variant="contained"
              disabled={isSubmitting}
              onClick={() => {
                handleForSubmit();
              }}
              startIcon={
                isSubmitting ? <CircularProgress size={24} /> : <SaveIcon />
              }
              sx={{
                backgroundColor: "#0dac3a",
                "&:hover": {
                  backgroundColor: "#075f20",
                },
              }}
            >
              {isSubmitting ? "Guardando..." : "Guardar Planificación"}
            </Button>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

TravelForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  submitStatus: PropTypes.string.isRequired,
  errors: PropTypes.object,
};

export default TravelForm;
