const express = require("express");
const {uuid} = require('uuidv4')
const cors = require("cors");

// const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];
app.get("/repositories", (request, response) => {
  // TODO
  // retorna todas os projetos
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;
  const repo = { id: uuid(), title, url, techs };
  
  repositories.push(repo);

  return response.json(repo);
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const { title, url, techs } = request.body;

    const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);
    
    if (repositorieIndex < 0){
        return response.status(400).json({error: 'Project not found'});
    }

    const repositorie = {
      id: uuid(),
      title,
      url,
      techs,
      likes: 0
    
    };
    repositories[repositorieIndex] = repositorie;
    return response.json(repositorie);
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;
  
  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id == id);
  
  if (repositorieIndex < 0){
      return response.status(400).json({error: 'Project not found'});
  }

  repositories.splice(repositorieIndex, 1);

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id = id);
  if( repositorieIndex < 0) {
     return response.status(400).json({error: 'Repository not found.'});
  }
// Adiciona um like a mais
  const repositorie = repositories[repoIndex];
  repositorie.like = like + 1;
  return response.json(repo);
});


module.exports = app;
