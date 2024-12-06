import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const [showCadastroSubMenu, setShowCadastroSubMenu] = useState(false); // Estado para o submenu de cadastro
  const [showResenhasSubMenu, setShowResenhasSubMenu] = useState(false); // Estado para o submenu de anotações
  const [showConfirmLogout, setShowConfirmLogout] = useState(false); // Estado para mostrar a confirmação de logout
  const navigate = useNavigate(); // Hook para navegação

  const handleCadastroClick = () => {
    setShowCadastroSubMenu(!showCadastroSubMenu);
    setShowResenhasSubMenu(false);
  };

  const handleResenhasClick = () => {
    setShowResenhasSubMenu(!showResenhasSubMenu);
    setShowCadastroSubMenu(false);
  };

  const handleLivrosClick = () => {
    navigate("/cadastro-livro");
  };

  const handleConsultaLivrosClick = () => {
    navigate("/lista-livros"); // Redireciona para a página de lista de livros
  };
  

  const handleResenhaClick = () => {
    navigate("/inserir-resenha");
  };

  const handleResenhaListaClick = () => {
    navigate("/buscar-livro-resenha");
  };

  const handleLogout = () => {
    // Mostra a caixa de confirmação
    setShowConfirmLogout(true);
  };

  const confirmLogout = () => {
    // Lógica de logout após confirmação
    setShowConfirmLogout(false); // Fecha o modal
    alert("Você saiu com sucesso!");
    navigate("/"); // Redireciona para a página de login
  };

  const cancelLogout = () => {
    // Fecha a caixa de confirmação
    setShowConfirmLogout(false);
  };

  return (
    <div className="dashboard-page">
      {/* Botão de Logout */}
      <button className="logout-button" onClick={handleLogout}>
        <img src="/logout.png" alt="Logout" className="logout-icon" />
      </button>

      {/* Caixa de Confirmação de Logout */}
      {showConfirmLogout && (
        <div className="logout-confirmation">
          <div className="confirmation-box">
            <p>Deseja realmente sair do sistema?</p>
            <div className="confirmation-buttons">
              <button className="confirm-button" onClick={confirmLogout}>
                Sim
              </button>
              <button className="cancel-button" onClick={cancelLogout}>
                Não
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Menu Principal */}
      <div className="menu">
        <button className="menu-button" onClick={handleCadastroClick}>
           LIVROS
        </button>
        <button className="menu-button" onClick={handleResenhasClick}>
          ANOTAÇÕES LIVROS
        </button>
        
      </div>

      {/* Submenu de Cadastro */}
      {showCadastroSubMenu && (
        <div className="submenu">
          <button className="submenu-button" onClick={handleLivrosClick}>
            CADASTRAR LIVROS
          </button>
          <button className="submenu-button" onClick={handleConsultaLivrosClick}>
            CONSULTAR LIVROS
          </button>

        </div>
      )}

      {/* Submenu de ANOTAÇÕES */}
      {showResenhasSubMenu && (
        <div className="submenu">
          <button className="submenu-button" onClick={handleResenhaClick}>
            CADASTRAR RESENHAS
          </button>
          <button className="submenu-button" onClick={handleResenhaListaClick}>
            CONSULTAR RESENHAS
          </button>
        </div>
      )}

      {/* Conteúdo Principal */}
      <div className="main-content">
      </div>
    </div>
  );
}

export default Dashboard;
