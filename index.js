import express from 'express'
import dotenv from 'dotenv'
import { parse } from 'yaml'
import { readFileSync } from 'fs'
import { resolve } from 'path'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000
const apiSpecification = parse(
  readFileSync(resolve('date-api.yml')).toString('utf-8')
)
const validTimeZones = Intl.supportedValuesOf('timeZone')
const lowerCaseTimeZones = validTimeZones.map((timezone) =>
  timezone.toLowerCase()
)

//TODO: Should return an Open API spec for the API in JSON format

app.get('/', (req, res) => {
  res.json(apiSpecification)
})

//TODO: two different routes for timezone (required) and another for time/continent/city (optional). Both should return the current time in the specified timezone /time/:timezone? and /time/:continent?/:city?
app.get('/time/:timezone?', (req, res) => {
  const { timezone } = req.params

  if (timezone && !validTimeZones.includes(timeZone)) {
    return res.status(404).json({ error: 'Timezone was not found' })
  }

  const time = new Date().toLocaleString('en-GB', {
    timeZone: timezone ?? 'UTC',
  })

  res.json({ time })
})

app.get('/time/:continent/:city', (req, res) => {
  const { continent, city } = req.params

  if (!validTimeZones.includes(`${continent}/${city}`)) {
    return res.status(404).json({ error: 'Continent and City was not found' })
  }

  const time = new Date().toLocaleString('en-GB', {
    timeZone: `${continent}/${city}`,
  })

  res.json({ time })
  // let timeDate

  // if (!validTimeZones.includes(`${continent}/${city}`)) {
  //   return res.status(404).json({ error: 'Continent and City was not found' })
  // }

  // if (continent && city) {
  //   timeDate = new Date().toLocaleString('en-GB', {
  //     timeZone: `${continent}/${city}`,
  //   })
  // } else {
  //   timeDate = new Date().toUTCString()
  // }
  // res.json({ time: timeDate })
})

app.listen(port, () => {
  console.log(`Listening at port: ${port}`)
})
