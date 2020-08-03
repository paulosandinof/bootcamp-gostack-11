import React, { useState, useEffect } from 'react';

import api from './services/api';

import './App.css';

import Header from './components/Header';

function App() {
  const [projects, setProjects] = useState([]);

  // useState retorna um array com 2 posições
  //
  // 1. Variável com o seu valor inicial
  // 2. Função para atualizarmos esse valor

  useEffect(() => {
    async function fetchData() {
      const { data } = await api.get('/projects');
      setProjects(data);
    }
    fetchData();
  }, []);

  async function handleAddProject() {
    const { data } = await api.post('/projects', {
      title: `Novo Projeto ${Date.now()}`,
      owner: "Paulo Sandino",
    });
  
    setProjects([...projects, data]);
  };

  return (
  <>
    <Header title="projects" />

    <ul>
      {projects.map(project => <li key={project.id}>{project.title}</li>)}
    </ul>

    <button type="button" onClick={handleAddProject}> Adicionar projeto</button>
  </>
  );
}

export default App;