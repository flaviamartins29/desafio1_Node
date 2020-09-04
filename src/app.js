const express = require('express')
const cors = require('cors')
const db = require('./inMemoryDB')
const initRepoRouter = require('./routes/repositories')

const app = express()
app.use(express.json())
app.use(cors())

app.use('/repositories', initRepoRouter(db))

module.exports = app
