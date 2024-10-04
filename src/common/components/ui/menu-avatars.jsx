import {
  Menu,
  MenuItem,
  Radio,
  Avatar,
  ListItemText,
  ListItemAvatar,
  ListItemIcon,
} from "@mui/material";
import { stringAvatar } from "../../../utilities/helpers";
import PropTypes from "prop-types";

/**
 ** Component to show a list of users with their avatars
 * @param {*} {
 *   users, --> array of users
 *   anchorEl, --> element to anchor the menu
 *   open, --> boolean to show or hide the menu
 *   handleMenuToggle, --> function to show or hide the menu
 *   handleManuItemToggle, --> function to select or unselect a user
 *   selectedAdvisors, --> array of selected users
 * }
 * @return {*} a list of users with their avatars
 */
const MenuAvatarsUsers = ({
  users,
  anchorEl,
  open,
  handleMenuToggle,
  handleManuItemToggle,
  selectedAdvisors,
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleMenuToggle}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      {users.length > 0 &&
        users.map((advisor) => (
          <MenuItem
            key={advisor.id}
            name="advisorsShared"
            onClick={() => handleManuItemToggle(advisor)}
          >
            <ListItemIcon>
              <Radio
                edge="start"
                checked={selectedAdvisors.indexOf(advisor) !== -1}
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
            <ListItemAvatar>
              <Avatar
                {...stringAvatar(`${advisor.first_name} ${advisor.last_name}`)}
              />
            </ListItemAvatar>
            <ListItemText
              primary={`${advisor.first_name} ${advisor.last_name}`}
            />
          </MenuItem>
        ))}
    </Menu>
  );
};

//*** Define props types for Component ***//
MenuAvatarsUsers.propTypes = {
  anchorEl: PropTypes.object,
  open: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
  handleMenuToggle: PropTypes.func.isRequired,
  handleManuItemToggle: PropTypes.func.isRequired,
  selectedAdvisors: PropTypes.array.isRequired,
};

export default MenuAvatarsUsers;
