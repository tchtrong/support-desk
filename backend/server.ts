import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import connectDB from './config/db'
import { userAuth } from './middleware/authMiddleware'
import errorHandler from './middleware/errorMiddleware'
import { jwtBearer } from './middleware/jwtMiddleware'
import ticketRouter from './routes/ticketRoutes'
import userRouter from './routes/userRoutes'

dotenv.config()

const PORT = process.env.PORT ?? 5000

void connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/users/me', jwtBearer, userAuth)
app.use('/api/tickets', jwtBearer, userAuth)

// Routes
app.use('/api/users', userRouter)
app.use('/api/tickets', ticketRouter)

// Serve Frontend
if (process.env.NODE_ENV === 'production') {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  // FIX: below code fixes app crashing on refresh in deployment
  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
  })
} else {
  app.get('/', (_, res) => {
    res.status(200).json({ message: 'Welcome to the Support Desk API' })
  })
}

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
