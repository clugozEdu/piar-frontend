import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "@mui/material";
import { Drawer, Box } from "@mui/material";
import PropTypes from "prop-types";
import { menuIconsBar } from "./nav-links";
import BreadCrumbsHeader from "../ui/breadcrumbs";
import ListIconsMenu from "./list-icon-menu";
import InitSideBar from "./init-side-bar";
import AccountMenu from "../ui/account-menu";
import LoadingGLobal from "../ui/loading-global";
import useLoading from "@/common/hooks/calllbacks/loading";
import { useLocation } from "react-router-dom";

/** Component to Init App Bars in site
 * @param {array} advisor - Array of objects with the advisor login data
 */

const AppBarSite = ({ advisor }) => {
  /** Init state the component */
  const location = useLocation();
  const [selectedMenu, setSelectedMenu] = useState("home");
  const { isLoading } = useLoading();
  const theme = useTheme();

  /** UseEffect to set menu selected change */
  useEffect(() => {
    const path = location.pathname.split("/")[1];
    setSelectedMenu(path);
  }, [location.pathname]);

  /** Set full name the advisor login from component AccountMenu */
  const fullname = `${advisor[0].first_name} ${advisor[0].last_name}`;

  return (
    <>
      {/** Loading */}
      {isLoading && <LoadingGLobal />}
      {/** Box to AppBar Site */}
      <Box
        id="box-app-bar-site"
        sx={{
          display: "flex",
          height: "98vh",
          margin: "1px 1px",
          alignContent: "center",
        }}
      >
        {/** Drawer to ListIcon Menu Set */}
        <Drawer
          id="drawer-icons-bar"
          variant={"permanent"}
          ModalProps={{ keepMounted: true }}
          sx={{
            width: 60,
            [`& .MuiDrawer-paper`]: {
              width: 75,
              boxSizing: "border-box",
              background: theme.palette.primary.main,
            },
          }}
        >
          {/** Component List Icon Menu to App ClickFZT
           * arrayMenu: Array of Objects from nav-links.js
           * selectedMenu: String with the selected menu
           * setSelectedMenu: Function to set the selected menu
           */}
          <ListIconsMenu
            arrayMenu={menuIconsBar}
            selectedMenu={selectedMenu}
            setSelectedMenu={setSelectedMenu}
          />
        </Drawer>

        {/** Box to Sidebar depend to List Menu Icon selected */}
        <Box
          id="box-sidebar"
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: 280,
            minWidth: 300,
            padding: "5px 1px 15px 15px",
            // background: theme.palette.secondary.main,
          }}
        >
          {/** Component List Side Bar to all Icons Menu
           * listData: Array of Objects from nav-links.js
           * userLogin: Object with the advisor data
           * selectedMenu: String with the selected menu
           * loadingGlobal: Function to set the loading global
           * */}
          <InitSideBar
            // listData={navLinks}
            userLogin={advisor[0]}
            selectedMenu={selectedMenu}
          />
        </Box>

        {/** Box to Main Content of the App */}
        <Box
          component="main"
          sx={{
            // background: "linear-gradient(to bottom, #578e22,  #0084cb)",
            opacity: 0,
            animation: "fadeIn 1s ease-in-out forwards",
            flexGrow: 1,
            height: "100%",
            overflow: "auto",
            boxShadow: 3,
            borderRadius: 2,
            // border: "1px solid #ffffff",
            scrollbarWidth: "none",
          }}
          id="box-outlet-main"
        >
          {/** Box to Account Menu */}
          <Box
            id="box-header-main"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0px 0px 0px 0px",
              position: "sticky",
              top: 0,
              backgroundColor: "white",
              zIndex: 1000,
            }}
          >
            <BreadCrumbsHeader />
            {/** Component Account Menu to App ClickFZT
             * userName: String with the full name of the advisor
             */}
            <AccountMenu userName={fullname} />
          </Box>

          {/** Box to Outlet of the App */}
          <Box
            sx={{
              flexGrow: 1,
              padding: "0px 20px 0px 20px",
            }}
            id="box-oulet"
          >
            {/** Component Outlet
             * Render the component of the selected menu
             */}
            <Outlet />
          </Box>
        </Box>
      </Box>
    </>
  );
};

/** PropTypes
 * advisor: Required: Array of objects with the advisor login data
 */
AppBarSite.propTypes = {
  advisor: PropTypes.array.isRequired,
};

export default AppBarSite;
