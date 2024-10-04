import { useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid2";
import SharedIcon from "@mui/icons-material/Share";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdvisors } from "../../../redux/slices/advisors-slice";
import { useFormikContext } from "formik";
import MenuAvatarsUsers from "../ui/menu-avatars";

/**
 ** Component SharedAdvisors for share travel with advisors
 * This component is used in the form of the travel
 **/
const SharedAdvisors = () => {
  const dispatch = useDispatch();
  const { advisors, loading } = useSelector((state) => state.advisors);
  const { values, setFieldValue } = useFormikContext();
  const [advisorShared, setAdvisorShared] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAdvisors, setSelectedAdvisors] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  //**** UseEffect for set advisors for the same area of the advisor login ****//
  useEffect(() => {
    setAdvisorShared(advisors.length > 0 ? advisors : []);
  }, [advisors]);

  //**** UseEffect for load menu when the advisors are loaded ****//
  useEffect(() => {
    if (!loading && menuOpen) {
      setAnchorEl(menuOpen);
      setMenuOpen(false);
    }
  }, [loading, menuOpen]);

  //**** Handler for toggle advisors selected in formik values ****//
  const handleToggle = (advisor) => {
    // get current index of advisor
    const currentIndex = selectedAdvisors.indexOf(advisor);
    // create a new array of selected advisors
    const newSelectedAdvisors = [...selectedAdvisors];

    // if current exists in the array remove it, else add it
    if (currentIndex === -1) {
      newSelectedAdvisors.push(advisor);
    } else {
      newSelectedAdvisors.splice(currentIndex, 1);
    }

    // set the new array of selected advisors pass to component AvatarMenu
    setSelectedAdvisors(newSelectedAdvisors);

    // Set the new array of selected advisors in formik values
    setFieldValue(
      "advisorsShared",
      newSelectedAdvisors.map((advisor) => advisor.id)
    );
  };

  //*** UseEffect to set false or true in sharedTravel when advisorsShared not empty ***/
  useEffect(() => {
    setFieldValue("sharedTravel", values.advisorsShared.length > 0);
  }, [values.advisorsShared, setFieldValue]);

  //**** Dispatch Advisors ****//
  const handlerDispatch = () => {
    if (advisors.length === 0) {
      dispatch(fetchAdvisors());
    }
  };

  //**** Handler open menu and dispatch advisors callback ****//
  const handleMenuToggle = (event) => {
    if (advisors.length === 0) {
      handlerDispatch();
      setMenuOpen(event.currentTarget);
    } else {
      setAnchorEl(anchorEl ? null : event.currentTarget);
    }
  };

  //**** Set boolean open for menu ****//
  const open = Boolean(anchorEl);

  return (
    <Grid container direction="column" alignItems="flex-end" spacing={2}>
      <Grid>
        <Button
          variant="contained"
          color="inherit"
          onClick={handleMenuToggle}
          sx={{
            borderRadius: "20px",
            color: "white",
            backgroundColor:
              selectedAdvisors.length === 0 ? "#1d2e3d" : "#0dac3a",
            "&:hover": {
              backgroundColor:
                selectedAdvisors.length === 0 ? "#1d2e3d" : "#075f20",
            },
          }}
          startIcon={
            loading ? (
              <CircularProgress sx={{ color: "white" }} size={24} />
            ) : (
              <SharedIcon sx={{ fill: "white" }} />
            )
          }
        >
          {selectedAdvisors.length > 0
            ? `${selectedAdvisors.length} compartidos`
            : "Compartir con"}
        </Button>
        {/* Component Avatar For Users Menu */}
        <MenuAvatarsUsers
          users={advisorShared}
          anchorEl={anchorEl}
          open={open}
          handleMenuToggle={handleMenuToggle}
          handleManuItemToggle={handleToggle}
          selectedAdvisors={selectedAdvisors}
        />
      </Grid>
    </Grid>
  );
};

export default SharedAdvisors;
