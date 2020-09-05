const initApp = require('./app')
const db = require('./inMemoryDB')

const app = initApp(db)
app.listen(3333)
