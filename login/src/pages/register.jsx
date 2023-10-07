import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../componentes/navbar";
import "../style/index.css";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Agrega estado para mensajes de error

  const handleRegister = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, password, email }),
    })
      .then((response) => {
        if (response.ok) {
          navigate("/login");
        } else {
          // Manejo de errores más específico y mensaje de error
          setErrorMessage("Error al registrar. Comprueba tus datos e intenta de nuevo.");
          console.error("Error:", response.status);
          console.log(JSON.stringify({ name, password, email }));
        }
      })
      .catch((error) => {
        // Manejo de errores más específico
        setErrorMessage("Error al registrar. Comprueba tu conexión a internet.");
        console.error("Error", error);
      });
  };

  return (
    <div className="container">
      <Navbar />
      <div className="main-content">
        <h1 className="text-center">Llena el formulario y estarás registrado</h1>

        {/* Muestra el mensaje de error si existe */}
        {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Nombre
            </label>
            <input
              value={name}
              type="text"
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputName"
              aria-describedby="nameHelp"
              required
            />
            <div id="nameHelp" className="form-text">
              Nombre
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail2"
              aria-describedby="emailHelp"
              required
            />
            <div id="emailHelp" className="form-text">
              Ingresa tu correo electrónico
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Contraseña
            </label>
            <input
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword2"
              required
            />
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-warning">
              ¡Listo!
            </button>
          </div>
        </form>
        <p className="text-center mt-3">
          ¿Ya estás registrado? <Link to="/login">¡Inicia sesión aquí!</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
