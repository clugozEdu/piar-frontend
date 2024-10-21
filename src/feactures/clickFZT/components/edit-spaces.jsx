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
import { Save, Pencil } from "lucide-react";
import FormInit from "@/common/components/form/form-init";
import CreateDialog from "./create-dialog";
import SpacingForm from "../forms/spacing-form";
import { putData } from "@/services/api";
import useLoading from "@/common/hooks/calllbacks/loading";
import SnackbarMessage from "@/common/components/ui/snackbar";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { enqueueSnackbar } from "notistack";

const EditSpacing = ({ openDialog, setOpenDialog, idSpacing }) => {
  const { spaces } = useSelector((state) => state.spaces);
  const [initValues, setInitValues] = useState(null);
  const [isLoadingDialog, setLoadingDialog] = useState(true);
  const { setIsLoading } = useLoading();
  const theme = useTheme();

  /** Estado para controlar si se ha intentado hacer submit */
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const spaceEdit = spaces.find((space) => space.id === idSpacing);

    if (spaceEdit) {
      setInitValues({
        title: spaceEdit.title,
        description: spaceEdit.description,
        advisor_ids: spaceEdit.advisors.map((advisor) => advisor.id),
      });

      setLoadingDialog(false);
    }
  }, [idSpacing, spaces]);

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
        <Box display={"flex"} alignItems={"center"}>
          <Pencil size={24} color={theme.palette.primary.main} />
          <Typography variant="h6" component="div" sx={{ padding: 0.5 }}>
            Editando Espacio: {initValues?.title}
          </Typography>
        </Box>
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
              await putData(`api/clickfzt/spacing/${idSpacing}`, values);
              setOpenDialog(false);
              // setShowAlert(true);
            } catch (error) {
              enqueueSnackbar(error.message, {
                variant: "error",
                autoHideDuration: 3000,
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
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

EditSpacing.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  setOpenDialog: PropTypes.func.isRequired,
  idSpacing: PropTypes.string,
};

export default EditSpacing;
