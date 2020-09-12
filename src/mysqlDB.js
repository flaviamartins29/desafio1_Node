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

  return db
}

module.exports = initDb
