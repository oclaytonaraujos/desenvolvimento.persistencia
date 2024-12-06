import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import './ListaLivros.css';

const ListaLivros = () => {
  const [livros, setLivros] = useState([]); // Estado para armazenar todos os livros
  const [filteredLivros, setFilteredLivros] = useState([]); // Estado para armazenar livros filtrados
  const [searchTerm, setSearchTerm] = useState(''); // Estado para armazenar o valor da pesquisa
  const [loading, setLoading] = useState(true); // Estado para controle de loading
  const [error, setError] = useState(null); // Estado para controlar erros

  const navigate = useNavigate(); // Hook para navegação programática

  // Função para buscar os livros na API
  const fetchLivros = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/livros');
      setLivros(response.data); // Armazena todos os livros no estado
      setFilteredLivros(response.data); // Inicializa os livros filtrados com todos os livros
      setLoading(false); // Atualiza o loading para false
    } catch (error) {
      setError('Erro ao carregar os livros.');
      setLoading(false);
    }
  };

  // Função para filtrar os livros com base no texto da pesquisa
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase(); // Converte o termo para minúsculas
    setSearchTerm(value);

    // Filtra os livros conforme o valor da pesquisa
    const filtered = livros.filter((livro) => {
      return (
        livro.titulo.toLowerCase().includes(value) ||
        livro.autor.toLowerCase().includes(value) ||
        livro.genero?.toLowerCase().includes(value) ||
        livro.id.toString().includes(value)
      );
    });
    
    setFilteredLivros(filtered); // Atualiza a lista filtrada
  };

  // Função para excluir um livro
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/livros/${id}`);
      // Remove o livro da lista após exclusão
      setLivros(livros.filter((livro) => livro.id !== id));
      setFilteredLivros(filteredLivros.filter((livro) => livro.id !== id));
      alert('Livro excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir livro:', error);
      alert('Erro ao excluir livro');
    }
  };

  // Função para editar um livro (simples redirecionamento para a página de edição)
  const handleEdit = (id) => {
    navigate(`/edit-livro/${id}`); // Redireciona para a página de edição, passando o id do livro
  };

  // Faz a requisição quando o componente for montado
  useEffect(() => {
    fetchLivros();
  }, []);

  if (loading) {
    return <p>Carregando livros...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="lista-livros-container">
    <h1>Lista de Livros</h1>
  
    {/* Barra de pesquisa */}
    <div>
      <input
        className="search-input"
        type="text"
        placeholder="Pesquisar por título, autor, gênero ou id"
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  
    {/* Tabela de livros */}
    <table className="livros-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Título</th>
          <th>Autor</th>
          <th>Gênero</th>
          <th>Ano de Publicação</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {filteredLivros.length > 0 ? (
          filteredLivros.map((livro) => (
            <tr key={livro.id}>
              <td>{livro.id}</td>
              <td>{livro.titulo}</td>
              <td>{livro.autor}</td>
              <td>{livro.genero}</td>
              <td>{livro.ano_publicacao}</td>
              <td>
                <button 
                  className="action-button edit-button"
                  onClick={() => handleEdit(livro.id)}
                >
                  Editar
                </button>
                <button 
                  className="action-button delete-button"
                  onClick={() => handleDelete(livro.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6">Nenhum livro encontrado.</td>
          </tr>
        )}
      </tbody>
    </table>
  
    {/* Botão de retorno ao Dashboard */}
    <div style={{ marginTop: '20px' }}>
      <button className="back-button" onClick={() => navigate('/dashboard')}>
        Voltar ao Dashboard
      </button>
    </div>
  </div>  
  );
};

export default ListaLivros;
