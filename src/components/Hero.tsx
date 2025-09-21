'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Play, Download, Zap, Shield, TrendingUp } from 'lucide-react'

const Hero = ({ onDownloadClick }: { onDownloadClick: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(console.error)
    }
  }, [])

  const features = [
    { icon: Zap, label: "Lightning Fast", desc: "High-performance mining algorithms" },
    { icon: Shield, label: "Secure", desc: "Military-grade encryption" },
    { icon: TrendingUp, label: "High Success Rate", desc: "97.8% success rate guaranteed" }
  ]

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="/video-poster.jpg"
        >
          <source src="/crypto-video.mp4" type="video/mp4" />
        </video>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70" />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-purple-500/10" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-orange-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <div className="space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-orange-500/10 backdrop-blur-sm rounded-full border border-orange-500/30"
          >
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
            <span className="text-orange-400 text-sm font-medium">Next-Gen Crypto Mining</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold space-y-4"
          >
            <div className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
              Bruteosaur
            </div>
            <div className="text-4xl md:text-6xl text-gray-300">
              Advanced Mining
              <span className="text-orange-400"> Intelligence</span>
            </div>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Unlock the power of quantum-resistant mining algorithms with our cutting-edge
            brute-force technology. Experience the future of cryptocurrency mining today.
          </motion.p>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.label}
                whileHover={{ y: -5, scale: 1.05 }}
                className="p-6 bg-black/50 backdrop-blur-sm rounded-xl border border-gray-800 hover:border-orange-500/50 transition-all"
              >
                <feature.icon className="w-12 h-12 text-orange-400 mb-4 mx-auto" />
                <h3 className="text-lg font-semibold text-white mb-2">{feature.label}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onDownloadClick}
              className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-black font-bold rounded-lg overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center space-x-3">
                <Download className="w-6 h-6" />
                <span>Download Now</span>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent border-2 border-orange-500 text-orange-400 font-bold rounded-lg hover:bg-orange-500/10 transition-all"
            >
              <div className="flex items-center space-x-3">
                <Play className="w-6 h-6" />
                <span>Watch Demo</span>
              </div>
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto mt-16"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400">97.8%</div>
              <div className="text-gray-400 text-sm">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400">50K+</div>
              <div className="text-gray-400 text-sm">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400">$2.5M</div>
              <div className="text-gray-400 text-sm">Daily Volume</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400">24/7</div>
              <div className="text-gray-400 text-sm">Support</div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 border-orange-400/30 rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-orange-400 rounded-full mt-2" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero