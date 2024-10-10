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

const ListForm = ({ isSubmitting, idSpacing, setNameSpacing }) => {
  const { handleSubmit } = useFormikContext();
  const { advisor } = useSelector((state) => state.loginAdvisor);
  const [advisorsSpacing, setAdvisorSpacing] = useState([]);

  const fetchSpacing = useCallback(() => {
    getData(`api/clickup/spacing/${idSpacing}`).then((data) => {
      console.log(data);
      setNameSpacing(data.title);
      setAdvisorSpacing(data.advisors);
    });
  }, [idSpacing, setNameSpacing]);

  useEffect(() => {
    if (idSpacing) {
      fetchSpacing();
    }
  }, [idSpacing, fetchSpacing]);

  const handleForSubmit = () => {
    handleSubmit();
  };

  const filteredAdvisors = advisorsSpacing.filter(
    (adv) => adv.id !== advisor.id
  );

  return (
    <Grid container spacing={2} id="grid-container-spacing-form">
      <TextFormField
        name="title"
        label="Título de la Lista"
        placeholder="Título de la Lista"
        fullWidth
        xs={12}
        sm={12}
        md={12}
        lg={12}
      />

      <TextFormField
        name="description"
        label="Descripción de la Lista (opcional)"
        placeholder="Descripción de la Lista"
        fullWidth
        xs={12}
        sm={12}
        md={12}
        lg={12}
      />

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

      <Box sx={{ flex: "1 1 auto" }} />

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
        {isSubmitting ? "Guardando..." : "Guardar Lista"}
      </Button>
    </Grid>
  );
};

ListForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  idSpacing: PropTypes.string,
  setNameSpacing: PropTypes.func,
};

export default ListForm;
