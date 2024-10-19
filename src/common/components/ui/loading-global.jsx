import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const LoadingGLobal = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress
        sx={{
          zIndex: 9999,
        }}
      />
    </Box>
  );
};

export default LoadingGLobal;
