import { useEffect, useState } from "react";
import * as Yup from "yup";
import PropTypes from "prop-types";
import FormInit from "@/common/components/form/form-init";
import CreateDialog from "./create-dialog";
import SpacingForm from "../forms/spacing-form";
import { postData, getData, putData } from "@/services/api";
import {
  Typography,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

const AddSpacing = ({
  openDialog,
  setOpenDialog,
  setShowAlert,
  context,
  idSpacing,
}) => {
  /** Initialize initValues as null */
  const [initValues, setInitValues] = useState(null);
  const [isLoading, setIsLoading] = useState(context === "editSpacing");

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
    } else {
      /** Set initial values for createSpacing context */
      setInitValues({
        title: "",
        description: "",
        advisor_ids: [],
      });
      setIsLoading(false);
    }
  }, [context, idSpacing]);

  const validateShemaSpacing = () =>
    Yup.object({
      title: Yup.string().required("El título es requerido"),
      description: Yup.string().notRequired(),
      advisor_ids: Yup.array().notRequired(),
    });

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <CreateDialog
      title={
        context === "createSpacing" ? (
          <>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Creando Espacio
            </Typography>
            <Typography variant="body2" sx={{ flexGrow: 1 }}>
              Un espacio representa a los equipos, departamentos o grupos, cada
              uno con sus propias listas, flujos de trabajo.
            </Typography>
          </>
        ) : (
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Editando Espacio
          </Typography>
        )
      }
      open={openDialog}
      onClose={handleClose}
      isLoading={isLoading} // Pass isLoading to the dialog
    >
      {!isLoading && initValues && (
        <FormInit
          initialValues={initValues}
          validationSchema={validateShemaSpacing}
          onSubmit={async (values, actions) => {
            try {
              if (context === "editSpacing") {
                await putData(`api/clickup/spacing/${idSpacing}`, values);
              } else {
                await postData("api/clickup/spacing/", values);
              }
              setOpenDialog(false);
              setShowAlert(true);
            } catch (error) {
              console.error(error);
              // Handle error if needed
            } finally {
              actions.setSubmitting(false);
            }
          }}
          enableReinitialize={true}
        >
          {({ isSubmitting, handleSubmit }) => (
            <>
              <SpacingForm />
              <DialogActions
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "16px",
                }}
              >
                <Button
                  type="button"
                  variant="contained"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
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
              </DialogActions>
            </>
          )}
        </FormInit>
      )}
    </CreateDialog>
  );
};

AddSpacing.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  setOpenDialog: PropTypes.func.isRequired,
  setShowAlert: PropTypes.func,
  context: PropTypes.string,
  idSpacing: PropTypes.string,
};

export default AddSpacing;
