import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import CryptoJS from "crypto-js";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();

  const [error, setError] = useState();

  const logIn = () => {
    // post user info to login api
    axios
      .post("https://candidates-exam.herokuapp.com/api/v1/auth/login", {
        email: email,
        password: CryptoJS.MD5(pass).toString(),
      })
      .then((res) => {
        // add token to the session storage
        console.log(res);
        sessionStorage.setItem('token', res.data.token);
        navigate("/prueba_tecnica/", { replace: true });
      })
      .catch((error) => setError(error.response.data.error));
  };

  return (
    <div className="card" style={{ width: "30rem" }}>
      <div className="card-body">
        <form className="my-2">
          <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              aria-describedby="emailHelp"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div id="emailHelp" className="form-text">
              Ingresa tu correo electronico
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="inputPassword1" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="inputPassword1"
              onChange={(e) => setPass(e.target.value)}
            />
          </div>

          <button type="button" className="btn btn-primary" onClick={logIn}>
            Log In
          </button>
        </form>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
