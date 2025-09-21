import express from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/User'
import { WalletLog } from '../models/WalletLog'
import { io } from '../index'

const router = express.Router()

// Admin authentication middleware
const adminAuth = async (req: any, res: any, next: any) => {
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

    // In a real app, you would check if user has admin role
    // For now, we'll assume all active users are admins
    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({
      error: 'Invalid token'
    })
  }
}

// Get dashboard statistics
router.get('/stats', adminAuth, async (req, res): Promise<any> => {
  try {
    const totalUsers = await User.countDocuments()
    const activeUsers = await User.countDocuments({ status: 'active' })
    const todayRegistrations = await User.countDocuments({
      registrationDate: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0))
      }
    })

    // Calculate total revenue (mock data)
    const walletLogs = await WalletLog.find({ validationStatus: 'success' })
    const totalRevenue = walletLogs.reduce((sum, log) => sum + (log.balance * 42000), 0)

    // Calculate average mining
    const totalMined = await User.aggregate([
      { $group: { _id: null, totalMined: { $sum: '$totalMined' } } }
    ])
    const averageMining = totalMined[0]?.totalMined / totalUsers || 0

    // Get failed connections today
    const failedConnections = await WalletLog.countDocuments({
      validationStatus: 'failed',
      timestamp: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0))
      }
    })

    return res.json({
      totalUsers,
      activeUsers,
      totalRevenue,
      averageMining: Math.round(averageMining * 100) / 100,
      todayRegistrations,
      failedConnections
    })
  } catch (error) {
    console.error('Get stats error:', error)
    return res.status(500).json({
      error: 'Internal server error'
    })
  }
})

// Get all users with pagination
router.get('/users', adminAuth, async (req, res): Promise<any> => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const skip = (page - 1) * limit
    const search = req.query.search as string || ''
    const status = req.query.status as string || 'all'

    const query: any = {}

    if (search) {
      query.$or = [
        { email: { $regex: search, $options: 'i' } },
        { name: { $regex: search, $options: 'i' } },
        { walletAddress: { $regex: search, $options: 'i' } }
      ]
    }

    if (status !== 'all') {
      query.status = status
    }

    const users = await User.find(query)
      .sort({ registrationDate: -1 })
      .skip(skip)
      .limit(limit)

    const total = await User.countDocuments(query)

    return res.json({
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Get users error:', error)
    return res.status(500).json({
      error: 'Internal server error'
    })
  }
})

// Get user details
router.get('/users/:id', adminAuth, async (req, res): Promise<any> => {
  try {
    const user = await User.findById(req.params.id).select('-password')

    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      })
    }

    // Get user's wallet logs
    const walletLogs = await WalletLog.find({ userId: (user._id as any).toString() })
      .sort({ timestamp: -1 })
      .limit(10)

    return res.json({
      user,
      walletLogs
    })
  } catch (error) {
    console.error('Get user details error:', error)
    return res.status(500).json({
      error: 'Internal server error'
    })
  }
})

// Update user status
router.put('/users/:id/status', adminAuth, async (req, res): Promise<any> => {
  try {
    const { status } = req.body

    if (!['active', 'inactive', 'banned'].includes(status)) {
      return res.status(400).json({
        error: 'Invalid status'
      })
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )

    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      })
    }

    // Emit real-time update
    io.emit('user-status-updated', {
      userId: (user._id as any).toString(),
      status,
      timestamp: new Date()
    })

    return res.json({
      message: 'User status updated successfully',
      user
    })
  } catch (error) {
    console.error('Update user status error:', error)
    return res.status(500).json({
      error: 'Internal server error'
    })
  }
})

// Get wallet logs with filters
router.get('/wallet-logs', adminAuth, async (req, res): Promise<any> => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const skip = (page - 1) * limit
    const status = req.query.status as string || 'all'
    const method = req.query.method as string || 'all'

    const query: any = {}

    if (status !== 'all') {
      query.validationStatus = status
    }

    if (method !== 'all') {
      query.walletMethod = method
    }

    const logs = await WalletLog.find(query)
      .populate('userId', 'name email')
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit)

    const total = await WalletLog.countDocuments(query)

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
    console.error('Get wallet logs error:', error)
    return res.status(500).json({
      error: 'Internal server error'
    })
  }
})

// Export user data
router.get('/export/users', adminAuth, async (req, res): Promise<any> => {
  try {
    const users = await User.find().select('-password').lean()

    const csvHeader = [
      'ID',
      'Name',
      'Email',
      'Wallet Method',
      'Wallet Address',
      'Balance',
      'Status',
      'Mining Operations',
      'Total Mined',
      'Registration Date',
      'Last Active'
    ]

    const csvRows = users.map(user => [
      (user._id as any).toString(),
      user.name,
      user.email,
      user.walletMethod || '',
      user.walletAddress || '',
      user.balance,
      user.status,
      user.miningOperations,
      user.totalMined,
      user.registrationDate,
      user.lastActive
    ])

    const csvContent = [csvHeader, ...csvRows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n')

    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Content-Disposition', 'attachment; filename=users_export.csv')
    res.send(csvContent)
  } catch (error) {
    console.error('Export users error:', error)
    return res.status(500).json({
      error: 'Internal server error'
    })
  }
})

// Get real-time stats
router.get('/realtime-stats', adminAuth, async (req, res): Promise<any> => {
  try {
    const now = new Date()
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    const lastHour = new Date(now.getTime() - 60 * 60 * 1000)

    const stats = {
      usersLast24Hours: await User.countDocuments({
        registrationDate: { $gte: last24Hours }
      }),
      connectionsLastHour: await WalletLog.countDocuments({
        timestamp: { $gte: lastHour }
      }),
      failedConnectionsLastHour: await WalletLog.countDocuments({
        timestamp: { $gte: lastHour },
        validationStatus: 'failed'
      }),
      activeConnections: await User.countDocuments({
        lastActive: { $gte: new Date(now.getTime() - 5 * 60 * 1000) }
      })
    }

    res.json(stats)
  } catch (error) {
    console.error('Get real-time stats error:', error)
    return res.status(500).json({
      error: 'Internal server error'
    })
  }
})

export default router