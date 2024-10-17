import { Avatar, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import TableComponent from "@/common/components/ui/table";
import { stringAvatar, formatDate, convertHours } from "@/utilities/helpers";

const TableTask = ({ tasks }) => {
  const { spacingId } = useParams();

  const columns = [
    { id: "title", label: "Nombre" },
    { id: "start_date", label: "Inicio", align: "right" },
    { id: "end_date", label: "Fin", align: "right" },
    { id: "time_task", label: "Tiempo", align: "right" },
    { id: "status", label: "Estado", align: "right" },
    { id: "responsable", label: "Responsable", align: "right" },
  ];

  const transformRow = (task) => {
    const responsibleUser = `${task.owner_advisor.first_name} ${task.owner_advisor.last_name}`;

    return {
      id: task.id,
      title: (
        <Link
          to={`/clickFZT/spacing/${spacingId}/list/${task.list_id}/tasks/${task.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {task.title}
        </Link>
      ),
      start_date: formatDate(task.start_date),
      // start_date: (
      //   <DateMenuCard
      //     date={task.start_date}
      //     taskID={task.id}
      //     keyUpdate={"start_date"}
      //   />
      // ),
      end_date: formatDate(task.end_date),
      // end_date: (
      //   <DateMenuCard
      //     date={task.end_date}
      //     taskID={task.id}
      //     keyUpdate={"end_date"}
      //   />
      // ),
      time_task: `${convertHours(task.time_task)} hrs`,
      // time_task: <TimeMenu task={task} />,
      status: task.status.name,
      responsable: (
        <Tooltip title={responsibleUser}>
          <Avatar
            sx={{ width: 24, height: 24 }}
            {...stringAvatar(responsibleUser)}
          />
        </Tooltip>
      ),
    };
  };

  return (
    <TableComponent
      columns={columns}
      rows={tasks.map(transformRow)}
      keys={columns.map((column) => column.id)}
      rowsPage={6}
    />
  );
};

TableTask.propTypes = {
  tasks: PropTypes.array.isRequired,
};

export default TableTask;
