'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react'

interface FormData {
  email: string
  password: string
  confirmPassword: string
  name: string
}

interface RegistrationFormProps {
  onSubmit: (data: FormData) => void
  onSignIn: () => void
}

const RegistrationForm = ({ onSubmit, onSignIn }: RegistrationFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: Partial<FormData> = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (!formData.name) {
      newErrors.name = 'Name is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    onSubmit(formData)
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-md mx-4 bg-black rounded-lg overflow-hidden border border-orange-500/30 shadow-2xl"
        >
          {/* Header */}
          <div className="px-6 py-4 bg-gradient-to-r from-orange-500/10 to-orange-600/10 border-b border-orange-500/30">
            <h2 className="text-2xl font-bold text-white">Create Account</h2>
            <p className="text-gray-400 text-sm mt-1">Join the mining revolution</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="text-gray-300 text-sm font-medium">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-900 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${
                    errors.name ? 'border-red-500' : 'border-gray-800'
                  }`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-xs"
                >
                  {errors.name}
                </motion.p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-gray-300 text-sm font-medium">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-900 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${
                    errors.email ? 'border-red-500' : 'border-gray-800'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-xs"
                >
                  {errors.email}
                </motion.p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-gray-300 text-sm font-medium">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`w-full pl-10 pr-12 py-3 bg-gray-900 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${
                    errors.password ? 'border-red-500' : 'border-gray-800'
                  }`}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-xs"
                >
                  {errors.password}
                </motion.p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label className="text-gray-300 text-sm font-medium">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className={`w-full pl-10 pr-12 py-3 bg-gray-900 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-800'
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-xs"
                >
                  {errors.confirmPassword}
                </motion.p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-black font-bold rounded-lg hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </motion.button>

            {/* Sign In Link */}
            <div className="text-center pt-4">
              <p className="text-gray-400 text-sm">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={onSignIn}
                  className="text-orange-400 hover:text-orange-300 font-medium transition-colors"
                >
                  Sign In
                </button>
              </p>
            </div>
          </form>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-900/50 border-t border-orange-500/30">
            <p className="text-gray-500 text-xs text-center">
              By creating an account, you agree to our{' '}
              <a href="#" className="text-orange-400 hover:text-orange-300">Terms of Service</a>{' '}
              and{' '}
              <a href="#" className="text-orange-400 hover:text-orange-300">Privacy Policy</a>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default RegistrationForm