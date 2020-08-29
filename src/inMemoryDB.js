const { v4: uuid } = require('uuid')

const { createRepositoryFromBody } = require('./models/repository')

const repositories = {}

async function create(repository) {
  const id = uuid()
  const newRepository = createRepositoryFromBody(id, repository)

  repositories[id] = newRepository

  return newRepository
}

async function update(id, repository) {
  const existingRepository = await getById(id)
  Object.assign(existingRepository, repository)
  repositories[id] = repository

  return existingRepository
}

async function remove(id) {
  delete repositories[id]
}

async function list(title) {
  return title
    ? Object.values(repositories).filter((repo) => repo.title.includes(title))
    : Object.values(repositories)
}

async function getById(id) {
  return repositories[id]
}

module.exports = { getById, list, remove, update, create }
