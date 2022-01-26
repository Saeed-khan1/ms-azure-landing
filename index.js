const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/notify', (req, res) => {
    console.log("Request Token:", req.query.token)
    res.send('Sign up for your ziwo account!')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})