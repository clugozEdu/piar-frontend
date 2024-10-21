import { useState } from "react";
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
import { postData } from "@/services/api";
import useLoading from "@/common/hooks/calllbacks/loading";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

const AddSpacing = ({ openDialog, setOpenDialog }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [contextDialog, setContextDialog] = useState("");
  const { setIsLoading } = useLoading();
  const theme = useTheme();

  const initValues = {
    title: "",
    description: "",
    advisor_ids: [],
  };

  /** Estado para controlar si se ha intentado hacer submit */

  const validateShemaSpacing = () =>
    Yup.object({
      title: Yup.string().required("El título del espacio es requerido"),
      description: Yup.string().notRequired(),
      advisor_ids: Yup.array().notRequired(),
    });

  const handleClose = () => {
    setOpenDialog(false);
    setContextDialog("");
  };

  return (
    <CreateDialog
      title={
        contextDialog === "createSpacing" ? (
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
      isLoading={false}
    >
      <FormInit
        initialValues={initValues}
        validationSchema={validateShemaSpacing}
        onSubmit={async (values, actions) => {
          setIsLoading(true);
          try {
            await postData("api/clickfzt/spacing/", values);
            setOpenDialog(false);
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
        {({ isSubmitting, handleSubmit, validateForm, setTouched }) => (
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
                onClick={async () => {
                  const formErrors = await validateForm();
                  if (Object.keys(formErrors).length === 0) {
                    handleSubmit();
                  } else {
                    // Marcar todos los campos con errores como tocados
                    const touchedFields = Object.keys(formErrors).reduce(
                      (acc, field) => {
                        acc[field] = true;
                        return acc;
                      },
                      {}
                    );
                    setTouched(touchedFields);

                    Object.values(formErrors).forEach((error) => {
                      enqueueSnackbar(error, {
                        variant: "error",
                        autoHideDuration: 3000,
                        anchorOrigin: {
                          vertical: "bottom",
                          horizontal: "left",
                        },
                      });
                    });
                  }
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
          </>
        )}
      </FormInit>
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
