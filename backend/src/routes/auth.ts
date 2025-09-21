import express from 'express'
import jwt from 'jsonwebtoken'
import Joi from 'joi'
import { User } from '../models/User'
import { io } from '../index'

const router = express.Router()

// Validation schemas
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  name: Joi.string().min(2).required()
})

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
})

// Generate JWT token
const generateToken = (userId: string) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '7d' }
  )
}

// Register new user
router.post('/register', async (req, res): Promise<any> => {
  try {
    const { error } = registerSchema.validate(req.body)
    if (error) {
      return res.status(400).json({
        error: 'Validation error',
        details: error.details?.[0]?.message
      })
    }

    const { email, password, name } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(409).json({
        error: 'User already exists with this email'
      })
    }

    // Create new user
    const user = new User({
      email,
      password,
      name,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    })

    await user.save()

    // Generate token
    const token = generateToken((user._id as any).toString())

    // Emit real-time update
    io.emit('user-registered', {
      userId: (user._id as any).toString(),
      email: user.email,
      name: user.name,
      timestamp: new Date()
    })

    return res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: (user._id as any).toString(),
        email: user.email,
        name: user.name,
        status: user.status
      }
    })
  } catch (error) {
    console.error('Registration error:', error)
    return res.status(500).json({
      error: 'Internal server error'
    })
  }
})

// Login user
router.post('/login', async (req, res): Promise<any> => {
  try {
    const { error } = loginSchema.validate(req.body)
    if (error) {
      return res.status(400).json({
        error: 'Validation error',
        details: error.details?.[0]?.message
      })
    }

    const { email, password } = req.body

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({
        error: 'Invalid credentials'
      })
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Invalid credentials'
      })
    }

    // Check if user is banned
    if (user.status === 'banned') {
      return res.status(403).json({
        error: 'Account is banned'
      })
    }

    // Update last active
    user.lastActive = new Date()
    await user.save()

    // Generate token
    const token = generateToken((user._id as any).toString())

    // Emit real-time update
    io.emit('user-login', {
      userId: (user._id as any).toString(),
      email: user.email,
      timestamp: new Date()
    })

    return res.json({
      message: 'Login successful',
      token,
      user: {
        id: (user._id as any).toString(),
        email: user.email,
        name: user.name,
        status: user.status,
        walletMethod: user.walletMethod,
        walletAddress: user.walletAddress,
        balance: user.balance,
        miningOperations: user.miningOperations,
        totalMined: user.totalMined
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    return res.status(500).json({
      error: 'Internal server error'
    })
  }
})

// Get user profile
router.get('/profile', async (req, res): Promise<any> => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    if (!token) {
      return res.status(401).json({
        error: 'No token provided'
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any
    const user = await User.findById(decoded.userId).select('-password')

    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      })
    }

    return res.json({
      user
    })
  } catch (error) {
    console.error('Profile error:', error)
    return res.status(500).json({
      error: 'Internal server error'
    })
  }
})

export default router