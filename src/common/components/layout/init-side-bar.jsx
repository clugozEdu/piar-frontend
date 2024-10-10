import { useState, useEffect } from "react";
import { List, Toolbar } from "@mui/material";
import PropTypes from "prop-types";
import ListSideClickFZT from "@/feactures/clickFZT/components/list-side-click-fzt";

/** Component to render to menu from menu selected
 * @param {array} listData - Array of objects with the list data
 * @param {object} userLogin - Object with the user login data
 * @param {string} selectedMenu - Id of the selected menu
 */

const InitSideBar = ({ listData, userLogin, selectedMenu }) => {
  console.log(listData);
  /** Init state the component */
  const [contextMenu, setContextMenu] = useState(selectedMenu);

  /** UseEffect to set the context menu */
  useEffect(() => {
    setContextMenu(selectedMenu);
  }, [selectedMenu]);

  // console.log(selectedMenu);
  // const [open, setOpen] = useState({});
  // const location = useLocation();
  // const [listDataFilter, setListDataFilter] = useState([]);

  // useEffect(() => {
  //   setListDataFilter(listData.filter((item) => item.id === selectedMenu));
  // }, [selectedMenu, listData]);

  // // Maneja el click para abrir/cerrar submenús
  // const handleClick = (path) => {
  //   if (!open[path]) {
  //     setOpen((prevState) => ({ ...prevState, [path]: true }));
  //   }
  // };

  // // Verifica si la ruta actual está seleccionada
  // const isSelected = (path) => location.pathname === path;

  // console.log(userArea);

  // // Filtra los elementos por el área
  // // const filterByArea = (items) => {
  // //   return items
  // //     .filter((item) => !item.area || item.area === userArea)
  // //     .map((item) => ({
  // //       ...item,
  // //       children: item.children ? filterByArea(item.children) : [],
  // //     }));
  // // };

  // // const filteredData = filterByArea(listDataFilter);

  // // Función para renderizar los elementos del menú de manera recursiva
  // const renderMenuItems = (items) => {
  //   return items.map((item) => (
  //     <div key={item.path || item.name}>
  //       <ListItemButton
  //         onClick={() => handleClick(item.path)}
  //         component={item.path ? Link : undefined}
  //         to={item.path || ""}
  //         sx={{
  //           pl: item.pl,
  //           // backgroundColor: isSelected(item.path) ? "#0482cb" : "inherit",
  //           borderRadius: 3,
  //           // borderRight: isSelected(item.path)
  //           //   ? "4px solid #7bd94b"
  //           //   : "4px solid transparent",
  //           "&:hover": {
  //             backgroundColor: "#0f0f0f0",
  //             // color: "#ffffff",
  //           },
  //           color: isSelected(item.path) ? "#0482cb" : "inherit",
  //         }}
  //         selected={isSelected(item.path)}
  //       >
  //         {item.icon && (
  //           <ListItemIcon
  //             sx={{
  //               "& svg": {
  //                 fill: isSelected(item.path) ? "#0482cb" : "#0d1f2d",
  //               },
  //             }}
  //           >
  //             {item.icon}
  //           </ListItemIcon>
  //         )}
  //         <ListItemText primary={item.name} />
  //         {item.children.length > 0 &&
  //           (open[item.path] ? <ExpandLess /> : <ExpandMore />)}
  //       </ListItemButton>
  //       {item.children.length > 0 && (
  //         <Collapse in={open[item.path]} timeout="auto" unmountOnExit>
  //           <List sx={{ pl: 2 }}>{renderMenuItems(item.children)}</List>
  //         </Collapse>
  //       )}
  //     </div>
  //   ));
  // };

  return (
    <>
      {/** Toolbar to set logo */}
      <Toolbar
        sx={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/** Logo */}
        <img src="/public/logo.png" alt="Logo" style={{ height: "70px" }} />
      </Toolbar>
      {/** List of menu options */}
      <List sx={{ padding: 0, mt: 1 }}>
        {/** Render the menu items to clickFZT */}
        {contextMenu === "clickFZT" ? (
          /** Component ListSideCickFZT
           * Render the list of the clickFZT menu
           * @param {object} advisorLogin - Object with the user login data
           */
          <ListSideClickFZT advisorLogin={userLogin} />
        ) : contextMenu === "schools" ? (
          console.log("schools")
        ) : null}
      </List>
    </>
  );
};

/** PropTypes
 * listData: Required: Array of objects with the list data
 * userLogin: Required: Object with the user login data
 * selectedMenu: Id of the selected menu
 * loadingGlobal: Function to set the loading global
 */
InitSideBar.propTypes = {
  listData: PropTypes.array.isRequired,
  userLogin: PropTypes.object.isRequired,
  selectedMenu: PropTypes.string,
};

export default InitSideBar;
