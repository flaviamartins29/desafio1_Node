const express = require('express')
const cors = require('cors')
const db = require('./inMemoryDB')

const { repositoryNotFoundError, created, success, noContent } = require('./utils')

const { createRepositoryFromBody } = require('./models/repository')

// const { Router } = express
const app = express()
app.use(express.json())
app.use(cors())

app.param(':id', async (req, res, next, id) => {
  const repository = await db.getById(id)

  if (!repository) {
    return repositoryNotFoundError(res)
  }

  req.repository = repository
  next()
})

app.get('/repositories', async ({ body }, res) => {
  const results = await db.list(body.title)

  success(res, results)
})

app.post('/repositories', async ({ body }, res) => {
  const repository = await db.create(repository)

  created(res, repository)
})

app.put('/repositories/:id', async ({ body, params }, res) => {
  const { title, techs, url } = body
  const repository = await db.update(params.id, { title, techs, url })

  success(res, repository)
})

app.delete('/repositories/:id', async ({ params }, res) => {
  await db.remove(params.id)

  noContent(res)
})

app.post('/repositories/:id/likes', async ({ params, repository }, res) => {
  const updatedRepository = await db.update(params.id, {
    likes: (repository.likes += 1),
  })

  created(res, updatedRepository)
})

module.exports = app
