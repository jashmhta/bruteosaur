'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface Mnemonic {
  word: string
  color: string
}

const DownloadTerminal = ({ onComplete, onClose }: { onComplete: () => void, onClose: () => void }) => {
  const [phase, setPhase] = useState<'init' | 'scanning' | 'collecting' | 'success'>('init')
  const [collectedMnemonics, setCollectedMnemonics] = useState<Mnemonic[]>([])
  const [currentLine, setCurrentLine] = useState('')
  const [terminalLines, setTerminalLines] = useState<string[]>([])
  const terminalRef = useRef<HTMLDivElement>(null)

  const words = [
    'abandon', 'ability', 'able', 'about', 'above', 'absent', 'absorb', 'abstract', 'absurd', 'abuse',
    'access', 'accident', 'account', 'accuse', 'achieve', 'acid', 'acoustic', 'acquire', 'across', 'act',
    'action', 'actor', 'actress', 'actual', 'adapt', 'add', 'addict', 'address', 'adjust', 'admit',
    'adult', 'advance', 'advice', 'aerobic', 'affair', 'afford', 'afraid', 'again', 'agent', 'agree',
    'ahead', 'aim', 'air', 'airport', 'aisle', 'alarm', 'album', 'alcohol', 'alert', 'alien',
    'all', 'alley', 'allow', 'almost', 'alone', 'alpha', 'already', 'also', 'alter', 'always',
    'amateur', 'amazing', 'among', 'amount', 'amused', 'analyst', 'anchor', 'ancient', 'anger', 'angle',
    'angry', 'apart', 'apology', 'appear', 'apple', 'approve', 'april', 'arch', 'arctic', 'area',
    'arena', 'argue', 'arm', 'armed', 'armor', 'army', 'around', 'arrange', 'arrest', 'arrive',
    'arrow', 'artefact', 'artist', 'artwork', 'ask', 'aspect', 'assault', 'asset', 'assist', 'assume',
    'asthma', 'athlete', 'atom', 'attack', 'attend', 'attitude', 'attract', 'auction', 'audit', 'august',
    'aunt', 'author', 'auto', 'autumn', 'average', 'avocado', 'avoid', 'awake', 'aware', 'away',
    'awesome', 'awful', 'awkward', 'axis', 'baby', 'bachelor', 'bacon', 'badge', 'bag', 'balance',
    'balcony', 'ball', 'bamboo', 'banana', 'banner', 'bar', 'barely', 'bargain', 'barrel', 'base',
    'basic', 'basket', 'battle', 'beach', 'bean', 'beauty', 'because', 'become', 'beef', 'before',
    'begin', 'behave', 'behind', 'believe', 'below', 'belt', 'bench', 'benefit', 'best', 'betray',
    'better', 'between', 'beyond', 'bicycle', 'bid', 'bike', 'bind', 'biology', 'bird', 'birth',
    'bitter', 'black', 'blade', 'blame', 'blanket', 'blast', 'bleak', 'bless', 'blind', 'blood',
    'blossom', 'blow', 'blue', 'blur', 'blush', 'board', 'boat', 'body', 'boil', 'bomb',
    'bone', 'bonus', 'book', 'boost', 'border', 'boring', 'borrow', 'boss', 'bottom', 'bounce',
    'box', 'boy', 'bracket', 'brain', 'brand', 'brass', 'brave', 'bread', 'break', 'breed'
  ]

  const colors = ['text-green-400', 'text-blue-400', 'text-purple-400', 'text-pink-400', 'text-yellow-400', 'text-cyan-400']

  const getRandomMnemonic = () => {
    const word = words[Math.floor(Math.random() * words.length)]
    const color = colors[Math.floor(Math.random() * colors.length)]
    return { word, color }
  }

  const addTerminalLine = (line: string) => {
    setTerminalLines(prev => [...prev.slice(-10), line])
  }

  useEffect(() => {
    if (phase === 'init') {
      const timer = setTimeout(() => {
        setPhase('scanning')
        addTerminalLine('Initializing quantum mining protocols...')
      }, 1000)
      return () => clearTimeout(timer)
    }

    if (phase === 'scanning') {
      const scanLines = [
        'Scanning blockchain for vulnerable wallets...',
        'Deploying neural network algorithms...',
        'Analyzing transaction patterns...',
        'Bypassing encryption layers...',
        'Establishing secure connection...',
        'Loading brute-force matrix...'
      ]

      let index = 0
      const scanInterval = setInterval(() => {
        if (index < scanLines.length) {
          addTerminalLine(scanLines[index])
          index++
        } else {
          clearInterval(scanInterval)
          setPhase('collecting')
          addTerminalLine('Starting mnemonic collection...')
        }
      }, 800)

      return () => clearInterval(scanInterval)
    }

    if (phase === 'collecting') {
      if (collectedMnemonics.length < 12) {
        const collectInterval = setInterval(() => {
          const mnemonic = getRandomMnemonic()
          setCollectedMnemonics(prev => [...prev, mnemonic])

          const bruteForceLines = [
            `Brute-forcing wallet ${String(collectedMnemonics.length + 1).padStart(4, '0')}...`,
            `Testing mnemonic: ${mnemonic.word}`,
            `Hash collision detected!`,
            `Mnemonic validated: ${mnemonic.word}`,
            `Adding to recovery phrase...`
          ]

          const lineIndex = Math.floor(Math.random() * bruteForceLines.length)
          addTerminalLine(bruteForceLines[lineIndex])
        }, 500)

        return () => clearInterval(collectInterval)
      } else {
        const successTimer = setTimeout(() => {
          setPhase('success')
          addTerminalLine('🎊 Congratulations! $250 wallet found!')
          addTerminalLine('Recovery phrase complete: ' + collectedMnemonics.map(m => m.word).join(' '))
        }, 1000)
        return () => clearTimeout(successTimer)
      }
    }

    if (phase === 'success') {
      const completeTimer = setTimeout(() => {
        onComplete()
      }, 2000)
      return () => clearTimeout(completeTimer)
    }
  }, [phase, collectedMnemonics.length])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [terminalLines])

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
          className="w-full max-w-4xl mx-4 bg-black rounded-lg overflow-hidden border border-orange-500/30 shadow-2xl"
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-orange-500/30">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <div className="w-3 h-3 bg-green-500 rounded-full" />
            </div>
            <div className="text-gray-400 text-sm font-mono">Bruteosaur Terminal v2.1.0</div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Terminal Content */}
          <div className="flex h-96">
            {/* Terminal Output */}
            <div
              ref={terminalRef}
              className="flex-1 p-4 font-mono text-sm text-green-400 bg-black overflow-y-auto"
            >
              <div className="space-y-1">
                {terminalLines.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center space-x-2"
                  >
                    <span className="text-orange-400">$</span>
                    <span>{line}</span>
                  </motion.div>
                ))}

                {phase === 'collecting' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center space-x-2"
                  >
                    <span className="text-orange-400">$</span>
                    <span className="flex items-center">
                      Processing
                      <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="ml-1"
                      >
                        ...
                      </motion.span>
                    </span>
                  </motion.div>
                )}

                {phase === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg"
                  >
                    <div className="text-green-400 font-bold text-lg mb-2">
                      🎊 SUCCESS! Wallet Recovered!
                    </div>
                    <div className="text-green-300 text-sm">
                      Balance: $250.00 USD<br />
                      Address: 0x742d35Cc6634C0532925a3b844Bc9e7595f8e8E0<br />
                      Network: Ethereum Mainnet
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Collected Mnemonics */}
            <div className="w-80 p-4 bg-gray-900 border-l border-orange-500/30">
              <div className="text-gray-400 text-sm font-mono mb-4">COLLECTED MNEMONICS</div>
              <div className="grid grid-cols-2 gap-2">
                {collectedMnemonics.map((mnemonic, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-2 bg-black rounded border border-orange-500/20 ${mnemonic.color} font-mono text-xs`}
                  >
                    {index + 1}. {mnemonic.word}
                  </motion.div>
                ))}
              </div>

              {phase === 'collecting' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-center"
                >
                  <div className="text-gray-400 text-sm mb-2">
                    Progress: {collectedMnemonics.length}/12
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(collectedMnemonics.length / 12) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default DownloadTerminal