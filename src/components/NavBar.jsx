import { Link, useNavigate } from "react-router-dom";
import { useMovieContext } from "../contexts/MovieContext";

import "../css/NavBar.css";
import { auth } from "../lib/firebase";

function NavBar() {
  const { user, logout } = useMovieContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Movie app</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        {user && <Link to="/favorites" className="nav-link">Favorites</Link>}
        {!user ? (
          <Link to="/auth" className="nav-link">Sign In</Link>
        ) : (
          <button onClick={handleLogout} className="nav-link logout-button">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default NavBar;


/*import { Link } from "react-router-dom"
import "../css/NavBar.css"

function NavBar() {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
             <Link to="/">Movie app</Link>
            </div>
            <div className="navbar-links">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/Favorites" className="nav-link">Favorites</Link>
            </div> 
        </nav>
    )
}

export default NavBar
*/