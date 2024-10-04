import PropTypes from "prop-types";
import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";

// Componente Stepper
const StepperComponent = ({
  activeStep,
  steps,
  stepErrors = [],
  isLoading,
  // onStepChange,
}) => {
  return (
    <Box sx={{ minWidth: 200 }}>
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        sx={{
          "& .MuiStepIcon-root": {
            color: "#0D1F2D",
            "&.Mui-completed": {
              color: "#2e8b57",
            },
            "&.Mui-active": {
              color: "#70b62b",
            },
            "&.Mui-error": {
              color: "#b22a2a",
            },
          },
          "& .MuiStepLabel-iconContainer": {
            color: "#4a9d9c",
          },
        }}
      >
        {steps.map((label, index) => {
          // Protege contra errores si stepErrors[index] es undefined
          const isStepValid =
            stepErrors[index]?.every(
              (key) => !key // Asume que stepErrors es un array de arrays con errores booleanos
            ) ?? true; // Usa true si stepErrors[index] es undefined

          return (
            <Step key={label}>
              <StepLabel error={!isStepValid}>
                <Box display="flex" justifyContent="flex-start">
                  <Typography fontWeight={"bold"} color={"#1d2e3d"}>
                    {label}
                  </Typography>
                  {index === 0 && isLoading ? (
                    <CircularProgress size={20} sx={{ ml: 1 }} />
                  ) : null}
                </Box>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
};

StepperComponent.propTypes = {
  activeStep: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
  stepErrors: PropTypes.arrayOf(PropTypes.array), // Modificado para permitir undefined
  isLoading: PropTypes.bool,
  // onStepChange: PropTypes.func.isRequired,
};

export default StepperComponent;
