const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  const {title} = request.body;

  const results = title 
  ? repositories.filter(repo => repo.title.includes(title))
  : repositories;

  return response.status(200).json(results);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;
  const repository = { 
    id: uuid(), 
    title, url, techs, 
    likes: 0 
  };
  
  repositories.push(repository);

  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title,url,techs} = request.body;

  console.log(id);

  const repoIndex = repositories.findIndex(repository => repository.id === id);
  if( repoIndex < 0) {
    return response.status(400).json({error: 'Repo not found.'});
  }
  
  const repository = {
    id,
    title,
    url,
    techs,
    likes:0
  };
  repositories[repoIndex] = repository;
  return response.status(200).json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const repoIndex = repositories.findIndex(repository => repository.id === id);
  if( repoIndex < 0) {
     return response.status(400).json({error: 'Repo not found.'});
  }

  repositories.splice(repoIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;

  const repoIndex = repositories.findIndex(repository => repository.id === id);
  
  if( repoIndex < 0) {
     return response.status(400).json({error: 'Repo not found.'});
  }
  const repository = repositories[repoIndex];
  repositories[repoIndex].likes += 1;
  return response.status(201).json(repository);
});

module.exports = app;