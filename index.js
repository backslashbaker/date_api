import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

//TODO: Should return an Open API spec for the API in JSON format
app.get('/', (req, res) => {
  res.json({ message: 'Hello World' })
})

app.get('/time/:continent?/:city?/:timezone?', (req, res) => {
  const { continent, city, timezone } = req.params
  let timeDate

  if (timezone) {
    timeDate = new Date().toLocaleString('en-GB', {
      timeZone: timezone,
    })
  } else if (continent && city) {
    timeDate = new Date().toLocaleString('en-GB', {
      timeZone: `${continent}/${city}`,
    })
  } else {
    timeDate = new Date().toUTCString()
  }
  res.json({ time: timeDate })
})

app.listen(port, () => {
  console.log(`Listening at port: ${port}`)
})
