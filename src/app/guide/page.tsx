'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Download, FileText, Settings, Terminal, CheckCircle, AlertTriangle, Clock } from 'lucide-react'

const GuidePage = () => {
  const [downloadStarted, setDownloadStarted] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const installationSteps = [
    {
      title: "Download BFGMiner",
      description: "Click the download button to get the latest version of BFGMiner",
      icon: Download,
      color: "text-orange-400"
    },
    {
      title: "Extract the Archive",
      description: "Extract the downloaded ZIP file to your preferred location",
      icon: FileText,
      color: "text-blue-400"
    },
    {
      title: "Configure Settings",
      description: "Edit the configuration file with your mining pool details",
      icon: Settings,
      color: "text-purple-400"
    },
    {
      title: "Run BFGMiner",
      description: "Execute the miner using the command line interface",
      icon: Terminal,
      color: "text-green-400"
    },
    {
      title: "Start Mining",
      description: "Monitor your mining progress and earnings",
      icon: CheckCircle,
      color: "text-yellow-400"
    }
  ]

  const systemRequirements = [
    { os: "Windows", version: "7/8/10/11 (64-bit)", cpu: "Intel i3/i5/i7/i9", ram: "4GB GB", gpu: "NVIDIA/AMD" },
    { os: "Linux", version: "Ubuntu 16.04+ or similar", cpu: "Intel/AMD", ram: "2GB GB", gpu: "OpenCL compatible" },
    { os: "macOS", version: "10.12+", cpu: "Intel", ram: "4GB GB", gpu: "OpenCL compatible" }
  ]

  const configExamples = [
    {
      name: "Basic Configuration",
      code: `bfgminer -o stratum+tcp://pool.example.com:3333 -u username.worker -p password`
    },
    {
      name: "Advanced Configuration",
      code: `bfgminer -o stratum+tcp://pool.example.com:3333 -u username.worker -p password \\
--api-listen --api-network --api-allow W:127.0.0.1 \\
--set-device clock:1000,memclock:1200 \\
--intensity 18`
    },
    {
      name: "Multi-Pool Configuration",
      code: `bfgminer -o stratum+tcp://pool1.example.com:3333 -u user1.worker1 -p pass1 \\
-o stratum+tcp://pool2.example.com:3333 -u user2.worker2 -p pass2 \\
--failover-only`
    }
  ]

  const handleDownload = () => {
    setDownloadStarted(true)
    // Simulate download
    setTimeout(() => {
      const link = document.createElement('a')
      link.href = '/bfgminer.zip'
      link.download = 'bfgminer.zip'
      link.click()
    }, 1000)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % installationSteps.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [installationSteps.length])

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-orange-500/10 backdrop-blur-sm rounded-full border border-orange-500/30 mb-4"
          >
            <FileText className="w-5 h-5 text-orange-400" />
            <span className="text-orange-400 text-sm font-medium">Installation Guide</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold text-white mb-4"
          >
            BFGMiner Installation & Setup Guide
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Follow this comprehensive guide to install and configure BFGMiner for optimal mining performance
          </motion.p>
        </div>

        {/* Download Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-2xl p-8 mb-12"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Download BFGMiner</h2>
            <p className="text-gray-400 mb-6">
              Get the latest version of BFGMiner optimized for Bruteosaur mining operations
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownload}
                disabled={downloadStarted}
                className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-black font-bold rounded-lg disabled:opacity-50"
              >
                {downloadStarted ? (
                  <>
                    <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Downloading...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-6 h-6" />
                    <span>Download BFGMiner</span>
                  </>
                )}
              </motion.button>

              <div className="text-gray-400 text-sm">
                Version: 5.5.0 | Size: 15.2 MB | Updated: {new Date().toLocaleDateString()}
              </div>
            </div>

            {downloadStarted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg"
              >
                <div className="flex items-center space-x-2 text-green-400">
                  <CheckCircle className="w-5 h-5" />
                  <span>Download started successfully! Check your downloads folder.</span>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Installation Steps */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Installation Steps</h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {installationSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className={`p-6 rounded-xl border-2 transition-all ${
                  index === currentStep
                    ? 'border-orange-400 bg-orange-500/10'
                    : 'border-gray-800 bg-gray-900/50'
                }`}
              >
                <div className="text-center">
                  <step.icon className={`w-12 h-12 mx-auto mb-4 ${step.color}`} />
                  <div className="text-sm text-gray-400 mb-2">Step {index + 1}</div>
                  <h3 className="text-white font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.description}</p>

                  {index === currentStep && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="mt-4 flex items-center justify-center space-x-2 text-orange-400 text-sm"
                    >
                      <Clock className="w-4 h-4" />
                      <span>Current Step</span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* System Requirements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-900/50 border border-gray-800 rounded-xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4">System Requirements</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-gray-400 text-sm">
                    <th className="text-left py-2">Operating System</th>
                    <th className="text-left py-2">Version</th>
                    <th className="text-left py-2">CPU</th>
                    <th className="text-left py-2">RAM</th>
                    <th className="text-left py-2">GPU</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300 text-sm">
                  {systemRequirements.map((req, index) => (
                    <tr key={index} className="border-t border-gray-800">
                      <td className="py-3">{req.os}</td>
                      <td className="py-3">{req.version}</td>
                      <td className="py-3">{req.cpu}</td>
                      <td className="py-3">{req.ram}</td>
                      <td className="py-3">{req.gpu}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-900/50 border border-gray-800 rounded-xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4">Features</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-gray-300">Multi-threaded CPU mining</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-gray-300">GPU mining with OpenCL</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-gray-300">Stratum protocol support</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-gray-300">Advanced monitoring</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-gray-300">Dynamic frequency scaling</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-gray-300">RPC API interface</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Configuration Examples */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Configuration Examples</h2>

          <div className="space-y-6">
            {configExamples.map((config, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden"
              >
                <div className="p-4 bg-gray-800 border-b border-gray-700">
                  <h4 className="text-white font-medium">{config.name}</h4>
                </div>
                <div className="p-4">
                  <pre className="bg-black rounded-lg p-4 overflow-x-auto">
                    <code className="text-green-400 text-sm">{config.code}</code>
                  </pre>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tips & Warnings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6"
          >
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-blue-400 font-semibold mb-2">Pro Tips</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Use the latest GPU drivers for optimal performance</li>
                  <li>• Monitor your GPU temperature during mining</li>
                  <li>• Start with low intensity and gradually increase</li>
                  <li>• Join a reputable mining pool with low fees</li>
                  <li>• Keep your system updated for security</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-red-500/10 border border-red-500/20 rounded-xl p-6"
          >
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-red-400 font-semibold mb-2">Important Warnings</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Mining generates significant heat - ensure proper cooling</li>
                  <li>• High power consumption - check your electrical capacity</li>
                  <li>• Use dedicated hardware for mining operations</li>
                  <li>• Backup your wallet regularly</li>
                  <li>• Be aware of local regulations regarding cryptocurrency</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Video Tutorial Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mt-12 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Video Tutorial</h2>
          <p className="text-gray-400 mb-6">Watch our step-by-step video guide</p>

          <div className="max-w-4xl mx-auto bg-gray-900 rounded-xl overflow-hidden">
            <div className="aspect-video bg-gray-800 flex items-center justify-center">
              <div className="text-center">
                <Play className="w-16 h-16 text-orange-400 mx-auto mb-4" />
                <p className="text-gray-400">Video tutorial coming soon</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default GuidePage