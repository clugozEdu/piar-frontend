import { Box, Chip, Typography, IconButton } from "@mui/material";
import { useTheme } from "@emotion/react";
import Grid from "@mui/material/Grid2";
import { CirclePlus } from "lucide-react";
import TaskCard from "./card-task";
import { getColorsScheme } from "@/utilities/helpers";

import PropTypes from "prop-types";

const BoardTask = ({
  groupedTasks,
  statusTask,
  handleAddTask,
  setShowAlert,
  priorityTask,
}) => {
  const theme = useTheme();

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          mt: 1,
        }}
        // ref={stateParent}
      >
        {statusTask.map((status) => (
          <Grid
            size={{ xs: 12, sm: 12, md: 4, lg: 4 }}
            key={status.id}
            sx={{
              padding: "0px 0px 0px 0px",
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                background: getColorsScheme(
                  status.name,
                  theme.palette.statusTask
                ),
                padding: "0px 0px 0px 0px",
                marginBottom: 1,
                color: "white",
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              <Typography
                variant="h6"
                component="div"
                mb={0}
                gutterBottom
                sx={{
                  ml: 2,
                  fontSize: "1rem",
                }}
              >
                {status.name}
              </Typography>
              <Box display="flex" alignItems="center">
                <Chip
                  label={
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{
                        fontSize: "1rem",
                      }}
                    >
                      {groupedTasks[status.name]?.length || 0}
                    </Typography>
                  }
                  sx={{
                    background: "inherit",
                    color: "white",
                  }}
                />
                <IconButton
                  sx={{
                    padding: "0px 10px 0px 0px",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddTask(status.id);
                  }}
                >
                  <CirclePlus color="white" size={24} />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2} rowSpacing={2}>
        {statusTask.map((status) => (
          <Grid
            size={{ xs: 12, sm: 12, md: 4, lg: 4 }}
            key={status.id}
            sx={{
              maxHeight: "98vh",
              overflowY: "auto",
              overflowX: "hidden",
              scrollbarWidth: "none",
            }}
          >
            {groupedTasks[status.name]?.map((task) => (
              <TaskCard
                statusTask={statusTask}
                key={task.id}
                task={task}
                isOverdue={task.overdue}
                setShowAlert={setShowAlert}
                priorityTask={priorityTask}
              />
            ))}
          </Grid>
        ))}
      </Grid>
    </>
  );
};

BoardTask.propTypes = {
  groupedTasks: PropTypes.object.isRequired,
  statusTask: PropTypes.array.isRequired,
  handleAddTask: PropTypes.func.isRequired,
  priorityTask: PropTypes.array.isRequired,
  setShowAlert: PropTypes.func,
};

export default BoardTask;
