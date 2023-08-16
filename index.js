const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/time', (req, res) => {
  timeDate = new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })

  res.send(`Today is ${timeDate}`)
})

app.listen(port, () => {
  console.log("You're listening on port 3000")
})
