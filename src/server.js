const initApp = require('./app')
const initDb = require('./inMemoryDB')

async function start() {
  const db = await initDb()
  const app = initApp(db)

  app.listen(3333)
}

start()
