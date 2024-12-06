import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (isRegistering) {
        // Registro de usuário
        const response = await axios.post("http://localhost:3001/api/login/register", { username, password });
        if (response.status === 201) {
          alert("Usuário registrado com sucesso! Você pode fazer login agora.");
          setIsRegistering(false); // Voltar ao formulário de login
          setUsername(""); // Limpar os campos
          setPassword("");
        }
      } else {
        // Login de usuário
        const response = await axios.post("http://localhost:3001/api/login", { username, password });
        if (response.status === 200) {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.error("Erro:", error.response?.data); // Log do erro
      alert(error.response?.data || "Erro ao processar a solicitação.");
    }
  };

  return (
    <div className="login-page">
      <div className="background-card">
        <div className="login-card">

          <h2>{isRegistering ? "Registrar-se" : "Seja bem-vindo(a)."}</h2>

          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Usuário:</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Digite seu usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="button-group">
              <button type="submit" className="btn btn-enter">
                {isRegistering ? "Registrar" : "Entrar"}
              </button>
              <button
                type="button"
                className="btn btn-cancel"
                onClick={() => {
                  setIsRegistering(false);
                  setUsername("");
                  setPassword("");
                }}
              >
                Cancelar
              </button>
            </div>
          </form>

          <button
            className="btn btn-register"
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? "Voltar ao Login" : "Registre-se"}
          </button>

          <div className="version">24.08.01</div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
