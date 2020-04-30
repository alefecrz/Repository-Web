import React, { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api';

function App() {
  const [projects,setProjects] = useState([]);
  
  useEffect(()=> {
    api.get('/repositories').then(response => {
      setProjects(response.data);
    })
  }, []);

  async function handleAddRepository(e) {
    e.preventDefault();

    api.post('/repositories',{
      "title": `New Project ${Date.now()}`,
      "url": 'http://github.com',
      "techs": ['arrayTechs'],
    }).then(response => {
      setProjects([...projects, response.data])
    });
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`).then(response =>{
      var repos = [...projects];
      var index = repos.findIndex((repo) => repo.id === id);
      if (index !== -1) {
        repos.splice(index, 1);
        setProjects(repos);
      }
    }, []);
  }

  return (
    <>
      <button onClick={handleAddRepository}>Adicionar</button>
      <ul data-testid="repository-list">
        { projects.map( project => (
          <li key={project.id}>
            {project.title}
            <button onClick={() => handleRemoveRepository(project.id)}>
              Remover
            </button>
          </li>)
          )
        }
      </ul>
      
    </>
  );
}

export default App;
