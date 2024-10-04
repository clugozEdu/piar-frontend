import { useState } from "react";
import PropTypes from "prop-types";
import { Box, IconButton, Typography } from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import TableRowsIcon from "@mui/icons-material/TableRows";
import Dashboard from "@mui/icons-material/Dashboard";

const HeaderMenu = ({ views, onChangeView }) => {
  const [selectedView, setSelectedView] = useState(views[0]);

  const handleChangeView = (view) => {
    const newView = views.find((v) => v === view);
    setSelectedView(newView);
    onChangeView(newView);
  };

  return (
    <Box
      marginTop={2}
      sx={{
        borderTop: 0.5,
        borderBottom: 0.5,
        borderColor: "divider",
      }}
    >
      <Box display="flex" justifyContent="flex-start" alignItems="center">
        {/* Dashboard */}
        <IconButton
          onClick={() => handleChangeView("dashboard")}
          sx={{
            color: selectedView === "dashboard" ? "#0d1f2d" : "inherit",
            flexDirection: "column",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <Dashboard />
          <Typography variant="body2">Dashboard</Typography>
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
            color: selectedView === "calendar" ? "#0d1f2d" : "inherit",
            flexDirection: "column",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <CalendarMonth />
          <Typography variant="body2">Calendario</Typography>
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
            color: selectedView === "table" ? "#0d1f2d" : "inherit",
            flexDirection: "column",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <TableRowsIcon />
          <Typography variant="body2">Tabla</Typography>
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
            color: selectedView === "board" ? "#0d1f2d" : "inherit",
            flexDirection: "column",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <GridViewIcon />
          <Typography variant="body2">Tablero</Typography>
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
  );
};

HeaderMenu.propTypes = {
  views: PropTypes.array.isRequired,
  onChangeView: PropTypes.func.isRequired,
};

export default HeaderMenu;
