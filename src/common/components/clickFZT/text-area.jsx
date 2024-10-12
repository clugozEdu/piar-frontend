import { TextareaAutosize } from "@mui/material";
import PropTypes from "prop-types";

const TextAreaCustom = ({ value, onChange, ...props }) => {
  return (
    <TextareaAutosize
      {...props}
      value={value}
      onChange={onChange}
      aria-label="empty textarea"
      placeholder="Escribe una descripción"
      style={{
        boxSizing: "border-box",
        width: "100%",
        fontFamily: "Roboto, sans-serif",
        fontSize: "0.875rem",
        fontWeight: "400",
        lineHeight: "1.5",
        padding: "12px",
        borderRadius: "12px 12px 0 12px",
        color: "#1C2025",
        background: "#fff",
        border: "1px solid #DAE2ED",
        boxShadow: "0 2px 2px 0 #F3F6F9",
        "&:hover": {
          borderColor: "#3399FF",
        },
        "&:focus": {
          outline: "0",
          borderColor: "#007FFF",
          boxShadow: "0 0 0 3px #b6daff",
        },
      }}
    />
  );
};

TextAreaCustom.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default TextAreaCustom;
