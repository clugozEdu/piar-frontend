import { useEffect, useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Checkbox,
  Tooltip,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import SharedIcon from "@mui/icons-material/Share";
import { useFormikContext } from "formik";
import PropTypes from "prop-types";

const AdvisorSelect = ({ advisors, disabled }) => {
  const { values, setFieldValue } = useFormikContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAdvisors, setSelectedAdvisors] = useState([]);

  useEffect(() => {
    if (values.advisorsShared) {
      setSelectedAdvisors(values.advisorsShared);
    }
  }, [values.advisorsShared]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggle = (advisor) => {
    const currentIndex = selectedAdvisors.indexOf(advisor);
    const newSelectedAdvisors = [...selectedAdvisors];

    if (currentIndex === -1) {
      newSelectedAdvisors.push(advisor);
    } else {
      newSelectedAdvisors.splice(currentIndex, 1);
    }

    setSelectedAdvisors(newSelectedAdvisors);
    setFieldValue("advisorsShared", newSelectedAdvisors);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Tooltip title="Seleccionar Asesores">
        <span>
          <IconButton
            onClick={handleClick}
            disabled={disabled}
            sx={{
              color: disabled ? "#c0c0c0" : "#0d1f2d",
              fill: disabled ? "#c0c0c0" : "#0d1f2d",
            }}
          >
            <SharedIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {advisors.length > 0 ? (
          advisors.map((advisor) => (
            <MenuItem key={advisor.id} onClick={() => handleToggle(advisor)}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={selectedAdvisors.indexOf(advisor) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText primary={advisor.first_name} />
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No hay asesores disponibles</MenuItem>
        )}
      </Menu>
    </div>
  );
};

AdvisorSelect.propTypes = {
  advisors: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
};

export default AdvisorSelect;
