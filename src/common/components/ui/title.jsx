import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import PropTypes from "prop-types";

const GradientText = styled(Typography)({
  background: "linear-gradient(90deg, #0084cb,  #578e22)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  textFillColor: "transparent",
});

const Title = ({ text }) => {
  return <GradientText variant="h5">{text}</GradientText>;
};

Title.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Title;
