import { Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import PropTypes from "prop-types";
import CardsForms from "@/common/components/ui/cards";
import { isTaskOverdue, groupedTask } from "@/utilities/helpers";
import TableDetails from "./detail-task";
import UserPIeChart from "./users-pie";
import TableTask from "./task-table";

const SpacingDashboard = ({ lists, users, tasks, nameSpacing }) => {
  // set overdue tasks
  const taskUpdate = tasks.map((task) => ({
    ...task,
    overdue: isTaskOverdue(task.end_date, task.status.name),
  }));

  // group tasks by status
  const groupedTasks = groupedTask(tasks);

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
        <CardsForms
          title="Backlog"
          formComponent={
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography variant="h4">
                {groupedTasks.Backlog?.length > 0
                  ? `${groupedTasks.Backlog.length} (${(
                      (groupedTasks.Backlog.length / tasks.length) *
                      100
                    ).toFixed(2)}%)`
                  : "0 (0%)"}
              </Typography>
            </Box>
          }
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
        <CardsForms
          title="Doing"
          formComponent={
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography variant="h4">
                {groupedTasks.Doing?.length > 0 && groupedTasks.Doing
                  ? `${groupedTasks.Doing.length} (${(
                      (groupedTasks.Doing.length / tasks.length) *
                      100
                    ).toFixed(2)}%)`
                  : "0 (0%)"}
              </Typography>
            </Box>
          }
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
        <CardsForms
          title="Done"
          formComponent={
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography variant="h4">
                {groupedTasks.Done?.length > 0 && groupedTasks.Done
                  ? `${groupedTasks.Done.length} (${(
                      (groupedTasks.Done.length / tasks.length) *
                      100
                    ).toFixed(2)}%)`
                  : "0 (0%)"}
              </Typography>
            </Box>
          }
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 12, md: 6, lg: 5 }}>
        {/* Card with user details */}
        <CardsForms
          title="Resumen Tareas Por Usuario"
          formComponent={<UserPIeChart users={users} lists={lists} />}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 12, md: 6, lg: 7 }}>
        <CardsForms
          title={`Tareas en el espacio: ${nameSpacing}`}
          formComponent={<TableTask tasks={taskUpdate} />}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
        <CardsForms
          title={`Listas en el espacio: ${nameSpacing}`}
          formComponent={<TableDetails lists={lists} users={users} />}
        />
      </Grid>
    </Grid>
  );
};

SpacingDashboard.propTypes = {
  lists: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  nameSpacing: PropTypes.string,
  tasks: PropTypes.array.isRequired,
};

export default SpacingDashboard;
