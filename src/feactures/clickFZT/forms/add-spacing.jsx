import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import FormInit from "@/common/components/form/form-init";
import CardsForms from "@/common/components/ui/cards";
import SpacingForm from "./spacing-form";
import { postData, getData } from "@/services/api";

const AddSpacing = ({ setOpenDialog, setShowAlert, context }) => {
  const { advisor } = useSelector((state) => state.loginAdvisor);
  const [initValues, setInitValues] = useState({
    title: "",
    description: "",
    advisor_ids: [],
  });
  const [isLoading, setIsLoading] = useState(context === "editSpacing"); // Muestra loading solo en edit

  useEffect(() => {
    if (context === "editSpacing") {
      getData(`api/clickup/spacing/advisor/${advisor.id}`).then((data) => {
        const spacing = data[0];
        setInitValues({
          title: spacing.title,
          description: spacing.description,
          advisor_ids: spacing.advisors.map((advisor) => advisor.id),
        });
        setIsLoading(false); // Finaliza la carga
      });
    }
  }, [context, advisor.id]);

  const validateShemaSpacing = () =>
    Yup.object({
      title: Yup.string().required("El título es requerido"),
      description: Yup.string().required("La descripción es requerida"),
      advisor_ids: Yup.array().notRequired(),
    });

  // Si está cargando en el contexto de edición, muestra un "Loading"
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <FormInit
      initialValues={initValues}
      validationSchema={validateShemaSpacing}
      onSubmit={async (values) => {
        await postData("api/clickup/spacing", values);
        setOpenDialog(false);
        setShowAlert(true);
      }}
      enableReinitialize={true}
    >
      {({ isSubmitting }) => (
        <Grid container spacing={2} id="spacing-init-form-grid">
          <Grid size={12} id="spacing-init-form">
            <CardsForms
              title={
                context === "createSpacing"
                  ? "Creando Espacio"
                  : "Editando Espacio"
              }
              formComponent={<SpacingForm isSubmitting={isSubmitting} />}
              hcolor={"#1d2e3d"}
              height={"400px"}
            />
          </Grid>
        </Grid>
      )}
    </FormInit>
  );
};

AddSpacing.propTypes = {
  setOpenDialog: PropTypes.func.isRequired,
  setShowAlert: PropTypes.func,
  context: PropTypes.string,
};

export default AddSpacing;
