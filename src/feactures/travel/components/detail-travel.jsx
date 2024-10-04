import Grid from "@mui/material/Grid2";
import { Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SchoolIcon from "@mui/icons-material/School";
import GroupIcon from "@mui/icons-material/Group";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import PropTypes from "prop-types";

const TravelDetail = ({ data }) => {
  const { advisor } = useSelector((state) => state.loginAdvisor);

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <PersonIcon sx={{ mr: 1 }} />
          <Typography variant="subtitle1">
            Dueño del viaje: {`${advisor.first_name} ${advisor.last_name}`}
          </Typography>
        </Box>
      </Grid>
      <Grid size={12}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <GroupIcon sx={{ mr: 1 }} />
          <Typography variant="subtitle1">
            Compartido con: {data.advisorsShared.join(", ")}
          </Typography>
        </Box>
      </Grid>
      {/* <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <EventIcon sx={{ mr: 1 }} />
        <Typography variant="subtitle1">
          Shared Travel: {data.sharedTravel ? "Yes" : "No"}
        </Typography>
      </Box> */}
      <Grid size={6}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <EventIcon sx={{ mr: 1 }} />
          <Typography variant="subtitle1">
            Fecha del viaje: {new Date(data.date).toLocaleDateString()}
          </Typography>
        </Box>
      </Grid>
      <Grid size={6}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AccessTimeIcon sx={{ mr: 1 }} />
          <Typography variant="subtitle1">Llegada: {data.entryTime}</Typography>
        </Box>
      </Grid>
      <Grid size={6}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AccessTimeIcon sx={{ mr: 1 }} />
          <Typography variant="subtitle1">
            Salida: {data.departureTime}
          </Typography>
        </Box>
      </Grid>
      <Grid size={12}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <SchoolIcon sx={{ mr: 1 }} />
          <Typography variant="subtitle1">
            Escuela(s): {data.idSchool.join(", ")}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

TravelDetail.propTypes = {
  data: PropTypes.object.isRequired,
};
export default TravelDetail;
