import { useState, useEffect } from "react";
import { Button, DialogActions, CircularProgress, Box } from "@mui/material";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { Save } from "lucide-react";
import CreateDialog from "../../components/create-dialog";
import SelectFormField from "@/common/components/shares/SelectFormField";
import FormInit from "@/common/components/form/form-init";
import { getData, postData } from "@/services/api";
import TaskForm from "../forms/task-form";
import Swal from "sweetalert2";
import { useSnackbar } from "notistack";

const AddTask = ({
  openDialog,
  setIsDialogOpen,
  idStatus,
  idList,
  lists = [],
  statusTask,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [nameList, setListName] = useState("");
  const [isLoadingDialog, setLoadingDialog] = useState(true);

  const initValues = {
    title: "",
    description: "",
    start_date: null,
    end_date: null,
    time_task: 0,
    status_id: idStatus,
    priority_id: "",
    list_id: lists.length > 0 ? "" : idList,
  };

  useEffect(() => {
    try {
      if (idList) {
        getData(`api/clickfzt/list/${idList}`).then((data) => {
          setListName(data.title);
        });
      }
      setLoadingDialog(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al obtener los datos",
        text: error.message,
      });
    }
  }, [idList, setIsDialogOpen]);

  // Determine if the current status is "Backlog"
  const isBacklog = statusTask.some(
    (status) => status.id === idStatus && status.name === "Backlog"
  );

  const validateSchemaTask = (isBacklog) => {
    return Yup.object().shape({
      title: Yup.string().required("El título es requerido"),
      description: Yup.string().notRequired(),
      start_date: !isBacklog
        ? Yup.date().nullable().required("La fecha de inicio es requerida")
        : Yup.date().nullable().notRequired(),
      end_date: !isBacklog
        ? Yup.date()
            .nullable()
            .required("La fecha de finalización es requerida")
            .min(
              Yup.ref("start_date"),
              "La fecha de finalización debe ser posterior a la fecha de inicio"
            )
        : Yup.date().nullable().notRequired(),
      time_task: !isBacklog
        ? Yup.number()
            .nullable()
            .required("El tiempo de tarea es requerido")
            .moreThan(0, "El tiempo de tarea debe ser mayor a 0")
        : Yup.number().nullable().notRequired(),
      priority_id: !isBacklog
        ? Yup.string().required("Debe de seleccionar una prioridad")
        : Yup.string().nullable().notRequired(),
      status_id: Yup.string().required("El id del estado es requerido"),
      list_id: Yup.string().required("El id de la lista es requerido"),
    });
  };

  const handleSubmitForm = async (values, actions) => {
    try {
      await postData("api/clickfzt/tasks", values);
      setIsDialogOpen(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al guardar la tarea",
        text: error.message,
      });
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <CreateDialog
      title={`Agregar Tarea ${nameList ? `a la Lista: ${nameList}` : ""}`}
      open={openDialog}
      onClose={setIsDialogOpen}
      isLoading={isLoadingDialog}
    >
      {!isLoadingDialog && (
        <FormInit
          initialValues={initValues}
          validationSchema={() => validateSchemaTask(isBacklog)}
          onSubmit={(values, actions) => handleSubmitForm(values, actions)}
          enableReinitialize={true}
        >
          {({ isSubmitting, handleSubmit, validateForm, setTouched }) => (
            <>
              {/* Mostrar el Select solo si no se ha proporcionado idList */}
              {!idList && (
                <Box mb={2}>
                  <SelectFormField
                    name="list_id"
                    label="Selecciona una lista"
                    catalog={lists}
                    optionValue={"id"}
                    menuItemValue={"title"}
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    sx={{ mb: 2 }}
                  />
                </Box>
              )}

              {/* Formulario de la tarea */}
              <TaskForm />

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
                      <Save size={20} />
                    )
                  }
                  sx={{
                    backgroundColor: "#0dac3a",
                    "&:hover": {
                      backgroundColor: "#075f20",
                    },
                  }}
                >
                  {isSubmitting ? "Guardando..." : "Guardar Tarea"}
                </Button>
              </DialogActions>
            </>
          )}
        </FormInit>
      )}
    </CreateDialog>
  );
};

AddTask.propTypes = {
  statusTask: PropTypes.array.isRequired,
  openDialog: PropTypes.bool.isRequired,
  idStatus: PropTypes.string.isRequired,
  idList: PropTypes.string, // Ahora es opcional
  lists: PropTypes.array, // Solo necesario si se usa desde un espacio
  setIsDialogOpen: PropTypes.func.isRequired,
};

export default AddTask;
