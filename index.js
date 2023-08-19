const express = require('express')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' })
})

app.get('/time', (req, res) => {
  timeDate = new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })

  res.json({ time: timeDate })
})

app.listen(port, () => {
  console.log(`Listening at port: ${port}`)
})
