const express = require('express')
const cors = require('cors')
const repoRouter = require('./routes/repositories')

const app = express()
app.use(express.json())
app.use(cors())

app.use('/repositories', repoRouter)

module.exports = app
