import { useState } from "react";
import HeaderMenu from "../../common/components/ui/header-menu";

const HomePage = () => {
  const [view, setView] = useState("dashboard");

  const handleChangeView = (newView) => {
    setView(newView);
    console.log(view);
  };

  return (
    <div>
      <HeaderMenu
        views={["dashboard", "calendar", "table", "board"]}
        onChangeView={handleChangeView}
      />
      <h1>Home Page</h1>
    </div>
  );
};

export default HomePage;
