import express from 'express'
const app = express()

import dotenv from 'dotenv'
dotenv.config()
import morgan from 'morgan'
import cors from "cors"
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

import connectDB from './db/connect.js'
// routers
import imgRouter from './router/imgRouter.js'
// middleware
import notFoundMiddleware from './middleware/not-found.js'

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(express.static(path.resolve(__dirname, './images')))

app.use(express.json())

app.use('/api/v1', imgRouter)

app.use(notFoundMiddleware)
app.use(cors());
const port = process.env.PORT || 4000
const start = async () => {
  try {
    await connectDB("mongodb+srv://aitshu844:zzF0iQfGI9t9s46R@cluster0.dev9ccl.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log("Mongodb Connected..."))
    app.listen(port, () => {
      console.log(`server is listeing on port ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
