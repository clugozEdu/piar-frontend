// import AssignmentIcon from "@mui/icons-material/Assignment";
// import ModeOfTravelIcon from "@mui/icons-material/ModeOfTravel";
import Home from "@mui/icons-material/Home";
// import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import AdsClickIcon from "@mui/icons-material/AdsClick";
// import AssignmentIcon from "@mui/icons-material/Assignment";
import SchoolIcon from "@mui/icons-material/School";

/** Nav Links array
 * @type {Array}
 * @param {string} id - Id of the menu option
 * @param {string} name - Name of the menu option
 * @param {object} icon - Icon of the menu option
 * @param {string} path - Path of the menu option
 * @param {array} children - Array of objects with the children menu options
 */

const navLinks = [
  /** Item to meno home */
  {
    id: "home",
    name: "Inicio",
    icon: <Home />,
    path: "/home/inicio",
    children: [],
  },

  /** Item to menu schools */ {
    id: "schools",
    name: "Inicio",
    icon: <Home sx={{ fill: "#0d1f2d" }} />,
    path: "/schools/inicio",
    children: [],
  },
];

/** Menu Icons Bar array
 * @type {Array}
 * @param {string} id - Id of the menu option
 * @param {string} name - Name of the menu option
 * @param {object} icon - Icon of the menu option
 * @param {string} path - Path of the menu option
 */
const menuIconsBar = [
  {
    id: "home",
    name: "Inicio",
    icon: <Home />,
    path: "/home",
  },
  {
    id: "clickFZT",
    name: "Click FZT",
    icon: <AdsClickIcon />,
    path: "/clickFZT",
  },
  {
    id: "schools",
    name: "Escuelas",
    icon: <SchoolIcon />,
    path: "/schools",
  },
];

export { navLinks, menuIconsBar };
