import { useEffect, useState } from "react";
import { Box, Menu, MenuItem, IconButton } from "@mui/material";
import { useTheme } from "@emotion/react";
import { ArrowRightLeft } from "lucide-react";
import { getColorsScheme } from "@/utilities/helpers";
import { putData } from "@/services/api";
import PropTypes from "prop-types";

const MenuCards = ({ task, statusTask, setShowAlert }) => {
  const [itemsMenu, setItemsMenu] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();

  // filter data from menu
  useEffect(() => {
    setItemsMenu(statusTask?.filter((item) => item.id !== task.status.id));
  }, [task.status.id, statusTask]);

  const handleMenuClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const onClickHandler = async (e) => {
    const dataPost = {
      status_id: e.currentTarget.id,
    };
    await putData(`api/clickup/tasks/${task.id}`, dataPost);
    setShowAlert(true);
    handleMenuClose();
  };

  return (
    <Box
      display="flex"
      sx={{
        alignItems: "center",
        pl: 1,
      }}
    >
      <IconButton
        onClick={(event) => {
          handleMenuClick(event);
        }}
        sx={{
          padding: "0px 0px 0px 0px",
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
          borderRadius: 1,
        }}
      >
        <ArrowRightLeft
          size={20}
          color={getColorsScheme(task.status.name, theme.palette.statusTask)}
        />
      </IconButton>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {itemsMenu?.map((item, index) => (
          <MenuItem
            key={index}
            id={item.id}
            onClick={(e) => {
              onClickHandler(e);
            }}
          >
            {item.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

MenuCards.propTypes = {
  // idStatus: PropTypes.string,
  task: PropTypes.object,
  statusTask: PropTypes.array,
  setShowAlert: PropTypes.func,
};

export default MenuCards;
