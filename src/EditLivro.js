import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; // Importando useNavigate e useParams
import './EditLivro.css';


const EditLivro = () => {
  const [livro, setLivro] = useState({
    titulo: '',
    autor: '',
    genero: '',
    ano_publicacao: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Hook para navegação programática
  const { id } = useParams(); // Obtém o ID do livro da URL

  // Função para buscar os dados do livro
  const fetchLivro = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/livros/${id}`);
      setLivro(response.data); // Preenche o estado com os dados do livro
      setLoading(false);
    } catch (error) {
      setError('Erro ao carregar os dados do livro.');
      setLoading(false);
    }
  };

  // Função para lidar com a alteração dos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLivro((prevLivro) => ({
      ...prevLivro,
      [name]: value,
    }));
  };

  // Função para enviar os dados do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/livros/${id}`, livro);
      alert('Livro atualizado com sucesso!');
      navigate('/lista-livros'); // Redireciona para a lista de livros após salvar
    } catch (error) {
      setError('Erro ao atualizar o livro.');
    }
  };

  // Carrega os dados do livro quando o componente é montado
  useEffect(() => {
    fetchLivro();
  }, [id]);

  if (loading) {
    return <p>Carregando dados do livro...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="edit-livro-container">
      <h1>Editar Livro</h1>
      <form onSubmit={handleSubmit} className="edit-livro-form">
        <div className="edit-livro-form-group">
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={livro.titulo}
            onChange={handleChange}
            required
            className="edit-livro-input"
          />
        </div>

        <div className="edit-livro-form-group">
          <label htmlFor="autor">Autor:</label>
          <input
            type="text"
            id="autor"
            name="autor"
            value={livro.autor}
            onChange={handleChange}
            required
            className="edit-livro-input"
          />
        </div>

        <div className="edit-livro-form-group">
          <label htmlFor="genero">Gênero:</label>
          <input
            type="text"
            id="genero"
            name="genero"
            value={livro.genero}
            onChange={handleChange}
            className="edit-livro-input"
          />
        </div>

        <div className="edit-livro-form-group">
          <label htmlFor="ano_publicacao">Ano de Publicação:</label>
          <input
            type="number"
            id="ano_publicacao"
            name="ano_publicacao"
            value={livro.ano_publicacao}
            onChange={handleChange}
            required
            className="edit-livro-input"
          />
        </div>

        <div className="edit-livro-buttons">
          <button type="submit" className="edit-livro-submit-button">Salvar alterações</button>
          <button
  className="edit-livro-back-button"
  onClick={(e) => {
    e.preventDefault(); // Impede o envio do formulário
    navigate('/lista-livros'); // Navega para a lista de livros
  }}>
  Voltar à lista de livros
          </button>

        </div>
      </form>
    </div>
  );
};

export default EditLivro;
