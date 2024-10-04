import { useState, useEffect } from "react";
import { List, Collapse } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const ListSideBar = ({ listData, userArea }) => {
  const [open, setOpen] = useState({});
  const location = useLocation();

  // Maneja el click para abrir/cerrar submenús
  const handleClick = (path) => {
    setOpen((prevState) => ({ ...prevState, [path]: !prevState[path] }));
  };

  // Verifica si la ruta actual está seleccionada
  const isSelected = (path) => location.pathname === path;

  const isPathInChildren = (children) => {
    return children.some(
      (child) =>
        location.pathname.startsWith(child.path) ||
        (child.children && isPathInChildren(child.children))
    );
  };

  // Filtra los elementos por el área
  const filterByArea = (items) => {
    return items
      .filter((item) => !item.area || item.area === userArea)
      .map((item) => ({
        ...item,
        children: item.children ? filterByArea(item.children) : [],
      }));
  };

  const filteredData = filterByArea(listData);

  // Al cargar el componente, expande los ítems que coinciden con la ruta actual
  useEffect(() => {
    const newOpenState = {};

    const expandItems = (items) => {
      items.forEach((item) => {
        if (item.path && location.pathname.startsWith(item.path)) {
          newOpenState[item.path] = true;
        }
        if (item.children && isPathInChildren(item.children)) {
          newOpenState[item.path] = true;
          expandItems(item.children); // Recursivamente verificar hijos
        }
      });
    };

    expandItems(filteredData);

    // Solo actualiza el estado si ha habido un cambio
    if (JSON.stringify(open) !== JSON.stringify(newOpenState)) {
      setOpen(newOpenState);
    }
  }, []);

  // Función para renderizar los elementos del menú de manera recursiva
  const renderMenuItems = (items) => {
    return items.map((item) => (
      <div key={item.path || item.name}>
        <ListItemButton
          onClick={() => handleClick(item.path)}
          component={item.path ? Link : undefined}
          to={item.path || ""}
          sx={{
            pl: item.pl,
            backgroundColor: isSelected(item.path) ? "#f0f0f0" : "inherit",
            borderRight: isSelected(item.path)
              ? "4px solid #0d1f2d"
              : "4px solid transparent",
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
            color: isSelected(item.path) ? "#0d1f2d" : "inherit",
          }}
          selected={isSelected(item.path)}
        >
          {item.icon && (
            <ListItemIcon
              sx={{
                "& svg": {
                  fill: isSelected(item.path) ? "#0d1f2d" : "inherit",
                },
              }}
            >
              {item.icon}
            </ListItemIcon>
          )}
          <ListItemText primary={item.name} />
          {item.children.length > 0 &&
            (open[item.path] ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>
        {item.children.length > 0 && (
          <Collapse in={open[item.path]} timeout="auto" unmountOnExit>
            <List sx={{ pl: 2 }}>{renderMenuItems(item.children)}</List>
          </Collapse>
        )}
      </div>
    ));
  };

  return <List sx={{ padding: 0 }}>{renderMenuItems(filteredData)}</List>;
};

ListSideBar.propTypes = {
  listData: PropTypes.array.isRequired,
  userArea: PropTypes.string.isRequired,
};

export default ListSideBar;
