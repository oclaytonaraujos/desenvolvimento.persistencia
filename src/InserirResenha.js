import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importando useNavigate para navegação
import './InserirResenha.css'; // Importando o CSS

const InserirResenha = () => {
  const [livro_id, setLivroId] = useState('');
  const [resenha, setResenha] = useState('');
  const [autor_resenha, setAutorResenha] = useState('');
  const [titulo_resenha, setTituloResenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const livroIdNum = parseInt(livro_id, 10);

  const navigate = useNavigate(); // Hook de navegação

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!livro_id || !resenha || !autor_resenha || !titulo_resenha) {
      setMensagem('Todos os campos são obrigatórios!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/resenhas', {
        livro_id: livroIdNum,
        resenha,
        autor_resenha,
        titulo_resenha,
      });

      if (response.status === 201) {
        setMensagem('Resenha inserida com sucesso!');
        setLivroId('');
        setResenha('');
        setAutorResenha('');
        setTituloResenha('');
      }
    } catch (error) {
      setMensagem('Erro ao inserir a resenha. Tente novamente.');
    }
  };

  return (
    <div className="inserir-resenha">
      <h1>Inserir Resenha</h1>
      {mensagem && <p className={mensagem.includes('erro') ? 'error' : ''}>{mensagem}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="livro_id">ID do Livro</label>
          <input
            type="number"
            id="livro_id"
            value={livro_id}
            onChange={(e) => setLivroId(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="titulo_resenha">Título da Resenha</label>
          <input
            type="text"
            id="titulo_resenha"
            value={titulo_resenha}
            onChange={(e) => setTituloResenha(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="resenha">Resenha</label>
          <textarea
            id="resenha"
            value={resenha}
            onChange={(e) => setResenha(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="autor_resenha">Autor da Resenha</label>
          <input
            type="text"
            id="autor_resenha"
            value={autor_resenha}
            onChange={(e) => setAutorResenha(e.target.value)}
            required
          />
        </div>

        <button type="submit">Enviar</button>

        {/* Botão para voltar ao dashboard */}
      <button className="back-to-dashboard" onClick={() => navigate('/dashboard')}>
        Voltar ao Dashboard
      </button>
      </form>
    </div>
  );
};

export default InserirResenha;
