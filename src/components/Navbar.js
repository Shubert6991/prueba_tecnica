import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  // actions to different buttons showed in the navbar
  const goToLogin = () => {
    navigate("/prueba_tecnica/login", { replace: true });
  };

  const goToRegister = () => {
    navigate("/prueba_tecnica/register", { replace: true });
  };

  const logOut = () => {
    sessionStorage.removeItem('token');
    navigate("/prueba_tecnica/login", { replace: true });
  };

  // to show diferent name on the navbar
  let Name = "";
  switch (location.pathname) {
    case "/prueba_tecnica/":
      Name = "Home";
      break;
    case "/prueba_tecnica/register":
      Name = "Registro";
      break;
    case "/prueba_tecnica/login":
      Name = "Log In";
      break;
    default:
      Name = "Error";
      break;
  }

  return (
    <nav className="navbar bg-light">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">{Name}</span>

        {location.pathname === "/prueba_tecnica/register" && (
          <button className="btn btn-success" onClick={goToLogin}>
            Login
          </button>
        )}

        {location.pathname === "/prueba_tecnica/login" && (
          <button className="btn btn-success" onClick={goToRegister}>
            Registrarse
          </button>
        )}

        {location.pathname === "/prueba_tecnica/" && (
          <button className="btn btn-danger" onClick={logOut}>
            Log Out
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
