import { useState } from "react";
import {
  Card,
  CardContent,
  Chip,
  Box,
  IconButton,
  Tooltip,
  Avatar,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTheme } from "@emotion/react";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";
import { getColorsScheme, stringAvatar } from "@/utilities/helpers";
import MenuCards from "@/common/components/clickFZT/menu-card-task";
import PriorityChip from "@/common/components/clickFZT/priority-chip";
import TitleMenu from "@/common/components/clickFZT/name-task";
import TimeMenu from "@/common/components/clickFZT/time-menu";
import DateMenuCard from "@/common/components/clickFZT/date-menu";
import DescriptionMenuCard from "@/common/components/clickFZT/description-task";
import ConfirmDeleteItems from "../../components/delete-items";

const TaskCard = ({ task, isOverdue }) => {
  const [taskDelete, setTaskDelete] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const userName = `${task.owner_advisor.first_name} ${task.owner_advisor.last_name}`;
  const theme = useTheme();

  const handlerDeleteTask = () => {
    setTaskDelete(task.id);
    setDeleteConfirm(true);
  };

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          maxHeight: 400,
          borderRadius: 2,
          // boxShadow: 2,
          marginBottom: 2,
        }}
      >
        <CardContent>
          <Grid container spacing={1}>
            {/* Encabezado: Título y botones */}
            <Grid
              size={{ xs: 12 }}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              {/* Nombre de la tarea */}
              <TitleMenu task={task} />

              {/* Botones */}
              <Box display="flex">
                <IconButton
                  sx={{
                    padding: "0px 10px 0px 0px",
                  }}
                  onClick={handlerDeleteTask}
                >
                  <DeleteIcon />
                </IconButton>
                <MenuCards idStatus={task.status.id} taskId={task.id} />
              </Box>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Divider />
            </Grid>

            {/* Descripción de la tarea */}
            <Grid size={{ xs: 12, sm: 8 }}>
              <DescriptionMenuCard
                description={task.description}
                taskID={task.id}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <Chip label={`En ${task.list_title}`} />
            </Grid>

            {/* Fechas de inicio y fin */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <DateMenuCard
                date={task.start_date}
                text={"Inicio: "}
                taskID={task.id}
                keyUpdate={"start_date"}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <DateMenuCard
                date={task.end_date}
                text={"Fin: "}
                taskID={task.id}
                keyUpdate={"end_date"}
              />
            </Grid>

            {/* Tiempo dedicado a la tarea */}
            <Grid size={{ xs: 12 }}>
              <TimeMenu task={task} />
            </Grid>

            {/* Información de estado, prioridad y usuario */}
            <Grid
              size={{ xs: 12 }}
              display="flex"
              alignItems="center"
              justifyContent={"flex-end"}
              flexWrap="wrap"
            >
              {/* Prioridad */}
              <PriorityChip priority={task.priority} idTask={task.id} />
              {/* Tarea atrasada */}
              {isOverdue && (
                <Chip
                  label="Atrasada"
                  icon={
                    <EventBusyIcon
                      sx={{
                        fill: "red",
                      }}
                    />
                  }
                  sx={{
                    backgroundColor: "transparent",
                  }}
                />
              )}
              {/* Estado de la tarea */}
              <Chip
                label={task.status.name}
                sx={{
                  backgroundColor: getColorsScheme(
                    task.status.name,
                    theme.palette.statusTask
                  ),
                  color: "white",
                  marginRight: 1,
                }}
              />

              {/* Avatar del usuario */}
              <Tooltip title={userName}>
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    marginRight: 1,
                  }}
                  {...stringAvatar(userName)}
                />
              </Tooltip>

              {/* Nombre de la lista */}
              {/* <Chip
                label={task.lists.title}
                sx={{
                  backgroundColor: "transparent",
                  color: "black",
                }}
              /> */}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {deleteConfirm && (
        <ConfirmDeleteItems
          idElement={taskDelete}
          onClose={setDeleteConfirm}
          handleOpen={setTaskDelete}
          pathGet={`api/clickup/tasks/${taskDelete}`}
          pathDelete={`api/clickup/tasks/${taskDelete}`}
        />
      )}
    </>
  );
};

TaskCard.propTypes = {
  task: PropTypes.object.isRequired,
  isOverdue: PropTypes.bool,
};

export default TaskCard;
