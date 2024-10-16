import { useState, useEffect, useCallback } from "react";
import { Button, DialogActions, CircularProgress, Box } from "@mui/material";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { Save } from "lucide-react";
import CreateDialog from "../../components/create-dialog";
import SelectFormField from "@/common/components/shares/SelectFormField";
import FormInit from "@/common/components/form/form-init";
import { getData, postData } from "@/services/api";
import TaskForm from "../forms/task-form";

const AddTask = ({
  openDialog,
  setShowAlert,
  setIsDialogOpen,
  idStatus,
  idList, // Puede ser null o undefined si viene desde un espacio
  lists = [], // Opcional, solo necesario si viene desde un espacio
  statusTask,
}) => {
  const [nameList, setListName] = useState("");
  const [priorityTask, setPriorityTask] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log(statusTask);

  const initValues = {
    title: "",
    description: "",
    start_date: null,
    end_date: null,
    time_task: "",
    status_id: idStatus,
    priority_id: "",
    list_id: lists.length > 0 ? "" : idList, // Se utilizará la lista seleccionada o el idList pasado
  };

  // Fetch de datos solo si hay un idList proporcionado
  const fetchDataApi = useCallback(() => {
    setIsLoading(true);

    if (idList) {
      // Solo ejecutar el fetch si tenemos un idList
      getData(`api/clickup/list/${idList}`).then((data) =>
        setListName(data.title)
      );
    }

    // Obtener prioridades de la tarea (esto siempre se ejecuta)
    getData(`api/clickup/priority`).then((data) => setPriorityTask(data));

    setIsLoading(false);
  }, [idList]);

  useEffect(() => {
    fetchDataApi();
  }, [fetchDataApi]);

  const validateSchemaTask = () => {
    // Busca el estado de "Backlog" en el array statusTask
    const isBacklog = statusTask.find(
      (status) => status.id === idStatus && status.name === "Backlog"
    );

    return Yup.object()
      .shape({
        title: Yup.string().required("El título es requerido"),
        description: Yup.string().notRequired(),
        start_date: Yup.date().nullable().notRequired(),
        end_date: Yup.date()
          .notRequired("La fecha de finalización es requerida")
          .test(
            "is-greater",
            "La fecha de finalización debe ser posterior a la fecha de inicio",
            function (value) {
              const { start_date } = this.parent;
              return value >= start_date;
            }
          ),
        time_task: Yup.string().notRequired(),
        status_id: Yup.string().required("El id del estado es requerido"),
        priority_id: Yup.string().nullable().notRequired(),
        list_id: Yup.string().required("El id de la lista es requerido"),
      })
      .test("conditional-validation", null, function (values) {
        const { title, description, start_date, end_date, priority_id } =
          values;

        // Si es "Backlog", solo validar el título
        if (isBacklog) {
          if (!title) {
            return this.createError({
              path: "title",
              message: "El título es requerido",
            });
          }
          return true; // No se validan los demás campos
        }

        // Si no es "Backlog", validar que todos los campos requeridos estén presentes
        if (!description) {
          return this.createError({
            path: "description",
            message: "La descripción es requerida",
          });
        }
        if (!start_date) {
          return this.createError({
            path: "start_date",
            message: "La fecha de inicio es requerida",
          });
        }
        if (!end_date) {
          return this.createError({
            path: "end_date",
            message: "La fecha de finalización es requerida",
          });
        }
        if (!priority_id) {
          return this.createError({
            path: "priority_id",
            message: "El id de la prioridad es requerido",
          });
        }

        return true;
      });
  };

  const handleSubmitForm = async (values) => {
    console.log(values);
    await postData("api/clickup/tasks", values);
    setIsDialogOpen(false);
    setShowAlert(true);
  };

  return (
    <CreateDialog
      title={`Agregar Tarea ${nameList ? `a la Lista: ${nameList}` : ""}`}
      open={openDialog}
      onClose={setIsDialogOpen}
      isLoading={isLoading}
    >
      {!isLoading && initValues && (
        <FormInit
          initialValues={initValues}
          validationSchema={validateSchemaTask}
          onSubmit={handleSubmitForm}
          enableReinitialize={true}
        >
          {({ isSubmitting, handleSubmit }) => (
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
              <TaskForm priorityTask={priorityTask} />

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
  setShowAlert: PropTypes.func.isRequired,
  idStatus: PropTypes.string.isRequired,
  idList: PropTypes.string, // Ahora es opcional
  lists: PropTypes.array, // Solo necesario si se usa desde un espacio
  setIsDialogOpen: PropTypes.func.isRequired,
};

export default AddTask;
