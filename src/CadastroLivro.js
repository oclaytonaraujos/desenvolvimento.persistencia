import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importação do useNavigate
import axios from 'axios';
import "./CadastroLivro.css";

const CadastroLivro = () => {
  // Estado para armazenar os dados do livro
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');
  const [anoPublicacao, setAnoPublicacao] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate(); // Declaração do hook navigate

  // Função para enviar os dados do livro
  const handleSubmit = async (event) => {
    event.preventDefault();

    const livroData = {
      titulo,
      autor,
      genero,
      ano_publicacao: anoPublicacao,
    };

    try {
      const response = await axios.post('http://localhost:3001/api/livros', livroData);
      console.log(response.data);
      setMessage('Livro cadastrado com sucesso!');
      setTitulo('');
      setAutor('');
      setGenero('');
      setAnoPublicacao('');
    } catch (error) {
      setMessage('Erro ao cadastrar livro!');
      console.error('Erro:', error);
    }
  };

  return (
    <div className="cadastro-livro">
      <h1>Cadastro de Livro</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input 
            type="text" 
            value={titulo} 
            onChange={(e) => setTitulo(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Autor:</label>
          <input 
            type="text" 
            value={autor} 
            onChange={(e) => setAutor(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Gênero:</label>
          <input 
            type="text" 
            value={genero} 
            onChange={(e) => setGenero(e.target.value)} 
          />
        </div>
        <div>
          <label>Ano de Publicação:</label>
          <input 
            type="number" 
            value={anoPublicacao} 
            onChange={(e) => setAnoPublicacao(e.target.value)} 
            required 
          />
        </div>
        <div className="button-container">
          <button type="submit">Cadastrar Livro</button>
          <button
            type="button"
            onClick={() => navigate('/dashboard')} // Redireciona para o dashboard
          >
            Voltar ao Dashboard
          </button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CadastroLivro;
