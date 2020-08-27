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

app.param(':id', (req, res, next, id) => {
  const repository = repositories[id]

  if(!repository) {
    return repositoryNotFoundError(res)
  }

  req.repository = repository
  next()
})

app.get("/repositories", ({ body }, res) => {
  const {title} = body

  const results = title 
    ? Object.values(repositories).filter(repo => repo.title.includes(title))
    : Object.values(repositories)

  return res.status(200).json(results)
})

app.post("/repositories", ({ body }, res) => {
  const id = uuid()
  const repository = createRepositoryFromBody(id, body)
  
  repositories[id] = repository

  created(res, repository)
})

app.put("/repositories/:id", ({ body, params }, res) => {
  const {id} = params
  const repository = createRepositoryFromBody(id, body)

  repositories[id] = repository
  success(res, repository)
})

app.delete("/repositories/:id", ({ params }, res) => {
  const {id} = params

  delete repositories[id]

  noContent(res)
})

app.post("/repositories/:id/likes", ({ repository }, res) => {
  repository.likes += 1

  created(res, repository)
})

module.exports = app