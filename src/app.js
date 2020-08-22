const express = require("express")
const cors = require("cors")
const { v4: uuid } = require('uuid')

const {
  repositoryNotFoundError,
  created,
  success,
  noContent
} = require('./utils')

const { 
  createRepositoryFromBody
} = require('./models/repository')

// const { Router } = express
const app = express()
app.use(express.json())
app.use(cors())

const repositories = {}

const ensureRepositoryExists = ({ params }, res, next) => {
  const {id} = params
  const repo = repositories[id]

  if(!repo) {
    return repositoryNotFoundError(res)
  }

  next()
}

app.get("/repositories", (request, response) => {
  const {title} = request.body

  const results = title 
    ? Object.values(repositories).filter(repo => repo.title.includes(title))
    : Object.values(repositories)

  return response.status(200).json(results)
})

app.post("/repositories", ({ body }, response) => {
  const id = uuid()
  const repository = createRepositoryFromBody(id, body)
  
  repositories[id] = repository

  created(response, repository)
})

app.put("/repositories/:id", ensureRepositoryExists, ({ body, params }, res) => {
  const {id} = params
  const repository = createRepositoryFromBody(id, body)

  repositories[id] = repository
  success(res, repository)
})

app.delete("/repositories/:id", ensureRepositoryExists, ({ params }, res) => {
  const {id} = params

  delete repositories[id]

  noContent(res)
})

app.post("/repositories/:id/likes", ensureRepositoryExists, ({ params }, response) => {
  const {id} = params
  const repository = repositories[id]

  repository.likes += 1

  created(response, repository)
})

module.exports = app