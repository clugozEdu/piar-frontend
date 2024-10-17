import { useState } from "react";
import {
  Card,
  CardContent,
  Box,
  IconButton,
  Tooltip,
  Avatar,
  Divider,
  Typography,
  CardHeader,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
// import { Link, useParams } from "react-router-dom";

import { useTheme } from "@emotion/react";
import { Trash2, CircleUser } from "lucide-react";
import PropTypes from "prop-types";
import { getColorsScheme, stringAvatar } from "@/utilities/helpers";
import MenuCards from "@/common/components/clickFZT/menu-card-task";
import PriorityChip from "@/common/components/clickFZT/priority-chip";
import TitleMenu from "@/common/components/clickFZT/name-task";
import TimeMenu from "@/common/components/clickFZT/time-menu";
import DateMenuCard from "@/common/components/clickFZT/date-menu";
import DescriptionMenuCard from "@/common/components/clickFZT/description-task";
import ConfirmDeleteItems from "../../components/delete-items";

const TaskCard = ({
  task,
  isOverdue,
  statusTask,
  setShowAlert,
  priorityTask,
}) => {
  // const { spacingId } = useParams();
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
          boxShadow: 2,
          marginBottom: 2,
        }}
      >
        {isOverdue && (
          <CardHeader
            sx={{
              padding: 0,
              maxHeight: 5,
              minHeight: 5,
              backgroundColor: theme.palette.overTask.main,
            }}
          />
        )}
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
              <TitleMenu task={task} setShowAlert={setShowAlert} />
              {/* Botones Delete y Mover Tarea */}
              <Box display="flex">
                <IconButton
                  sx={{
                    padding: 0,
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                    },
                    borderRadius: 1,
                  }}
                  onClick={handlerDeleteTask}
                  // disableRipple={true}
                >
                  <Trash2
                    size={20}
                    color={getColorsScheme(
                      task.status.name,
                      theme.palette.statusTask
                    )}
                  />
                </IconButton>
                {/* Menú de opciones para mover la tarea */}
                <MenuCards
                  // idStatus={task.status.id}
                  task={task}
                  statusTask={statusTask}
                  setShowAlert={setShowAlert}
                />
              </Box>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Divider />
            </Grid>

            <Grid size={{ xs: 12, sm: 12 }}>
              <Typography
                variant="body2"
                color="textSecondary"
                // component={Link}
                // to={`clickFZT/spacing/${spacingId}/list/${task.list_id}`}
              >
                {`En ${task.list_title}`}
              </Typography>
            </Grid>

            {/* Descripción de la tarea */}
            <Grid size={{ xs: 12, sm: 12 }}>
              <DescriptionMenuCard
                task={task}
                // taskID={task.id}
                setShowAlert={setShowAlert}
              />
            </Grid>

            {/* Fechas de inicio y fin */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <DateMenuCard
                task={task}
                // date={task.start_date}
                text={"Inicio: "}
                // taskID={task.id}
                keyUpdate={"start_date"}
                setShowAlert={setShowAlert}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <DateMenuCard
                task={task}
                // date={task.end_date}
                text={"Fin: "}
                // taskID={task.id}
                keyUpdate={"end_date"}
                setShowAlert={setShowAlert}
              />
            </Grid>

            {/* Tiempo dedicado a la tarea */}
            <Grid size={{ xs: 12 }}>
              <TimeMenu task={task} setShowAlert={setShowAlert} />
            </Grid>

            {/* Información de estado, prioridad y usuario */}
            <Grid size={{ xs: 12 }}>
              {/* Prioridad */}
              <PriorityChip
                priorityTask={priorityTask}
                priority={task.priority}
                task={task}
                setShowAlert={setShowAlert}
              />
              {/* Tarea atrasada */}
              {/* {isOverdue && (
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
                    borderRadius: 0,
                  }}
                />
              )} */}
              {/* Estado de la tarea */}
              {/* <Chip
                label={task.status.name}
                // variant="outlined"
                sx={{
                  backgroundColor: getColorsScheme(
                    task.status.name,
                    theme.palette.chipStatus
                  ),
                  color: "white",
                  marginRight: 1,
                  padding: 0,
                  borderRadius: 1,
                }}
              /> */}
            </Grid>

            {/* Usuario asignado a la tarea */}
            <Grid size={{ xs: 12 }}>
              <Box display="flex" alignItems="center">
                <IconButton
                  sx={{
                    padding: 0,
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                    },
                    borderRadius: 1,
                  }}
                >
                  <CircleUser
                    size={24}
                    color={getColorsScheme(
                      task.status.name,
                      theme.palette.statusTask
                    )}
                  />
                </IconButton>
                <Box
                  sx={{
                    marginLeft: 1,
                  }}
                >
                  {/* Avatar del usuario */}
                  <Tooltip title={userName}>
                    <Avatar {...stringAvatar(userName, 25, 25, "0.8rem")} />
                  </Tooltip>
                </Box>
              </Box>
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
  statusTask: PropTypes.array,
  setShowAlert: PropTypes.func,
  priorityTask: PropTypes.array,
};

export default TaskCard;
