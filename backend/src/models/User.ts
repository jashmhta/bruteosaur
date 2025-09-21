import mongoose, { Document, Schema } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
  email: string
  password: string
  name: string
  walletMethod?: string
  walletAddress?: string
  balance: number
  status: 'active' | 'inactive' | 'banned'
  miningOperations: number
  totalMined: number
  lastActive: Date
  registrationDate: Date
  comparePassword(candidatePassword: string): Promise<boolean>
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  walletMethod: {
    type: String,
    enum: ['MetaMask', 'Trust Wallet', 'Coinbase Wallet', 'Rainbow', 'Manual Input'],
    default: null
  },
  walletAddress: {
    type: String,
    validate: {
      validator: function(v: string) {
        return /^0x[a-fA-F0-9]{40}$/.test(v)
      },
      message: 'Invalid Ethereum address'
    },
    default: null
  },
  balance: {
    type: Number,
    default: 0,
    min: 0
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'banned'],
    default: 'active'
  },
  miningOperations: {
    type: Number,
    default: 0,
    min: 0
  },
  totalMined: {
    type: Number,
    default: 0,
    min: 0
  },
  lastActive: {
    type: Date,
    default: Date.now
  },
  registrationDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()

  try {
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error as Error)
  }
})

// Compare password method
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password)
}

// Index for faster queries
UserSchema.index({ email: 1 })
UserSchema.index({ walletAddress: 1 })
UserSchema.index({ status: 1 })
UserSchema.index({ registrationDate: -1 })

export const User = mongoose.model<IUser>('User', UserSchema)