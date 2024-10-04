import { useState, useEffect } from "react";
import { CssBaseline } from "@mui/material";
import { useSelector } from "react-redux";
import AppBarSite from "./common/components/layout/side-bar";

function App() {
  const [advisorLogin, setAdvisorLogin] = useState([]);
  const { advisor } = useSelector((state) => state.loginAdvisor);

  useEffect(() => {
    setAdvisorLogin([advisor]);
  }, [advisor]);

  return (
    <>
      {/* Init Layout */}
      <CssBaseline />
      {advisorLogin.length > 0 && <AppBarSite advisor={advisorLogin} />}
    </>
  );
}

export default App;
