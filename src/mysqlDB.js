const mysql = require('mysql')

async function initDb() {
  const db = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: '',
  })

  db.connect()

  await db.query('SELECT 1 + 1 as OK')

  async function create(repository) {
    // await db.query('')
  }

  async function update(id, repository) {}

  async function remove(id) {}

  async function list(title) {}

  async function getById(id) {}

  return { getById, list, remove, update, create }
}

module.exports = initDb

/*
    select * from repositories

    select * from repositories where title like "%renato%"

    select * from repositories where id=3

    insert into repositories (title, url) values ("Repo do Renato", "www.repo.com")

    update repositories set title="Novo Repo" where id=1

    update repositories set likes=likes+1 where id=1
*/
