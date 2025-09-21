'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Bitcoin, Mail, Phone, MapPin, Github, Twitter, MessageCircle, Shield } from 'lucide-react'

const Footer = () => {
  const [email, setEmail] = useState('')

  const footerLinks = {
    Product: [
      { name: 'Features', href: '/#features' },
      { name: 'Technologies', href: '/technologies' },
      { name: 'Compatibility', href: '/compatibility' },
      { name: 'Success Rate', href: '/success-rate' },
      { name: 'Demo', href: '/demo' }
    ],
    Company: [
      { name: 'About Us', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' }
    ],
    Support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Documentation', href: '/docs' },
      { name: 'API Status', href: '/status' },
      { name: 'Community', href: '/community' }
    ],
    Legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Licensing', href: '/licensing' }
    ]
  }

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/bruteosaur' },
    { name: 'MessageCircle', icon: MessageCircle, href: 'https://discord.gg/bruteosaur' },
    { name: 'Github', icon: Github, href: 'https://github.com/bruteosaur' }
  ]

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    alert('Thank you for subscribing!')
    setEmail('')
  }

  return (
    <footer className="bg-black border-t border-orange-500/20">
      {/* Newsletter Section */}
      <div className="py-12 bg-gradient-to-r from-orange-500/5 to-orange-600/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-orange-500/10 backdrop-blur-sm rounded-full border border-orange-500/30 mb-4"
            >
              <Bitcoin className="w-5 h-5 text-orange-400" />
              <span className="text-orange-400 text-sm font-medium">Stay Updated</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl font-bold text-white mb-4"
            >
              Get the Latest Mining Updates
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 mb-8"
            >
              Subscribe to our newsletter for the latest updates on mining technology and platform improvements.
            </motion.p>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-black border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-black font-bold rounded-lg"
              >
                Subscribe
              </motion.button>
            </motion.form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center space-x-2 mb-4">
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

              <p className="text-gray-400 mb-6 max-w-sm">
                Advanced crypto mining intelligence with cutting-edge brute-force technology.
                Experience the future of cryptocurrency mining today.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center text-gray-400 hover:text-orange-400 transition-colors"
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="text-white font-semibold mb-4">{category}</h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-orange-400 transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="py-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-gray-400 text-sm">
              <p>&copy; 2024 Bruteosaur. All rights reserved.</p>
              <div className="flex items-center space-x-1">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-green-400">Secure</span>
              </div>
            </div>

            <div className="flex items-center space-x-6 text-gray-400 text-sm">
              <div className="flex items-center space-x-1">
                <Mail className="w-4 h-4" />
                <span>support@bruteosaur.com</span>
              </div>
              <div className="flex items-center space-x-1">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer