const express = require('express')
const cors = require('cors')
const initRepoRouter = require('./routes/repositories')

function initApp(db) {
  const app = express()
  app.use(express.json())
  app.use(cors())

  app.use('/repositories', initRepoRouter(db))

  return app
}

module.exports = initApp
