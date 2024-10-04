import AssignmentIcon from "@mui/icons-material/Assignment";
import ModeOfTravelIcon from "@mui/icons-material/ModeOfTravel";
import Home from "@mui/icons-material/Home";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

const navLinks = [
  {
    name: "Inicio",
    icon: <Home sx={{ fill: "#0d1f2d" }} />,
    pl: 1,
    path: "/home",
  },
  {
    name: "Planificación",
    icon: <AssignmentIcon sx={{ fill: "#0d1f2d" }} />,
    groupSecurity: "planning_group",
    // path: "/planning",
    area: "Área De Tecnología",
    pl: 1,
    children: [
      {
        name: "Viajes",
        icon: <ModeOfTravelIcon sx={{ fill: "#0d1f2d" }} />,
        pl: 2,
        path: "/travek/create",
      },
      {
        name: "Registrar Planificación",
        icon: <AppRegistrationIcon sx={{ fill: "#0d1f2d" }} />,
        pl: 2,
        path: "/planning/register",
      },
    ],
  },
];

export default navLinks;
