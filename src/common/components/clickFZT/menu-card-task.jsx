import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Menu, MenuItem, IconButton } from "@mui/material";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
// import { handlerUpdateBD } from "../../../supabaseServices";
// import useUser from "../../../context/users";
``;
const initialItemsMenu = [
  {
    id: "aaa27da1-0c16-4cf5-adde-bf0144c538e8",
    label: "Backlog",
  },
  {
    id: "c5171577-dc5c-4350-9f9b-38a96f1212a1",
    label: "Doing",
  },
  {
    id: "5a7ee6b5-d2e1-4772-bc22-601bf576deae",
    label: "Done",
  },
];

const MenuCards = ({ taskId, idStatus }) => {
  // const { advisorLogin } = useUser();

  const [itemsMenu, setItemsMenu] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  // filter data from menu
  useEffect(() => {
    if (idStatus) {
      setItemsMenu(initialItemsMenu.filter((item) => item.id !== idStatus));
    }
  }, [idStatus]);

  const handleMenuClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const onClickHandler = (e) => {
    console.log(`Tarea ${taskId} movida a ${e.currentTarget.id}`);
    handleMenuClose();
  };

  return (
    <>
      <IconButton
        onClick={(event) => {
          handleMenuClick(event);
        }}
      >
        <SyncAltIcon />
      </IconButton>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {itemsMenu.map((item, index) => (
          <MenuItem
            key={index}
            id={item.id}
            onClick={(e) => {
              onClickHandler(e);
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

MenuCards.propTypes = {
  idStatus: PropTypes.string,
  taskId: PropTypes.string,
};

export default MenuCards;
