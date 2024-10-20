import { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  IconButton,
  Tooltip,
  Avatar,
  Chip,
  Typography,
  Divider,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import PropTypes from "prop-types";
import { CirclePlus, ChevronsDown, CircleDot } from "lucide-react";
import { getColorsScheme, stringAvatar } from "@/utilities/helpers";
import MenuCards from "@/common/components/clickFZT/menu-card-task";
import PriorityChip from "@/common/components/clickFZT/priority-chip";
import DateMenuCard from "@/common/components/clickFZT/date-menu";
import TimeMenu from "@/common/components/clickFZT/time-menu";
import DescriptionMenuCard from "@/common/components/clickFZT/description-task";
import TableTasks from "@/common/components/clickFZT/table-task";
import TitleMenu from "@/common/components/clickFZT/name-task";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const ListTask = ({
  groupedTasks,
  statusTask,
  handleAddTask,
  priorityTask,
}) => {
  const theme = useTheme();
  const [animationParent] = useAutoAnimate();

  const [expanded, setExpanded] = useState(
    statusTask.reduce((acc, status) => {
      acc[status.id] = true;
      return acc;
    }, {})
  );

  const handleAccordionChange = (statusId) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [statusId]: !prevExpanded[statusId],
    }));
  };

  const handleAddButtonClick = (e, statusId) => {
    e.stopPropagation();
    handleAddTask(statusId);
  };

  const columns = [
    { id: "title", label: "Nombre" },
    { id: "description", label: "Descripción" },
    { id: "start_date", label: "Inicio", align: "right" },
    { id: "end_date", label: "Fin", align: "right" },
    { id: "time_task", label: "Tiempo", align: "right" },
    { id: "status", label: "Estado", align: "right" },
    { id: "responsable", label: "Responsable", align: "right" },
    { id: "actions", label: "Mover", align: "right" },
  ];

  const transformRow = (task) => {
    const userName = `${task.owner_advisor.first_name} ${task.owner_advisor.last_name}`;
    const isOverdue = task.overdue;

    return {
      id: task.id,
      isOverdue: isOverdue,
      description: <DescriptionMenuCard task={task} />,
      title: <TitleMenu task={task} />,
      start_date: (
        <DateMenuCard task={task} text={"Inicio: "} keyUpdate={"start_date"} />
      ),
      end_date: (
        <DateMenuCard task={task} text={"Fin: "} keyUpdate={"end_date"} />
      ),
      time_task: <TimeMenu task={task} />,
      status: (
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <PriorityChip
            priorityTask={priorityTask}
            priority={task.priority}
            task={task}
          />

          {isOverdue && (
            <>
              <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
              <CircleDot size={24} color={"#f44336"} />
              <Typography
                variant="body2"
                sx={{ fontSize: "0.8rem", ml: 1 }}
                color={isOverdue ? "error" : "textPrimary"}
              >
                Atrasada
              </Typography>
            </>
          )}
        </Box>
      ),
      responsable: (
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
      ),
      actions: <MenuCards task={task} statusTask={statusTask} />,
    };
  };

  return (
    <>
      {statusTask.map((status) => (
        <Accordion
          sx={{
            boxShadow: 2,
          }}
          key={status.id}
          expanded={expanded[status.id]}
          onChange={() => handleAccordionChange(status.id)}
        >
          <AccordionSummary
            expandIcon={
              <ChevronsDown
                size={24}
                color={getColorsScheme(status.name, theme.palette.statusTask)}
              />
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
              sx={{ flexGrow: 1 }}
            >
              <Chip
                label={status.name}
                sx={{
                  backgroundColor: getColorsScheme(
                    status.name,
                    theme.palette.statusTask
                  ),
                  color: "white",
                }}
              />
              <Typography
                variant="h6"
                component="div"
                sx={{
                  ml: 1,
                }}
              >
                {groupedTasks[status.name]?.length || 0}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Typography
                variant="body1"
                sx={{
                  ml: 1,
                }}
              >
                Agregar Tarea
              </Typography>
              <IconButton
                sx={{
                  ml: 1,
                }}
                onClick={(e) => handleAddButtonClick(e, status.id)}
              >
                <CirclePlus
                  size={24}
                  color={getColorsScheme(status.name, theme.palette.statusTask)}
                />
              </IconButton>
            </Box>
          </AccordionSummary>
          <AccordionDetails ref={animationParent}>
            <TableTasks
              columns={columns}
              rows={groupedTasks[status.name]?.map(transformRow) || []}
              keys={columns.map((column) => column.id)}
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

ListTask.propTypes = {
  groupedTasks: PropTypes.object.isRequired,
  statusTask: PropTypes.array,
  handleAddTask: PropTypes.func.isRequired,
  priorityTask: PropTypes.array,
  setShowAlert: PropTypes.func,
};

export default ListTask;
