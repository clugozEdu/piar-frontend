import { useState } from "react";
import PropTypes from "prop-types";
import { Box, IconButton, Typography } from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import TableRowsIcon from "@mui/icons-material/TableRows";
import Dashboard from "@mui/icons-material/Dashboard";
import BreadCrumbsHeader from "./breadcrumbs";

const HeaderMenu = ({ onChangeView }) => {
  const [selectedView, setSelectedView] = useState("dashboard");

  const handleChangeView = (newValue) => {
    const views = ["dashboard", "board", "table", "calendar"];
    const newView = views.find((view) => view === newValue);
    setSelectedView(newView);
    onChangeView(newView);
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <BreadCrumbsHeader />
      </Box>

      <Box
        id="box-header-menu"
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        sx={{
          padding: "5px 0px 5px 0px",
          borderTop: 1,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          sx={{
            padding: "0px 0px 0px 0px",
          }}
        >
          {/* Dashboard */}
          <IconButton
            onClick={() => handleChangeView("dashboard")}
            sx={{
              padding: "0px 10px 0px 0px",
              color: selectedView === "dashboard" ? "#0d1f2d" : "inherit",
              flexDirection: "column",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <Dashboard />
            <Typography
              variant="body2"
              sx={{
                fontSize: "0.7rem",
              }}
            >
              Dashboard
            </Typography>
            {selectedView === "dashboard" && (
              <Box
                sx={{
                  height: 2,
                  width: "100%",
                  backgroundColor: "#0d1f2d",
                  borderRadius: 1,
                  marginTop: 0.5,
                }}
              />
            )}
          </IconButton>

          {/* Calendar */}
          <IconButton
            onClick={() => handleChangeView("calendar")}
            sx={{
              padding: "0px 10px 0px 0px",
              color: selectedView === "calendar" ? "#0d1f2d" : "inherit",
              flexDirection: "column",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <CalendarMonth />
            <Typography
              variant="body2"
              sx={{
                fontSize: "0.7rem",
              }}
            >
              Calendario
            </Typography>
            {selectedView === "calendar" && (
              <Box
                sx={{
                  height: 2,
                  width: "100%",
                  backgroundColor: "#0d1f2d",
                  borderRadius: 1,
                  marginTop: 0.5,
                }}
              />
            )}
          </IconButton>

          {/* Table */}
          <IconButton
            onClick={() => handleChangeView("table")}
            sx={{
              padding: "0px 10px 0px 0px",
              color: selectedView === "table" ? "#0d1f2d" : "inherit",
              flexDirection: "column",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <TableRowsIcon />
            <Typography
              variant="body2"
              sx={{
                fontSize: "0.7rem",
              }}
            >
              Tabla
            </Typography>
            {selectedView === "table" && (
              <Box
                sx={{
                  height: 2,
                  width: "100%",
                  backgroundColor: "#0d1f2d",
                  borderRadius: 1,
                  marginTop: 0.5,
                }}
              />
            )}
          </IconButton>

          {/* Tablero */}
          <IconButton
            onClick={() => handleChangeView("board")}
            sx={{
              padding: "0px 10px 0px 0px",
              color: selectedView === "board" ? "#0d1f2d" : "inherit",
              flexDirection: "column",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <GridViewIcon />
            <Typography
              variant="body2"
              sx={{
                fontSize: "0.7rem",
              }}
            >
              Tablero
            </Typography>
            {selectedView === "board" && (
              <Box
                sx={{
                  height: 2,
                  width: "100%",
                  backgroundColor: "#0d1f2d",
                  borderRadius: 1,
                  marginTop: 0.5,
                }}
              />
            )}
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

HeaderMenu.propTypes = {
  onChangeView: PropTypes.func.isRequired,
};

export default HeaderMenu;
