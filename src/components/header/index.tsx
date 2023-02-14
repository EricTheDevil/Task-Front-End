import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

import { ThemeContext } from "../ThemeProvider";

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="header">
      <div className="header__nav">
        <Link to="/">
          <Button>Home</Button>
        </Link>
        <Link to="/country/favorite">
          <Button> Favorites </Button>
        </Link>
        <Button onClick={toggleTheme}>
          Switch to {theme === "light" ? "dark" : "light"}
        </Button>
      </div>
    </div>
  );
}

export default Header;
