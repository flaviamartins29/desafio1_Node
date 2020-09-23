const { Sequelize, Op } = require('sequelize')
const repository = require('./models/repository')
const tech = require('./models/tech')

const {
  DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_DIALECT,
} = process.env

async function initDb() {
  const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT,
  })

  await sequelize.authenticate()

  const Repository = repository.initModel(sequelize)
  const Tech = tech.initModel(sequelize)
  repository.associate({ Repository, Tech })

  async function getById(id) {
    return Repository.findOne({
      where: { id },
      include: 'techs',
    })
  }

  async function create(repository) {
    return Repository.create(repository)
  }

  async function update(id, repository) {
    const [rowsAffected] = await Repository.update(repository, {
      where: { id },
    })

    if (rowsAffected !== 1) {
      throw new Error(`Unable to update id: ${id}`)
    }

    return getById(id)
  }

  async function remove(id) {
    return Repository.destroy({
      where: { id },
    })
  }

  async function list(title) {
    const where = {}

    if (title) {
      where.title = { [Op.substring]: title }
    }

    return Repository.findAll({
      where,
      include: 'techs',
    })
  }

  return {
    getById,
    list,
    remove,
    update,
    create,
  }
}

module.exports = initDb
