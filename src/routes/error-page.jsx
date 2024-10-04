import { Box, Typography, Button, Container } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const ErrorPage = () => {
  const handleGoHome = () => {
    window.location.href = "/home";
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        textAlign="center"
      >
        <ErrorOutlineIcon
          color="error"
          style={{ fontSize: 80, marginBottom: 20 }}
        />
        <Typography variant="h4" gutterBottom>
          Oops! Algo malo ha pasado.
        </Typography>
        <Typography variant="body1" color="textSecondary">
          La página que buscas pudo haber sido eliminada, cambiado su nombre o
          está temporalmente fuera de servicio.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleGoHome}>
          Ir a la página de inicio
        </Button>
      </Box>
    </Container>
  );
};

export default ErrorPage;
