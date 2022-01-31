const express = require('express')
const routes = require('./routes')
const app = express()
const port = process.env.PORT || 3000
require('dotenv').config()


routes(app)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})