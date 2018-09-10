import express from 'express'
import mongoose from 'mongoose'
import keys from './config/keys'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import { employeeController, companyController } from './controllers'

const app = express()

// mongoose config
if (process.env.NODE_ENV !== 'test') {
  mongoose.Promise = global.Promise
  mongoose.connect(
    keys.mongoURI,
    {
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000,
      useNewUrlParser: true,
    }
  )
}

app.use(bodyParser.json())
app.use(helmet())
app.use(mongoSanitize())

// routes
app.use('/api', employeeController, companyController)

export default app
