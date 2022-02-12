import React from "react";
import { Link } from "react-router-dom";
import "./Header.styles.css";
const Header = () => {
  return (
    <nav>
      <Link to="/">Home Page</Link>
      <Link to="/create">Create/Edit Page</Link>
      <Link to="/flash">Flash Cards</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Sign Up</Link>
    </nav>
  );
};
export default Header;
