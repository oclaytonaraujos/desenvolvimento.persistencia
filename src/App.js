import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import CadastroLivro from "./CadastroLivro";
import ListaLivros from "./ListaLivros";
import EditLivro from "./EditLivro";
import InserirResenha from "./InserirResenha";
import BuscarLivroResenha from "./BuscarLivroResenha";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="cadastro-livro" element={<CadastroLivro />} />
        <Route path="lista-livros" element={<ListaLivros/>} />
        <Route path="/edit-livro/:id" element={<EditLivro />} />
        <Route path="/inserir-resenha" element={<InserirResenha />} />
        <Route path="/buscar-livro-resenha" element={<BuscarLivroResenha />} />
      </Routes>
    </Router>
  );
}

export default App;
