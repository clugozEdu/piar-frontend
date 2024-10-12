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
import EventBusyIcon from "@mui/icons-material/EventBusy";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";
import {
  statusColors,
  getColorsScheme,
  stringAvatar,
} from "@/utilities/helpers";
import MenuCards from "@/common/components/clickFZT/menu-card-task";
import PriorityChip from "@/common/components/clickFZT/priority-chip";
import TitleMenu from "@/common/components/clickFZT/name-task";
import TimeMenu from "@/common/components/clickFZT/time-menu";
import DateMenuCard from "@/common/components/clickFZT/date-menu";
import DescriptionMenuCard from "@/common/components/clickFZT/description-task";
// import { handlerUpdateBD } from "../../../supabaseServices";

const TaskCard = ({ task, isOverdue }) => {
  // set user name for tooltip
  const userName = `${task.owner_advisor.first_name} ${task.owner_advisor.last_name}`;

  // handler delete Task
  const handlerDeleteTask = () => {
    console.log("Delete task", task.id);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        maxHeight: 400,
        borderRadius: 5,
        boxShadow: 2,
        marginBottom: 2,
      }}
    >
      <CardContent
        sx={{
          padding: "10px 10px 5px 5px",
        }}
      >
        <Grid container spacing={1}>
          <Grid
            xs={12}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            {/* Name task*/}
            <TitleMenu task={task} />

            {/* Buttons */}
            <Box display="flex">
              <IconButton onClick={handlerDeleteTask}>
                <DeleteIcon />
              </IconButton>
              <MenuCards idStatus={task.status.id} taskId={task.id} />
            </Box>
          </Grid>

          <Grid xs={12}>
            <Divider />
          </Grid>

          {/* Description task */}
          <Grid xs={12} sm={12} md={12} lg={12}>
            <DescriptionMenuCard
              description={task.description}
              taskID={task.id}
            />
          </Grid>

          {/* Date start task */}
          <Grid xs={12} sm={12} md={12} lg={6}>
            <DateMenuCard
              date={task.start_date}
              text={"Inicio: "}
              taskID={task.id}
              keyUpdate={"start_date"}
            />
          </Grid>
          {/* Date end task */}
          <Grid xs={12} sm={12} md={12} lg={6}>
            <DateMenuCard
              date={task.end_date}
              text={"Fin: "}
              taskID={task.id}
              keyUpdate={"end_date"}
            />
          </Grid>

          {/* Time task */}
          <Grid xs={12}>
            <TimeMenu task={task} />
          </Grid>

          <Grid xs={12} sm={12} display="flex" alignItems="center">
            {/* Overdue task */}
            {isOverdue && (
              <Chip
                label="Atrasada"
                icon={<EventBusyIcon />}
                sx={{
                  backgroundColor: "transparent",
                  // color: "white",
                  mr: 1,
                }}
              />
            )}
            {/* Priority task */}
            <PriorityChip priority={task.priority} idTask={task.id} />
            {/* Status task */}
            <Chip
              label={task.status.name}
              sx={{
                backgroundColor: getColorsScheme(
                  task.status.name,
                  statusColors
                ),
                color: "white",
                mr: 1,
              }}
            />
            {/* User task */}
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
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TaskCard.propTypes = {
  task: PropTypes.object.isRequired,
  isOverdue: PropTypes.bool,
};

export default TaskCard;
