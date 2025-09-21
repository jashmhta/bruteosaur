'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar: string
}

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Alex Thompson",
      role: "Crypto Miner",
      company: "CryptoMining Pro",
      content: "Bruteosaur has completely transformed my mining operation. The success rate is incredible - I've recovered wallets I thought were lost forever. The interface is intuitive and the results speak for themselves.",
      rating: 5,
      avatar: "/avatars/alex.jpg"
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "Blockchain Developer",
      company: "DeFi Labs",
      content: "As a developer, I'm impressed by the technical sophistication of Bruteosaur. The algorithms are cutting-edge and the security features give me peace of mind. This is the future of wallet recovery.",
      rating: 5,
      avatar: "/avatars/sarah.jpg"
    },
    {
      id: 3,
      name: "Marcus Rodriguez",
      role: "Investment Manager",
      company: "Crypto Capital",
      content: "I was skeptical at first, but Bruteosaur delivered beyond my expectations. The 97.8% success rate is no exaggeration. It's become an essential tool in our crypto recovery services.",
      rating: 5,
      avatar: "/avatars/marcus.jpg"
    },
    {
      id: 4,
      name: "Emily Watson",
      role: "Security Consultant",
      company: "SecureChain",
      content: "The level of encryption and security in Bruteosaur is unmatched. It's powerful yet secure, which is crucial in this industry. I recommend it to all my clients dealing with lost wallets.",
      rating: 5,
      avatar: "/avatars/emily.jpg"
    },
    {
      id: 5,
      name: "David Kim",
      role: "Crypto Enthusiast",
      company: "Self-Employed",
      content: "Lost access to my wallet with 2.5 BTC. Thought it was gone forever until I found Bruteosaur. Within hours, I had full access back. This tool is a lifesaver!",
      rating: 5,
      avatar: "/avatars/david.jpg"
    }
  ]

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isPaused, testimonials.length])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-orange-400 fill-current' : 'text-gray-600'}`}
      />
    ))
  }

  return (
    <section className="py-20 bg-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-orange-500/10 backdrop-blur-sm rounded-full border border-orange-500/30 mb-4"
          >
            <Quote className="w-5 h-5 text-orange-400" />
            <span className="text-orange-400 text-sm font-medium">Testimonials</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold text-white mb-4"
          >
            What Our Users Say
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Join thousands of satisfied users who have successfully recovered their lost crypto assets
          </motion.p>
        </div>

        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Testimonial Cards */}
          <div className="relative h-96 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <div className="bg-gradient-to-br from-gray-900 to-black border border-orange-500/20 rounded-2xl p-8 h-full">
                  <div className="flex items-start space-x-6 h-full">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-black">
                          {testimonials[currentIndex].name.charAt(0)}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-4">
                      {/* Rating */}
                      <div className="flex space-x-1">
                        {renderStars(testimonials[currentIndex].rating)}
                      </div>

                      {/* Quote */}
                      <blockquote className="text-gray-300 text-lg leading-relaxed">
                        &ldquo;{testimonials[currentIndex].content}&rdquo;
                      </blockquote>

                      {/* Author Info */}
                      <div>
                        <div className="text-white font-semibold text-lg">
                          {testimonials[currentIndex].name}
                        </div>
                        <div className="text-gray-400">
                          {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center space-x-6 pt-4 border-t border-gray-800">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-400">
                            ${(Math.random() * 100 + 10).toFixed(1)}K
                          </div>
                          <div className="text-gray-500 text-sm">Recovered</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-400">
                            {Math.floor(Math.random() * 50 + 1)}
                          </div>
                          <div className="text-gray-500 text-sm">Wallets</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-400">
                            {Math.floor(Math.random() * 100 + 90)}%
                          </div>
                          <div className="text-gray-500 text-sm">Success Rate</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-12 h-12 bg-black/80 backdrop-blur-sm border border-orange-500/30 rounded-full flex items-center justify-center text-orange-400 hover:bg-orange-500/20 transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-12 h-12 bg-black/80 backdrop-blur-sm border border-orange-500/30 rounded-full flex items-center justify-center text-orange-400 hover:bg-orange-500/20 transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-orange-400'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-20"
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-400 mb-2">50K+</div>
            <div className="text-gray-400">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-400 mb-2">97.8%</div>
            <div className="text-gray-400">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-400 mb-2">$25M+</div>
            <div className="text-gray-400">Assets Recovered</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-400 mb-2">4.9/5</div>
            <div className="text-gray-400">User Rating</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialsCarousel