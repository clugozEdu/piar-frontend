import { useEffect } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useFormikContext } from "formik";
import SaveIcon from "@mui/icons-material/Save";
import { Person } from "@mui/icons-material";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { fetchAdvisors } from "@/redux/slices/advisors-slice";
import TextFormField from "@/common/components/shares/TextFormField";
import AutoCompleteFormField from "@/common/components/shares/AutoCompleteField";

const SpacingForm = ({ isSubmitting }) => {
  const dispatch = useDispatch();
  const { handleSubmit } = useFormikContext();
  const { advisor } = useSelector((state) => state.loginAdvisor);
  const { advisors } = useSelector((state) => state.advisors);

  useEffect(() => {
    if (advisors.length === 0) {
      dispatch(fetchAdvisors());
    }
  }, [advisors, dispatch]);

  const handleForSubmit = () => {
    handleSubmit();
  };

  const filteredAdvisors = advisors.filter((adv) => adv.id !== advisor.id);

  return (
    <Box
      sx={{
        p: 1,
      }}
      id="box-spacing-clickFZT-form"
    >
      <Grid container spacing={2} id="grid-container-spacing-form">
        <TextFormField
          name="title"
          label="Título"
          placeholder="Título del Espacio"
          fullWidth
          xs={12}
          sm={12}
          md={12}
          lg={12}
        />

        <TextFormField
          name="description"
          label="Descripción"
          placeholder="Descripción del Espacio"
          fullWidth
          xs={12}
          sm={12}
          md={12}
          lg={12}
        />

        <AutoCompleteFormField
          name="advisor_ids"
          label="Asesores"
          placeholder="Asesores del Espacio"
          options={filteredAdvisors}
          getOptionLabel={(option) =>
            `${option.first_name} ${option.last_name}`
          }
          getOptionSelectedValue={(option) => option.id}
          xs={12}
          sm={12}
          md={12}
          lg={12}
          icon={<Person />}
        />

        <Box sx={{ flex: "1 1 auto" }} />

        <Button
          type="button"
          variant="contained"
          disabled={isSubmitting}
          onClick={handleForSubmit}
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
          {isSubmitting ? "Guardando..." : "Guardar Espacio"}
        </Button>
      </Grid>
    </Box>
  );
};

SpacingForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  // values: PropTypes.object.isRequired,
};

export default SpacingForm;
