import Grid from "@mui/material/Grid2";
import PropTypes from "prop-types";
import TextFormField from "@/common/components/shares/TextFormField";
import DateFormField from "@/common/components/shares/DateFormField";
import SelectFormField from "@/common/components/shares/SelectFormField";

const TaskForm = ({ priorityTask }) => {
  const renderTextFormField = (
    name,
    label,
    placeholder,
    fullWidth,
    xs,
    sm,
    md,
    lg
  ) => (
    <TextFormField
      name={name}
      label={label}
      placeholder={placeholder}
      fullWidth={fullWidth}
      xs={xs}
      sm={sm}
      md={md}
      lg={lg}
    />
  );

  return (
    <Grid container spacing={2} id="grid-container-task-form">
      {renderTextFormField(
        "title",
        "Nombre de la Tarea",
        "Nombre de la Tarea",
        true,
        12,
        12,
        12,
        12
      )}

      {renderTextFormField(
        "description",
        "Descripción de la Tarea",
        "Descripción de la Tarea",
        true,
        12,
        12,
        12,
        12
      )}

      <DateFormField
        name="start_date"
        label="Fecha de Inicio"
        xs={12}
        sm={6}
        md={6}
        lg={6}
      />

      <DateFormField
        name="end_date"
        label="Fecha de Fin"
        xs={12}
        sm={6}
        md={6}
        lg={6}
      />

      <TextFormField
        type="number"
        name="time_task"
        label="Tiempo de la Tarea"
        placeholder="Tiempo de la Tarea"
        fullWidth
        xs={12}
        sm={6}
        md={6}
        lg={6}
      />

      <SelectFormField
        name="priority_id"
        label="Prioridad de la Tarea"
        catalog={priorityTask}
        optionValue={"id"}
        menuItemValue={"name"}
        xs={12}
        sm={6}
        md={6}
        lg={6}
      />
    </Grid>
  );
};

TaskForm.propTypes = {
  priorityTask: PropTypes.array.isRequired,
};

export default TaskForm;
