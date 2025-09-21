// Mock blockchain validation service
// In a real application, this would connect to actual blockchain nodes

interface WalletBalance {
  address: string
  balance: number
  isValid: boolean
}

// Mock wallet balances for demonstration
const mockWalletBalances: { [key: string]: number } = {
  '0x742d35Cc6634C0532925a3b844Bc9e7595f8e8E0': 2.5,
  '0x1234567890123456789012345678901234567890': 1.8,
  '0x0987654321098765432109876543210987654321': 0.0,
  '0x2468135792468135792468135792468135792468': 5.2,
  '0x1357924681357924681357924681357924681357': 3.1
}

// Mock validation function
export const validateWalletBalance = async (address: string): Promise<number> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Check if address is valid Ethereum address
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    throw new Error('Invalid Ethereum address')
  }

  // Return mock balance or generate random balance for new addresses
  if (mockWalletBalances[address]) {
    return mockWalletBalances[address]
  }

  // Generate random balance for new addresses (10% chance of having balance)
  if (Math.random() < 0.1) {
    const balance = Math.random() * 10 // Random balance up to 10 BTC
    mockWalletBalances[address] = balance
    return balance
  }

  return 0
}

// Mock transaction validation
export const validateTransaction = async (txHash: string): Promise<boolean> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500))

  // Mock validation - 95% success rate
  return Math.random() < 0.95
}

// Mock address validation
export const validateAddress = async (address: string): Promise<boolean> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 200))

  // Basic Ethereum address validation
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}

// Mock private key validation
export const validatePrivateKey = async (privateKey: string): Promise<boolean> => {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 800))

  // Basic private key validation (64 hex characters)
  return /^[a-fA-F0-9]{64}$/.test(privateKey)
}

// Mock mnemonic validation
export const validateMnemonic = async (mnemonic: string): Promise<boolean> => {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1200))

  // Basic mnemonic validation (12-24 words)
  const words = mnemonic.trim().split(/\s+/)
  return words.length >= 12 && words.length <= 24
}

// Mock blockchain info
export const getBlockchainInfo = async () => {
  await new Promise(resolve => setTimeout(resolve, 300))

  return {
    blockNumber: 18923456,
    difficulty: 123456789012345,
    hashRate: 123456789,
    gasPrice: 20,
    network: 'Ethereum Mainnet',
    status: 'healthy'
  }
}

// Mock wallet history
export const getWalletHistory = async (address: string) => {
  await new Promise(resolve => setTimeout(resolve, 800))

  const transactions = [
    {
      hash: '0x' + Math.random().toString(16).substr(2, 64),
      from: address,
      to: '0x' + Math.random().toString(16).substr(2, 40),
      value: Math.random() * 2,
      timestamp: new Date(),
      status: 'confirmed'
    },
    {
      hash: '0x' + Math.random().toString(16).substr(2, 64),
      from: '0x' + Math.random().toString(16).substr(2, 40),
      to: address,
      value: Math.random() * 1.5,
      timestamp: new Date(Date.now() - 86400000),
      status: 'confirmed'
    }
  ]

  return transactions
}

// Mock gas estimation
export const estimateGas = async (from: string, to: string, value: number) => {
  await new Promise(resolve => setTimeout(resolve, 400))

  return {
    gasLimit: 21000,
    gasPrice: 20,
    totalCost: 21000 * 20,
    estimatedTime: 30 // seconds
  }
}