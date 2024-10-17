import { House, ListTodo, School } from "lucide-react";

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
    icon: <House size={24} color={"#FFFFFF"} />,
    path: "/home/inicio",
    children: [],
  },

  /** Item to menu schools */ {
    id: "schools",
    name: "Inicio",
    icon: <House size={24} color={"#FFFFFF"} />,
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
    icon: <House size={24} />,
    path: "/home",
  },
  {
    id: "clickFZT",
    name: "Click FZT",
    icon: <ListTodo size={24} />,
    path: "/clickFZT",
  },
  {
    id: "schools",
    name: "Escuelas",
    icon: <School size={24} />,
    path: "/schools",
  },
];

export { navLinks, menuIconsBar };
