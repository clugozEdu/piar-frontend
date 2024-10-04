import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useTheme, useMediaQuery } from "@mui/material";
import {
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  CssBaseline,
  Box,
} from "@mui/material";
import PropTypes from "prop-types";
import MenuIcon from "@mui/icons-material/Menu";
// import NavLinksBreadcrumbs from "./Breadcrumbs";
import navLinks from "./nav-links";
import ListSideBar from "./list-side-bar";
import AccountMenu from "../ui/account-menu";

function AppBarSite({ advisor }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Función para manejar la apertura y cierre del drawer
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  console.log(advisor);

  const fullname = `${advisor[0].first_name} ${advisor[0].last_name}`;
  const { area_name } = advisor[0].area;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ backgroundColor: "#0d1f2d" }}>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <img src="/public/logo.png" alt="Logo" style={{ height: "50px" }} />
          <Typography variant="h6" noWrap sx={{ flexGrow: 1, marginLeft: 2 }}>
            PIAR Fundación Zamora Terán
          </Typography>
          <Typography variant="h6" noWrap sx={{ marginRight: 1 }}>
            {fullname}
          </Typography>
          <AccountMenu userName={fullname} />
        </Toolbar>
      </AppBar>
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: 280,
          [`& .MuiDrawer-paper`]: { width: 280, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <ListSideBar listData={navLinks} userArea={area_name} />
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, mt: 6 }}
        id="box-outlet-main"
      >
        {/* <NavLinksBreadcrumbs /> */}
        <Outlet />
      </Box>
    </Box>
  );
}

AppBarSite.propTypes = {
  advisor: PropTypes.array.isRequired,
};

export default AppBarSite;
