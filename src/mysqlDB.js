const mysql = require('mysql2')
const assert = require('assert')

async function initDb() {
  const db = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: '',
  })

  db.connect()

  const [[dbCheck]] = await db.promise().query('SELECT 1 as dbCheck')
  assert(dbCheck, 'Database failed to connect')

  async function getById(id) {
    const sql = 'select * from repositories where id=?'
    const [results] = await db.promise().query(sql, [id])

    return results
  }

  async function create(repository) {
    const sql = 'insert into repositories (title, url) values (?, ?)'
    const [{ insertId }] = await db.promise().query(sql, [repository.title, repository.url])

    return getById(insertId)
  }

  async function update(id, repository) {
    const sql = 'update repositories set title=?, url=? where id=?'
    await db.promise().query(sql, [repository.title, repository.url, id])

    return getById(id)
  }

  async function remove(id) {
    const sql = 'delete from repositories where id=?'
    await db.promise().query(sql, [id])
  }

  async function list(title) {
    let sql = 'select * from repositories'
    const params = []

    if (title) {
      sql += ' where title like ?'
      params.push(`%${title}%`)
    }

    const [results] = await db.promise().query(sql, params)
    return results
  }

  return { getById, list, remove, update, create }
}

module.exports = initDb
