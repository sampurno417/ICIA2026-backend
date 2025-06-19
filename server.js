import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import registrationRoutes from './routes/registration.js'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/registration', registrationRoutes)

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connected")
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
  })
}).catch(err => console.error(err))
