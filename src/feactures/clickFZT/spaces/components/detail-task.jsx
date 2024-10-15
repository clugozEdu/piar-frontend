import {
  Tooltip,
  Avatar,
  AvatarGroup,
  LinearProgress,
  Box,
} from "@mui/material";
import PropTypes from "prop-types";
import { useParams, Link } from "react-router-dom";
import { stringAvatar } from "@/utilities/helpers";
import TableComponent from "@/common/components/ui/table";

const TableDetails = ({ lists, users }) => {
  console.log(users);
  const { spacingId } = useParams(); // Destructuración directa del objeto devuelto por useParams

  const filterUsers = (allUsers, filterUsers) => {
    // Extraemos los ids de los usuarios del segundo arreglo
    const filterUserIds = filterUsers.map((user) => user.id);

    // Filtramos los usuarios del primer arreglo que tengan un id presente en el segundo arreglo
    return allUsers.filter((user) => filterUserIds.includes(user.id));
  };

  const columns = [
    { id: "name_list", label: "Lista" },
    { id: "progress", label: "Progreso", align: "left" },
    { id: "totalTasks", label: "Total Tareas", align: "right" },
    { id: "backlog", label: "Backlog", align: "right" },
    { id: "doing", label: "En Progreso", align: "right" },
    { id: "done", label: "Realizado", align: "right" },
    { id: "advisors", label: "Asesores", align: "rigth" },
    // { id: "actions", label: "Acciones", align: "right" },
  ];

  const transformRow = (list) => {
    const filteredUsers = filterUsers(list.advisors, users);
    console.log(filteredUsers);
    const listTasks = list.tasks.length;
    const listBacklog = list.tasks.filter(
      (task) => task.status.name === "Backlog"
    ).length;
    const listInProgress = list.tasks.filter(
      (task) => task.status.name === "Doing"
    ).length;
    const listDone = list.tasks.filter(
      (task) => task.status.name === "Done"
    ).length;
    const progress = listTasks
      ? ((listDone / listTasks) * 100).toFixed(2)
      : "0.00";
    const progressValue = parseFloat(progress);

    return {
      id: list.id,
      name_list: (
        <Link
          to={`/clickFZT/spacing/${spacingId}/list/${list.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {list.title}
        </Link>
      ),
      progress: (
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" value={progressValue} />
          {progress}%
        </Box>
      ),
      totalTasks: listTasks,
      backlog: listBacklog,
      doing: listInProgress,
      done: listDone,
      advisors: (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AvatarGroup max={4}>
            {filteredUsers.map((user) => (
              <Tooltip
                key={user.id}
                title={`${user.first_name} ${user.last_name}`}
              >
                <Avatar
                  {...stringAvatar(`${user.first_name} ${user.last_name}`)}
                />
              </Tooltip>
            ))}
          </AvatarGroup>
        </Box>
      ),
    };
  };

  return (
    <TableComponent
      columns={columns}
      rows={lists.map(transformRow)}
      keys={columns.map((column) => column.id)}
    />
  );
};

TableDetails.propTypes = {
  lists: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
};

export default TableDetails;
