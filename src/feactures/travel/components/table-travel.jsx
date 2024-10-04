import { Avatar, AvatarGroup, Box, Tooltip } from "@mui/material";
import { stringAvatar } from "@/utilities/helpers";
import TableComponent from "@/common/components/ui/table";

const TableTravel = () => {
  const columns = [
    { id: "id", label: "ID" },
    { id: "date", label: "Name" },
    { id: "entryTime", label: "Entry Time" },
    { id: "departureTime", label: "Departure Time" },
    { id: "department", label: "Department" },
    { id: "idSchool", label: "Schools" },
    { id: "sharedTravel", label: "Shared Travel" },
    { id: "advisorsShared", label: "Advisors Shared" },
  ];

  const rows = [
    {
      id: 1,
      date: "2021-10-10",
      entryTime: "10:00",
      departureTime: "15:00",
      department: "Cochabamba",
      idSchool: ["School 1", "School 2"],
      sharedTravel: true,
      advisorsShared: ["César Lugo", "Irving Lugo"],
    },
    {
      id: 2,
      date: "2021-10-10",
      entryTime: "10:00",
      departureTime: "15:00",
      department: "Cochabamba",
      idSchool: ["School 1", "School 2"],
      sharedTravel: true,
      advisorsShared: ["El Martir", "Concheño Lopez"],
    },
    {
      id: 3,
      date: "2021-10-10",
      entryTime: "10:00",
      departureTime: "15:00",
      department: "Cochabamba",
      idSchool: ["School 1"],
      sharedTravel: false,
      advisorsShared: [],
    },
  ];

  const transformRows = (task) => {
    const {
      id,
      date,
      entryTime,
      departureTime,
      department,
      idSchool,
      sharedTravel,
      advisorsShared,
    } = task;

    return {
      id,
      date,
      entryTime,
      departureTime,
      department,
      idSchool: idSchool.join(", "),
      sharedTravel: sharedTravel ? "Yes" : "No",
      advisorsShared: (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AvatarGroup max={4}>
            {advisorsShared.map((user, index) => (
              <Tooltip key={index} title={user}>
                <Avatar {...stringAvatar(user)} />
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
      rows={rows.map(transformRows)}
      keys={columns.map((column) => column.id)}
    />
  );
};

export default TableTravel;
