import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [state, setState] = useState();
  const [url, setUrl] = useState();
  const [token, setToken] = useState();
  const [file, setFile] = useState();

  const [error, setError] = useState();
  const [message, setMessage] = useState();

  const [pdf, setPdf] = useState();

  useEffect(() => {
    // check if user is logged
    let sessionToken = sessionStorage.getItem("token");
    if (!sessionToken) navigate("/login", { replace: true });
    else {
      // get user info if is logged
      axios
        .get("https://candidates-exam.herokuapp.com/api/v1/usuarios/", {
          headers: { Authorization: `Bearer ${sessionToken}` },
        })
        .then((res) => {
          let data = res.data;
          setEmail(data.email);
          setName(data.nombre);
          setState(data.estado);
          setUrl(data.url);
          setToken(sessionToken);
        });

      // to get pdf file to show
      axios
        .get(
          " https://candidates-exam.herokuapp.com/api/v1/usuarios/mostrar_cv",
          {
            headers: { Authorization: `Bearer ${sessionToken}` },
          }
        )
        .then((res) => {
          let data = res.data;
          setPdf(data.url);
        });
    }
  }, [navigate]);

  const uploadFile = () => {
    // check file
    if (file.size <= 5242880 && file.type === "application/pdf") {
      // Create an object of formData to upload it to the api
      const formData = new FormData();

      // Update the formData object
      formData.append("curriculum", file, file.name);

      axios
        .post(
          `https://candidates-exam.herokuapp.com/api/v1/usuarios/${url}/cargar_cv`,
          formData,
          {
            headers: {
              "Content-Type": "application/pdf",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          setTimeout(() => window.location.reload(), 2000);
        })
        .catch((err) => {
          console.error(err);
        });

      // set mesage to show to the user
      setMessage("Archivo Subido Exitosamente");
      setError();
    } else {
      // file doesn't meet requirements
      if (file.size > 5242880) setError("El archivo pesa mas de 5MB");
      if (file.type !== "application/pdf")
        setError("El archivo debe de ser pdf");
      setMessage();
    }
  };

  return (
    <>
      <div className="row justify-content-center mb-2">
        <div
          className={`card border-${state ? "success" : "danger"}`}
          style={{ width: "30rem" }}
        >
          <div className="card-header bg-transparent">
            <h4>Informacion de usuario</h4>
          </div>
          <div className="card-body">
            <h5 className="card-title">Nombre: {name}</h5>
            <h6 className="card-subtitle my-2">Email: {email}</h6>
          </div>
        </div>
      </div>

      <div className="row justify-content-center mb-2">
        <div className="card" style={{ width: "30rem" }}>
          <div className="card-body">
            <div className="input-group">
              <input
                type="file"
                className="form-control"
                id="inputFile"
                aria-describedby="inputFileAddon"
                aria-label="Upload"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="inputFileAddon"
                onClick={uploadFile}
              >
                Subir PDF
              </button>
            </div>
          </div>
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

      <div className="row justify-content-center mb-2">
        <div className="card" style={{ width: "30rem", height: "40rem"}}>
          <div className="card-header bg-transparent">
            <h4>PDF</h4>
          </div>
          <div className="card-body">
            <div className="ratio ratio-16x9" style={{height: "100%"}}>
              <object data={pdf} type="application/pdf">
                <iframe
                  title="pdfViewer"
                  src={`https://docs.google.com/viewer?url=${pdf}&embedded=true`}
                  allowFullScreen
                  style={{ width: "100%", height: "100%"}}
                ></iframe>
              </object>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
