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
} from "@mui/material";
import { useTheme } from "@emotion/react";
import PropTypes from "prop-types";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import EventBusyIcon from "@mui/icons-material/EventBusy"; // Importar el icono
import { getColorsScheme, stringAvatar } from "@/utilities/helpers";
import MenuCards from "@/common/components/clickFZT/menu-card-task";
import PriorityChip from "@/common/components/clickFZT/priority-chip";
import DateMenuCard from "@/common/components/clickFZT/date-menu";
import TimeMenu from "@/common/components/clickFZT/time-menu";
import DescriptionMenuCard from "@/common/components/clickFZT/description-task";
import TableTasks from "@/common/components/clickFZT/table-task";

const ListTask = ({ groupedTasks, statusTask, handleAddTask }) => {
  const theme = useTheme();

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
    return {
      id: task.id,
      description: (
        <DescriptionMenuCard description={task.description} taskID={task.id} />
      ),
      title: task.title,
      start_date: (
        <DateMenuCard
          date={task.start_date}
          // text={"Inicio: "}
          taskID={task.id}
          keyUpdate={"start_date"}
        />
      ),
      end_date: (
        <DateMenuCard
          date={task.end_date}
          // text={"Fin: "}
          taskID={task.id}
          keyUpdate={"end_date"}
        />
      ),
      time_task: <TimeMenu task={task} />,
      status: (
        <Box display="flex" alignItems="center">
          <PriorityChip priority={task.priority} idTask={task.id} />
          {task.overdue && (
            <Chip
              label="Atrasada"
              icon={
                <EventBusyIcon
                  sx={{
                    fill: "white",
                  }}
                />
              }
              sx={{
                backgroundColor: "#FF3D3D",
                color: "white",
                ml: 1,
              }}
            />
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
      actions: <MenuCards idStatus={task.status.id} taskId={task.id} />,
    };
  };

  return (
    <>
      {statusTask.map((status) => (
        <Accordion
          sx={{
            boxShadow: 3,
          }}
          key={status.id}
          expanded={expanded[status.id]}
          onChange={() => handleAccordionChange(status.id)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box display="flex" alignItems="center">
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
              <IconButton
                aria-hidden="true"
                sx={{
                  ml: 1,
                }}
                onClick={(e) => handleAddButtonClick(e, status.id)}
              >
                <AddIcon />
              </IconButton>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
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
};

export default ListTask;
