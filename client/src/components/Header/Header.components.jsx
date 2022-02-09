import React from "react";
import { Link } from "react-router-dom";
import "./Header.styles.css";
const Header = ({ setEdit }) => {
  return (
    <nav>
      <Link onClick={setEdit("false")} to="/">
        Home Page
      </Link>
      <Link onClick={setEdit("false")} to="/create">
        Create/Edit Page
      </Link>
      <Link onClick={setEdit("false")} to="/flash">
        Flash Cards
      </Link>
    </nav>
  );
};
export default Header;
