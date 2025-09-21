'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Menu, X, Bitcoin, Cpu, Shield, TrendingUp, Play } from 'lucide-react'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '/about', label: 'About Us', icon: Bitcoin },
    { href: '/technologies', label: 'Technologies', icon: Cpu },
    { href: '/compatibility', label: 'Compatibility', icon: Shield },
    { href: '/success-rate', label: 'Success Rate', icon: TrendingUp },
    { href: '/demo', label: 'View Demo', icon: Play },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/95 backdrop-blur-md border-b border-orange-500/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center"
            >
              <Bitcoin className="w-6 h-6 text-black" />
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Bruteosaur
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-1 text-gray-300 hover:text-orange-400 transition-colors group"
                >
                  <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">{item.label}</span>
                </motion.div>
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-orange-400 hover:bg-orange-500/10 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
          className="md:hidden overflow-hidden"
        >
          <nav className="py-4 space-y-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex items-center space-x-2 px-4 py-3 text-gray-300 hover:text-orange-400 hover:bg-orange-500/10 rounded-lg transition-colors"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </motion.div>
              </Link>
            ))}
          </nav>
        </motion.div>
      </div>
    </motion.header>
  )
}

export default Header