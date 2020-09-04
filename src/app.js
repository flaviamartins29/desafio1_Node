const express = require('express')
const cors = require('cors')
const db = require('./inMemoryDB')

const { repositoryNotFoundError, created, success, noContent } = require('./utils')

const { Router } = express

const app = express()
app.use(express.json())
app.use(cors())

const repoRouter = new Router()

repoRouter.param(':id', async (req, res, next, id) => {
  const repository = await db.getById(id)

  if (!repository) {
    return repositoryNotFoundError(res)
  }

  req.repository = repository
  next()
})

repoRouter.get('/', async ({ body }, res) => {
  const results = await db.list(body.title)

  success(res, results)
})

repoRouter.post('/', async ({ body }, res) => {
  const repository = await db.create(body)

  created(res, repository)
})

repoRouter.put('/:id', async ({ body, params }, res) => {
  const { title, techs, url } = body
  const repository = await db.update(params.id, { title, techs, url })

  success(res, repository)
})

repoRouter.delete('/:id', async ({ params }, res) => {
  await db.remove(params.id)

  noContent(res)
})

repoRouter.post('/:id/likes', async ({ params, repository }, res) => {
  const updatedRepository = await db.update(params.id, {
    likes: (repository.likes += 1),
  })

  created(res, updatedRepository)
})

app.use('/repositories', repoRouter)

module.exports = app
