import { useState, useEffect } from "react";
import { Box, List } from "@mui/material";
import PropTypes from "prop-types";
import ListSideClickFZT from "@/feactures/clickFZT/components/sideBar/list-side-click-fzt";
// import Title from "../ui/title";

/** Component to render to menu from menu selected
 * @param {array} listData - Array of objects with the list data
 * @param {object} userLogin - Object with the user login data
 * @param {string} selectedMenu - Id of the selected menu
 */

const InitSideBar = ({ userLogin, selectedMenu }) => {
  /** Init state the component */
  const [contextMenu, setContextMenu] = useState(selectedMenu);

  /** UseEffect to set the context menu */
  useEffect(() => {
    setContextMenu(selectedMenu);
  }, [selectedMenu]);

  return (
    <>
      {/** Title */}
      <Box
        display="flex"
        pl={1}
        justifyContent="center"
        alignItems="center"
        id="box-title-side-bar"
        gap={1}
      >
        {/** Logo */}
        <img src="/public/logo.png" alt="Logo" height="70px" />

        {/* * Título
        <Title
          sx={{
            pl: 1,
          }}
          text="Click FZT"
        /> */}
      </Box>
      {/** List of menu options */}
      <List sx={{ padding: 1 }} id="list-side-bar-init">
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
  // listData: PropTypes.array.isRequired,
  userLogin: PropTypes.object.isRequired,
  selectedMenu: PropTypes.string,
};

export default InitSideBar;
