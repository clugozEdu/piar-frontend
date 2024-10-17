import { useState, useEffect } from "react";
import { useTheme } from "@emotion/react";
import PropTypes from "prop-types";
import { Box, IconButton, Typography } from "@mui/material";
import { LayoutGrid, LayoutList, LayoutDashboard } from "lucide-react";
import useLoading from "@/common/hooks/calllbacks/loading";

const HeaderMenu = ({ onChangeView, viewSelected, context }) => {
  const theme = useTheme();
  const [selectedView, setSelectedView] = useState(viewSelected);
  const [pendingView, setPendingView] = useState(null); // Estado para la vista pendiente
  const { setIsLoading } = useLoading();

  // useEffect para manejar el cambio de vist
  useEffect(() => {
    if (pendingView) {
      setIsLoading(true);

      setSelectedView(pendingView);
      onChangeView(pendingView);

      setIsLoading(false);

      // Resetea la vista pendiente
      setPendingView(null);
    }
  }, [pendingView, setIsLoading, onChangeView]);

  const handleChangeView = (newValue) => {
    // Si la vista es diferente a la actual, iniciamos el proceso de cambio de vista
    if (newValue !== selectedView) {
      setPendingView(newValue); // Setea la nueva vista pendiente
    }
  };

  return (
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
            color:
              selectedView === "dashboard"
                ? theme.palette.secondary.main
                : theme.palette.primary.secondary,
            flexDirection: "row",
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
            borderRadius: 1,
          }}
          style={{ display: context !== "spacing" ? "none" : "flex" }}
          disableRipple={true}
        >
          <LayoutDashboard size={24} />
          <Typography
            variant="body2"
            sx={{
              fontSize: "0.9rem",
              pl: 0.5,
            }}
          >
            Dashboard
          </Typography>
        </IconButton>

        {/* Tablero */}
        <IconButton
          onClick={() => handleChangeView("board")}
          sx={{
            padding: "0px 10px 0px 0px",
            color:
              selectedView === "board"
                ? theme.palette.secondary.main
                : theme.palette.primary.secondary,
            flexDirection: "row",
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
            borderRadius: 1,
          }}
          disableRipple={true}
        >
          <LayoutGrid size={24} />
          <Typography
            variant="body2"
            sx={{
              fontSize: "0.9rem",
              pl: 0.5,
            }}
          >
            Tablero
          </Typography>
        </IconButton>

        {/* Lista */}
        <IconButton
          onClick={() => handleChangeView("list")}
          sx={{
            padding: "0px 10px 0px 0px",
            color:
              selectedView === "list"
                ? theme.palette.secondary.main
                : theme.palette.primary.secondary,
            flexDirection: "row",
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
            borderRadius: 1,
          }}
          disableRipple={true}
        >
          <LayoutList size={24} />
          <Typography
            variant="body2"
            sx={{
              fontSize: "0.9rem",
              pl: 0.5,
            }}
          >
            Lista
          </Typography>
        </IconButton>
      </Box>
    </Box>
  );
};

HeaderMenu.propTypes = {
  onChangeView: PropTypes.func.isRequired,
  viewSelected: PropTypes.string,
  context: PropTypes.string,
};

export default HeaderMenu;
