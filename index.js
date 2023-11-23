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

//TODO: Should return an Open API spec for the API in JSON format

app.get('/', (req, res) => {
  res.json(apiSpecification)
  {
    console.log(Intl.supportedValuesOf('timeZone'))
  }
})

//TODO: two different routes for timezone (required) and another for time/continent/city (optional). Both should return the current time in the specified timezone /time/:timezone? and /time/:continent?/:city?
app.get('/time/:timezone', (req, res) => {
  const { timezone } = req.params
  let timeDate

  if (!validTimeZones.includes(timeZone)) {
    throw new InvalidTimezoneError()
  }

  if (timezone) {
    timeDate = new Date().toLocaleString('en-GB', {
      timeZone: timezone,
    })
  } else {
    timeDate = new Date().toUTCString()
  }
  res.json({ time: timeDate })
})

app.get('/time/:continent?/:city?', (req, res) => {
  const { continent, city } = req.params
  let timeDate

  if (!validTimeZones.includes(timeZone)) {
    throw new InvalidTimezoneError()
  }

  if (continent && city) {
    timeDate = new Date().toLocaleString('en-GB', {
      timeZone: `${continent}/${city}`,
    })
  } else {
    timeDate = new Date().toUTCString()
  }
  res.json({ time: timeDate })
})

// app.get('/time/:continent?/:city?/:timezone?', (req, res) => {
//   const { continent, city, timezone } = req.params
//   let timeDate

//   if (timezone) {
//     timeDate = new Date().toLocaleString('en-GB', {
//       timeZone: timezone,
//     })
//   } else if (continent && city) {
//     timeDate = new Date().toLocaleString('en-GB', {
//       timeZone: `${continent}/${city}`,
//     })
//   } else {
//     timeDate = new Date().toUTCString()
//   }
//   res.json({ time: timeDate })
// })

app.listen(port, () => {
  console.log(`Listening at port: ${port}`)
})
