'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  TrendingUp,
  DollarSign,
  Activity,
  Search,
  Filter,
  Download,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Eye,
  Mail,
  Shield,
  Database
} from 'lucide-react'

interface User {
  id: string
  email: string
  name: string
  registrationDate: string
  lastActive: string
  walletMethod: string
  walletAddress: string
  balance: number
  status: 'active' | 'inactive' | 'banned'
  miningOperations: number
  totalMined: number
}

interface DashboardStats {
  totalUsers: number
  activeUsers: number
  totalRevenue: number
  averageMining: number
  todayRegistrations: number
  failedConnections: number
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([])
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeUsers: 0,
    totalRevenue: 0,
    averageMining: 0,
    todayRegistrations: 0,
    failedConnections: 0
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(false)

  // Mock data - in real app, this would come from API
  useEffect(() => {
    const mockUsers: User[] = [
      {
        id: '1',
        email: 'alex.thompson@email.com',
        name: 'Alex Thompson',
        registrationDate: '2024-01-15',
        lastActive: '2024-01-20 14:30',
        walletMethod: 'MetaMask',
        walletAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f8e8E0',
        balance: 2.5,
        status: 'active',
        miningOperations: 15,
        totalMined: 0.25
      },
      {
        id: '2',
        email: 'sarah.chen@email.com',
        name: 'Sarah Chen',
        registrationDate: '2024-01-16',
        lastActive: '2024-01-20 13:45',
        walletMethod: 'Manual Input',
        walletAddress: '0x1234567890123456789012345678901234567890',
        balance: 1.8,
        status: 'active',
        miningOperations: 8,
        totalMined: 0.18
      },
      {
        id: '3',
        email: 'marcus.rodriguez@email.com',
        name: 'Marcus Rodriguez',
        registrationDate: '2024-01-14',
        lastActive: '2024-01-19 16:20',
        walletMethod: 'Trust Wallet',
        walletAddress: '0x0987654321098765432109876543210987654321',
        balance: 0.0,
        status: 'inactive',
        miningOperations: 3,
        totalMined: 0.0
      },
      {
        id: '4',
        email: 'emily.watson@email.com',
        name: 'Emily Watson',
        registrationDate: '2024-01-18',
        lastActive: '2024-01-20 15:10',
        walletMethod: 'Coinbase Wallet',
        walletAddress: '0x2468135792468135792468135792468135792468',
        balance: 5.2,
        status: 'active',
        miningOperations: 22,
        totalMined: 0.52
      },
      {
        id: '5',
        email: 'david.kim@email.com',
        name: 'David Kim',
        registrationDate: '2024-01-17',
        lastActive: '2024-01-20 12:00',
        walletMethod: 'Rainbow',
        walletAddress: '0x1357924681357924681357924681357924681357',
        balance: 3.1,
        status: 'active',
        miningOperations: 12,
        totalMined: 0.31
      }
    ]

    const mockStats: DashboardStats = {
      totalUsers: 15247,
      activeUsers: 8934,
      totalRevenue: 25840,
      averageMining: 0.23,
      todayRegistrations: 147,
      failedConnections: 23
    }

    setUsers(mockUsers)
    setStats(mockStats)
  }, [])

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.walletAddress.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleRefresh = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/10'
      case 'inactive': return 'text-yellow-400 bg-yellow-400/10'
      case 'banned': return 'text-red-400 bg-red-400/10'
      default: return 'text-gray-400 bg-gray-400/10'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />
      case 'inactive': return <Clock className="w-4 h-4" />
      case 'banned': return <AlertTriangle className="w-4 h-4" />
      default: return null
    }
  }

  const exportData = () => {
    const csvContent = [
      ['Name', 'Email', 'Wallet Method', 'Balance', 'Status', 'Mining Operations', 'Total Mined'],
      ...filteredUsers.map(user => [
        user.name,
        user.email,
        user.walletMethod,
        user.balance.toString(),
        user.status,
        user.miningOperations.toString(),
        user.totalMined.toString()
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'admin_users_export.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-gray-400 mt-1">Monitor user interactions and mining operations</p>
            </div>
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRefresh}
                disabled={isLoading}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-gray-300 rounded-lg hover:bg-gray-800 disabled:opacity-50"
              >
                <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
                <span>{isLoading ? 'Refreshing...' : 'Refresh'}</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={exportData}
                className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-black rounded-lg hover:bg-orange-600"
              >
                <Download className="w-5 h-5" />
                <span>Export</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <div className="p-6 bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-400 text-sm font-medium">Total Users</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.totalUsers.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-orange-400" />
            </div>
          </div>

          <div className="p-6 bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-400 text-sm font-medium">Active Users</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.activeUsers.toLocaleString()}</p>
              </div>
              <Activity className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-400 text-sm font-medium">Total Revenue</p>
                <p className="text-2xl font-bold text-white mt-1">${stats.totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-400" />
            </div>
          </div>

          <div className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-400 text-sm font-medium">Avg Mining</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.averageMining} BTC</p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-400" />
            </div>
          </div>

          <div className="p-6 bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border border-yellow-500/20 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-400 text-sm font-medium">Today&apos;s Signups</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.todayRegistrations}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-yellow-400" />
            </div>
          </div>

          <div className="p-6 bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/20 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-400 text-sm font-medium">Failed Connections</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.failedConnections}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search users by email, name, or wallet address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="banned">Banned</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800 border-b border-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Wallet Method
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Balance
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Mining Ops
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Total Mined
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredUsers.map((user) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mr-3">
                          <span className="text-black font-bold text-sm">
                            {user.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="text-white font-medium">{user.name}</div>
                          <div className="text-gray-400 text-sm">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {user.walletMethod === 'MetaMask' && (
                          <div className="w-6 h-6 bg-orange-500 rounded" />
                        )}
                        <span className="text-gray-300">{user.walletMethod}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-white font-medium">{user.balance} BTC</div>
                      <div className="text-gray-400 text-sm">
                        ${(user.balance * 42000).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {getStatusIcon(user.status)}
                        <span className="capitalize">{user.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                      {user.miningOperations}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-white font-medium">{user.totalMined} BTC</div>
                      <div className="text-gray-400 text-sm">
                        ${(user.totalMined * 42000).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700"
                        >
                          <Eye className="w-4 h-4 text-gray-400" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700"
                        >
                          <Mail className="w-4 h-4 text-gray-400" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Real-time Status */}
        <div className="mt-8 p-6 bg-green-500/10 border border-green-500/20 rounded-xl">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-sm font-medium">Real-time Monitoring Active</span>
          </div>
          <p className="text-gray-400 text-sm">
            All systems operational. Last updated: {new Date().toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard