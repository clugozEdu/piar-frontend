import { useState, useEffect } from "react";
import {
  Alert,
  AlertTitle,
  Snackbar,
  Box,
  Button,
  CircularProgress,
  TextField,
  Paper,
  Typography,
  Slide,
  IconButton,
  InputAdornment,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin } from "../redux/login-slice";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Copyright from "../components/copy-right";
import "./login.css";

const SignIn = () => {
  const [dataLogin, setDataLogin] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setShowAlert] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, is_authenticated } = useSelector(
    (state) => state.loginAdvisor
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowAlert(false);
    dispatch(fetchLogin(dataLogin));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (is_authenticated) {
      navigate("/home");
    } else if (error) {
      setShowAlert(true);
    }
  }, [error, is_authenticated, navigate]);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to top, #578e22,  #0084cb)",
        opacity: 0,
        animation: "fadeIn 1s ease-in-out forwards",
      }}
    >
      <Grid
        container
        component={Paper}
        elevation={6}
        sx={{
          width: { xs: "80%", sm: "60%", md: "40%", lg: "30%" },
          padding: 4,
          borderRadius: 5,
          boxShadow: 3,
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          animation: "zoomIn 0.5s ease-in-out",
        }}
        className="form-container"
      >
        <CssBaseline />

        <img
          src="../../../public/logo.png"
          alt="logo"
          style={{
            width: "200px",
            animation: "bounceIn 1s",
          }}
        />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginTop: 1 }}
        >
          Programa Integral de Administración Regional
        </Typography>
        <Typography component="h1" variant="h5" sx={{ marginTop: 2 }}>
          Iniciar sesión
        </Typography>

        {alert && (
          <Snackbar
            open={alert}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            autoHideDuration={6000}
            TransitionComponent={(props) => (
              <Slide {...props} direction="down" />
            )}
          >
            <Alert severity="error" sx={{ mt: 2, borderRadius: 4 }}>
              <AlertTitle>Error</AlertTitle>
              {error}
            </Alert>
          </Snackbar>
        )}
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          onKeyDown={handleKeyDown}
          sx={{ mt: 1, width: "100%" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo @fztedu.org"
            name="email"
            value={dataLogin.username}
            onChange={(e) =>
              setDataLogin({ ...dataLogin, username: e.target.value })
            }
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 4,
                transition: "border-color 0.3s, transform 0.3s",
              },
              "& .MuiOutlinedInput-root:focus-within": {
                borderColor: "#3f51b5",
                transform: "scale(1.02)",
              },
            }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            id="password"
            value={dataLogin.password}
            onChange={(e) =>
              setDataLogin({ ...dataLogin, password: e.target.value })
            }
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 4,
                transition: "border-color 0.3s, transform 0.3s",
              },
              "& .MuiOutlinedInput-root:focus-within": {
                borderColor: "#3f51b5",
                transform: "scale(1.02)",
              },
            }}
          />
          <Box sx={{ position: "relative", mt: 2 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                borderRadius: 4,
                position: "relative",
                overflow: "hidden",
                "&:disabled": {
                  backgroundColor: "#ccc",
                  color: "#fff",
                },
                "&:hover": {
                  backgroundColor: "#70b62b",
                },
              }}
              disabled={loading || !dataLogin.username || !dataLogin.password}
            >
              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    color: "white",
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    marginLeft: "-12px",
                    marginTop: "-12px",
                  }}
                />
              )}
              {loading ? "Accediendo..." : "Iniciar sesión"}
            </Button>
          </Box>
        </Box>
        <Copyright marginTop={2} />
      </Grid>
    </Box>
  );
};

export default SignIn;
