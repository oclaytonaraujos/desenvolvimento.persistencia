import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate
import './BuscarLivroResenha.css';

function BuscarLivroResenha() {
  const [livrotitulo, setLivrotitulo] = useState(""); // Título do livro a ser buscado
  const [livros, setLivros] = useState([]); // Livros encontrados pela busca
  const [resenhas, setResenhas] = useState([]); // Resenhas do livro selecionado
  const [livroSelecionado, setLivroSelecionado] = useState(null); // Livro selecionado
  
  const navigate = useNavigate(); // Hook para navegação

  // Função para buscar livros e resenhas
  const buscarLivros = async () => {
    try {
      const responseLivros = await axios.get('http://localhost:3001/api/livros'); // Buscar todos os livros
      setLivros(responseLivros.data); // Armazena todos os livros

      // Se houver algum título de livro no campo de busca, aplicamos o filtro
      if (livrotitulo) {
        const filteredLivros = responseLivros.data.filter(livro => livro.titulo.toLowerCase().includes(livrotitulo.toLowerCase()));
        setLivros(filteredLivros); // Filtra livros com base no título
      }

    } catch (error) {
      alert("Erro ao buscar livros. Tente novamente.");
    }
  };

  // Função para buscar resenhas do livro selecionado
  const buscarResenhas = async (livro_id) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/resenhas/${livro_id}`);
      setResenhas(response.data); // Armazena as resenhas do livro
      setLivroSelecionado(livro_id); // Armazena o livro selecionado
    } catch (error) {
      alert("Erro ao buscar resenhas. Tente novamente.");
    }
  };

  // Função para gerar um PDF para uma resenha específica
  const generatePDF = (resenha) => {
    if (!livroSelecionado || !resenha) {
      alert("Selecione uma resenha associada antes de gerar o PDF.");
      return;
    }

    const livro = livros.find((l) => l.id === livroSelecionado); // Encontra o livro selecionado
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(`Detalhes do Livro: ${livro.titulo}`, 10, 10);

    // Informações do livro
    doc.setFontSize(14);
    doc.text(`ID do Livro: ${livro.id}`, 10, 20);
    doc.text(`Autor: ${livro.autor}`, 10, 30);
    doc.text(`Gênero: ${livro.genero}`, 10, 40);
    doc.text(`Ano de Publicação: ${livro.ano_publicacao}`, 10, 50);

    // Resenha específica com formatação
    doc.setFontSize(12);
    doc.text(`Título da Resenha: ${resenha.titulo_resenha}`, 10, 60);
    doc.text(`Autor da Resenha: ${resenha.autor_resenha}`, 10, 70);
    
    // Aqui, para garantir a formatação adequada do texto da resenha
    const lines = doc.splitTextToSize(resenha.resenha, 180); // Ajuste a largura da linha para 180
    doc.text(lines, 10, 80);

    // Salvar o PDF com nome único
    doc.save(`resenha_${livro.id}_#${resenha._id}.pdf`);
  };

  // Carregar todos os livros e resenhas na montagem do componente
  useEffect(() => {
    buscarLivros(); // Carrega os livros ao inicializar
  }, []);

  return (
    <div>
      <h1>Buscar Livro e Resenhas</h1>

      <div>
        <label htmlFor="livrotitulo">Título do Livro:</label>
        <input
          type="text"
          id="livrotitulo"
          value={livrotitulo}
          onChange={(e) => setLivrotitulo(e.target.value)}
        />
        <button onClick={buscarLivros}>Buscar</button>
      </div>

      {livros.length > 0 && (
        <div>
          <h2>Livros Encontrados:</h2>
          <ul>
            {livros.map((livro) => (
              <li key={livro.id}>
                <button 
                  className="livro-button" 
                  onClick={() => buscarResenhas(livro.id)}
                >
                  {livro.titulo}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {livroSelecionado && resenhas.length > 0 && (
        <div>
          <h2>Resenhas do Livro:</h2>
          <ul>
            {resenhas.map((resenha, index) => (
              <li key={index}>
                <strong>Resenha #{index + 1}:</strong> {resenha.titulo_resenha}
                <br />
                <em>Autor: {resenha.autor_resenha}</em>
                <br />
                {/* Botão para gerar o PDF dessa resenha específica */}
                <button onClick={() => generatePDF(resenha)}>Gerar PDF</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Botão para voltar ao dashboard */}
      <div className="back-to-dashboard-container">
        <button onClick={() => navigate('/dashboard')}>Voltar ao Dashboard</button>
      </div>
    </div>
  );
}

export default BuscarLivroResenha;
