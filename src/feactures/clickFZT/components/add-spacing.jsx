import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { Save, Pencil, FolderPlus } from "lucide-react";
import FormInit from "@/common/components/form/form-init";
import CreateDialog from "./create-dialog";
import SpacingForm from "../forms/spacing-form";
import { postData, getData, putData } from "@/services/api";
import useLoading from "@/common/hooks/calllbacks/loading";
import SnackbarMessage from "@/common/components/ui/snackbar";
import PropTypes from "prop-types";

const AddSpacing = ({
  openDialog,
  setOpenDialog,
  // setShowAlert,
  context,
  idSpacing,
}) => {
  const [initValues, setInitValues] = useState(null);
  const [isLoadingDialog, setLoadingDialog] = useState(
    context === "editSpacing"
  );
  const { setIsLoading } = useLoading();
  const theme = useTheme();

  /** Estado para controlar si se ha intentado hacer submit */
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (context === "editSpacing") {
      try {
        getData(`api/clickfzt/spacing/${idSpacing}`).then((data) => {
          const spacing = data;
          setInitValues({
            title: spacing.title,
            description: spacing.description,
            advisor_ids: spacing.advisors.map((advisor) => advisor.id),
          });
          setLoadingDialog(false);
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error al obtener el espacio",
          text: error.message,
        });
      }
    } else {
      setInitValues({
        title: "",
        description: "",
        advisor_ids: [],
      });
      setLoadingDialog(false);
    }
  }, [context, idSpacing]);

  const validateShemaSpacing = () =>
    Yup.object({
      title: Yup.string().required("El título del espacio es requerido"),
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
            <Box display={"flex"} alignItems={"center"}>
              <FolderPlus size={24} color={theme.palette.primary.main} />
              <Typography variant="h6" component="div" sx={{ padding: 0.5 }}>
                Creando Espacio
              </Typography>
            </Box>
            <Box display={"flex"} alignItems={"center"}>
              <Typography variant="body2" sx={{ flexGrow: 1, padding: 0 }}>
                Un espacio representa a los equipos, departamentos o grupos,
                cada uno con sus propias listas y flujos de trabajo.
              </Typography>
            </Box>
          </>
        ) : (
          <Box display={"flex"} alignItems={"center"}>
            <Pencil size={24} color={theme.palette.primary.main} />
            <Typography variant="h6" component="div" sx={{ padding: 0.5 }}>
              Editando Espacio: {initValues?.title}
            </Typography>
          </Box>
        )
      }
      open={openDialog}
      onClose={handleClose}
      isLoading={isLoadingDialog}
    >
      {!isLoadingDialog && initValues && (
        <FormInit
          initialValues={initValues}
          validationSchema={validateShemaSpacing}
          onSubmit={async (values, actions) => {
            setIsLoading(true);
            try {
              if (context === "editSpacing") {
                await putData(`api/clickfzt/spacing/${idSpacing}`, values);
              } else {
                await postData("api/clickfzt/spacing/", values);
              }
              setOpenDialog(false);
              // setShowAlert(true);
            } catch (error) {
              Swal.fire({
                icon: "error",
                title: "Error al guardar el espacio",
                text: error.message,
              });
            } finally {
              actions.setSubmitting(false);
              setIsLoading(false);
            }
          }}
          enableReinitialize={true}
        >
          {({ isSubmitting, handleSubmit, errors }) => (
            <>
              <SpacingForm />
              <DialogActions
                sx={{
                  pt: 2,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  type="button"
                  variant="contained"
                  disabled={isSubmitting}
                  onClick={() => {
                    setHasSubmitted(true); // Marcar que se ha intentado hacer submit
                    handleSubmit();
                  }}
                  startIcon={
                    isSubmitting ? (
                      <CircularProgress size={24} />
                    ) : (
                      <Save size={24} />
                    )
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

              {/* Mostrar Snackbar solo si se ha hecho submit y hay errores */}
              {hasSubmitted &&
                Object.keys(errors).map((errorKey, index) => (
                  <SnackbarMessage
                    key={index}
                    open={true}
                    message={errors[errorKey].toString()}
                    severity="error"
                    onCloseHandler={() => {
                      setHasSubmitted(false);
                    }}
                    duration={3000}
                    vertical="bottom"
                    horizontal="right"
                  />
                ))}
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
  // setShowAlert: PropTypes.func,
  context: PropTypes.string,
  idSpacing: PropTypes.string,
};

export default AddSpacing;
