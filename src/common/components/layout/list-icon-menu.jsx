import {
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

/** Component to render menu options in side bar principal
 * @param {array} arrayMenu - Array of objects with the menu options
 * @param {string} selectedMenu - Id of the selected menu
 * @param {function} setSelectedMenu - Function to set the selected menu
 */
const ListIconsMenu = ({ arrayMenu, selectedMenu, setSelectedMenu }) => {
  const theme = useTheme();
  /** Function to change menu selected */
  const handleClick = (id) => {
    setSelectedMenu(id);
  };

  /** Function to check if the menu is selected */
  const isSelected = (id) => selectedMenu === id;

  /** Function to render the menu items */
  const renderMenuItems = (items) => {
    return items.map((item) => (
      <div key={item.id}>
        {/* Item button with the menu option */}
        <ListItemButton
          onClick={() => handleClick(item.id)}
          component={item.path ? Link : undefined}
          to={item.path || ""}
          sx={{
            pl: item.pl,
            borderBottom: isSelected(item.id)
              ? "4px solid #7bd94b"
              : "4px solid transparent",
            "&:hover": {
              backgroundColor: theme.palette.drawer.hover,
            },
            color: isSelected(item.id)
              ? theme.palette.drawer.selected
              : "#ffffff",
            flexDirection: "column",
            alignItems: "center",
          }}
          selected={isSelected(item.id)}
        >
          {/* Icon of the menu option */}
          {item.icon && (
            <ListItemIcon
              sx={{
                minWidth: "auto",
                "& svg": {
                  fill: isSelected(item.id)
                    ? theme.palette.drawer.selected
                    : "#ffffff",
                },
              }}
            >
              {item.icon}
            </ListItemIcon>
          )}
          {/* Text of the menu option */}
          <ListItemText
            sx={{ padding: 0 }}
            primary={
              <Typography variant="body2" align="center">
                {item.name}
              </Typography>
            }
          />
        </ListItemButton>
      </div>
    ));
  };

  return (
    /* List of menu options */
    <List id="list-icons-bar" sx={{ padding: 0 }}>
      {/* Render function the menu options */}
      {renderMenuItems(arrayMenu)}
    </List>
  );
};

/** Prop Types
 * arrayMenu: Required: Array of objects with the menu options
 * selectedMenu: Id of the selected menu
 * setSelectedMenu: Function to set the selected menu
 */
ListIconsMenu.propTypes = {
  arrayMenu: PropTypes.array.isRequired,
  selectedMenu: PropTypes.string,
  setSelectedMenu: PropTypes.func,
};

export default ListIconsMenu;
