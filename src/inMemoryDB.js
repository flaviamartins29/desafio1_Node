const { v4: uuid } = require('uuid')

const { createRepositoryFromBody } = require('./models/repository')

const repositories = {}

async function initDb() {
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

  const filterByTitle = (repo) => repo.title.includes(title)

  async function list(title) {
    const reposAsArray = Object.values(repositories)
    return title ? reposAsArray.filter(filterByTitle) : reposAsArray
  }

  async function getById(id) {
    return repositories[id]
  }

  return { getById, list, remove, update, create }
}

module.exports = initDb
