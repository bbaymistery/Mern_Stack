import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="navbar" style={{ padding: "10px" }}>
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">website  was made </span>
          <br />
          <span className="logo">Elgun Ezmemmedov</span>
        </Link>
        {user ? <p style={{ color: "red" }}>{user.username}</p> : (
          <div className="navItems">

            <Link to="/register">
              <button className="navButton">Register</button>

            </Link>
            <Link to="/login" style={{ color: "inherit", textDecoration: "none" }}>
              <button className="navButton">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
