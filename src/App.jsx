import { useState, useEffect } from "react";
import { CssBaseline } from "@mui/material";
import { useSelector } from "react-redux";
import AppBarSite from "./common/components/layout/app-bar-site";

/** Component App
 * Render the AppBarSite component
 * @return {component}
 */

function App() {
  /** Init state the component */
  const [advisorLogin, setAdvisorLogin] = useState([]);
  const { advisor } = useSelector((state) => state.loginAdvisor);

  /** UseEffect to set the advisor login */
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
