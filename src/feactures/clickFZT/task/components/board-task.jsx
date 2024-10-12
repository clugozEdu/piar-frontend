import { Box, Chip, Typography, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import AddIcon from "@mui/icons-material/Add";
import TaskCard from "./card-task";
import { backStatusColor, getColorsScheme } from "@/utilities/helpers";

import PropTypes from "prop-types";

const BoardTask = ({
  statusTask,
  groupedTasks,
  stateParent,
  parent,
  // handleAddTask,
}) => {
  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          mt: 1,
        }}
        ref={stateParent}
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
                // background: "linear-gradient(45deg, #578e22 30%, #0084cb 90%)",
                background: getColorsScheme(status.name, backStatusColor),
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
                >
                  <AddIcon
                    sx={{
                      fill: "white",
                    }}
                  />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2} rowSpacing={2} ref={parent}>
        {statusTask.map((status) => (
          <Grid
            size={{ xs: 12, sm: 12, md: 4, lg: 4 }}
            key={status.id}
            sx={{
              maxHeight: 900,
              overflowY: "auto",
              overflowX: "hidden",
              scrollbarWidth: "none",
            }}
          >
            {groupedTasks[status.name]?.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                isOverdue={task.overdue}
                // setChangeBD={setChangeBD}
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
  parent: PropTypes.func.isRequired,
  stateParent: PropTypes.func.isRequired,
  statusTask: PropTypes.array.isRequired,
  // handleAddTask: PropTypes.func.isRequired,
};

export default BoardTask;
