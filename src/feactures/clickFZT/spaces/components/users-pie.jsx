import PropTypes from "prop-types";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box } from "@mui/material";

const UserPIeChart = ({ users, lists }) => {
  // Obtener tareas para un usuario específico
  const getTaskCountForUser = (userId) => {
    return lists
      .flatMap((list) => list.tasks)
      .filter((task) => task.owner_advisor.id === userId).length;
  };

  // Calcular los datos para el gráfico de pastel
  const pieData = users.map((user) => ({
    id: user.id,
    value: getTaskCountForUser(user.id),
    label: `${user.first_name} ${user.last_name}`,
  }));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
      }}
    >
      <PieChart
        series={[
          {
            data: pieData,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            innerRadius: 50,
            outerRadius: 120,
            paddingAngle: 3,
            cornerRadius: 10,
            startAngle: 0,
            endAngle: 360,
            cx: 140,
            cy: 200,
            label: {
              position: "outside",
              formatter: (params) =>
                `${params.data.label}: ${params.data.value}`,
              style: {
                fontSize: 12,
                fontWeight: "bold",
              },
            },
          },
        ]}
        width={480}
        height={400}
      />
    </Box>
  );
};

UserPIeChart.propTypes = {
  users: PropTypes.array.isRequired,
  lists: PropTypes.array.isRequired,
};

export default UserPIeChart;
