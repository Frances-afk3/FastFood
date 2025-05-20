import { Outlet, Link } from "react-router-dom";
import { useContext } from "react";
import { useAuth } from "../AuthContext";
export default function ClienteRoot() {
  const { user, logout } = useAuth();
  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark pt-0">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/Home">Home</Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <Link className="nav-link" to="/Pacchetti">Pacchetti</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Album">Album</Link>
              </li>
            </ul>
            {user ? (
              <span className="navbar-text text-white">Benvenuto, {user.username}</span>
            ) : (
              <Link className="nav-link" to="/Accedi">Login</Link>
            )}
          </div>
        </div>
      </nav>

      <div className="mt-5 pt-4">
        <Outlet context={{ user }} />
      </div>
    </>
  );
}
