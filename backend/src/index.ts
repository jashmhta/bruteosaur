import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { createServer } from 'http'
import { Server } from 'socket.io'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import winston from 'winston'

import authRoutes from './routes/auth'
import walletRoutes from './routes/wallet'
import adminRoutes from './routes/admin'

dotenv.config()

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})

const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bruteosaur'

// Logger setup
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'bruteosaur-api' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
})

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
})

// Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(limiter)

// Request logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path} - ${req.ip}`)
  next()
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/wallet', walletRoutes)
app.use('/api/admin', adminRoutes)

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

// Socket.io for real-time updates
io.on('connection', (socket) => {
  logger.info(`Client connected: ${socket.id}`)

  socket.on('join-room', (room) => {
    socket.join(room)
    logger.info(`Client ${socket.id} joined room: ${room}`)
  })

  socket.on('disconnect', () => {
    logger.info(`Client disconnected: ${socket.id}`)
  })
})

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(err.stack)
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Connect to MongoDB and start server
mongoose.connect(MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB')
    server.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    logger.error('MongoDB connection error:', error)
    process.exit(1)
  })

export { io }