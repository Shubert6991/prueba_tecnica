import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import CryptoJS from "crypto-js";
import axios from "axios";

function Registro() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState();
  const [email, setEmail] = useState();
  const [pass1, setPass1] = useState();
  const [pass2, setPass2] = useState();

  const [message, setMessage] = useState();
  const [error, setError] = useState();

  const sendInfo = () => {
    // register user info on api
    axios
      .post("https://candidates-exam.herokuapp.com/api/v1/usuarios", {
        nombre: nombre,
        email: email,
        password: CryptoJS.MD5(pass1).toString(),
        password_confirmation: CryptoJS.MD5(pass2).toString(),
      })
      .then((res) => {
        // redirect to login
        console.log(res);
        setMessage(res.statusText);
        setTimeout(() => navigate("/prueba_tecnica/login", { replace: true }), 2000);
      })
      .catch((error) => setError(error.response.data.error));
  };

  return (
    <div className="card" style={{ width: "30rem" }}>
      <div className="card-body">
        <form className="my-2">
          <div className="mb-3">
            <label htmlFor="inputName" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              className="form-control"
              id="inputName"
              aria-describedby="nameHelp"
              onChange={(e) => setNombre(e.target.value)}
            />
            <div id="nameHelp" className="form-text">
              Ingresa tu nombre
            </div>
          </div>

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
              onChange={(e) => setPass1(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="inputPassword2" className="form-label">
              Confirmacion de Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="inputPassword2"
              aria-describedby="passHelp"
              onChange={(e) => setPass2(e.target.value)}
            />
            <div id="passHelp" className="form-text">
              Confirma tu contraseña
            </div>
          </div>

          <button type="button" className="btn btn-primary" onClick={sendInfo}>
            Registrarse
          </button>
        </form>

        {message && (
          <div className="alert alert-success" role="alert">
            {message}
          </div>
        )}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default Registro;
