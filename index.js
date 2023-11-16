import express from 'express'
import dotenv from 'dotenv'
import yaml from 'yamljs'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000
const apiSpecification = yaml.load('./date-api.yml')
const yamlString = yaml.stringify(apiSpecification, null, 2)

//TODO: Should return an Open API spec for the API in JSON format
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>OpenAPI Documentation</title>
    </head>
    <body>
      <pre>${yamlString}</pre>
    </body>
    </html>
  `)
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
