# Bruteosaur - Advanced Crypto Mining Platform

![Bruteosaur Logo](https://via.placeholder.com/150x150?text=Bruteosaur)

A cutting-edge cryptocurrency mining platform with advanced brute-force wallet recovery technology. Built with Next.js, Node.js, and MongoDB.

## 🚀 Features

### Frontend Features
- **Modern UI/UX**: Dark theme with orange accent colors
- **Responsive Design**: Works seamlessly on all devices
- **Hero Section**: Video background with call-to-action
- **Terminal Animation**: Interactive Linux-style terminal with mnemonic brute-forcing simulation
- **WalletConnect**: Mock wallet connection interface (MetaMask, Trust Wallet, Coinbase, Rainbow)
- **Registration System**: User authentication with email validation
- **Testimonials**: Customer success stories carousel
- **Admin Dashboard**: Real-time user monitoring and analytics

### Backend Features
- **RESTful API**: Express.js with TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based authentication
- **Real-time Updates**: Socket.io for live notifications
- **Security**: Rate limiting, helmet, CORS, input validation
- **Blockchain Integration**: Mock blockchain validation service
- **Admin Panel**: User management and monitoring

### Technical Stack
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js, TypeScript, MongoDB
- **Real-time**: Socket.io
- **Authentication**: JWT, bcrypt
- **Validation**: Joi
- **Styling**: Tailwind CSS with custom animations
- **Deployment**: Docker, Docker Compose

## 🛠️ Installation

### Prerequisites
- Node.js 18+
- MongoDB 7.0+
- Docker & Docker Compose (optional)

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/bruteosaur.git
cd bruteosaur
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Install backend dependencies**
```bash
cd backend
npm install
```

4. **Set up environment variables**
```bash
# Frontend
cp .env.example .env.local

# Backend
cd backend
cp .env.example .env
```

5. **Start MongoDB**
```bash
# Using Docker
docker run -d -p 27017:27017 --name bruteosaur-mongo mongo:7.0

# Or install MongoDB locally
# Follow MongoDB installation guide for your OS
```

6. **Start the backend**
```bash
cd backend
npm run dev
```

7. **Start the frontend**
```bash
cd ..
npm run dev
```

8. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Admin Dashboard: http://localhost:3000/admin

### Docker Deployment

1. **Clone and navigate to the project**
```bash
git clone https://github.com/yourusername/bruteosaur.git
cd bruteosaur
```

2. **Set up environment variables**
```bash
cp .env.example .env
```

3. **Build and start all services**
```bash
docker-compose up -d
```

4. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Admin Dashboard: http://localhost:3000/admin

## 📊 Project Structure

```
bruteosaur/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Home page
│   │   ├── admin/             # Admin dashboard
│   │   ├── guide/             # Installation guide
│   │   └── api/               # API routes
│   ├── components/            # React components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── DownloadTerminal.tsx
│   │   ├── RegistrationForm.tsx
│   │   ├── WalletConnectMock.tsx
│   │   ├── TestimonialsCarousel.tsx
│   │   └── Footer.tsx
│   ├── lib/                   # Utility functions
│   └── styles/                # Global styles
├── backend/
│   ├── src/
│   │   ├── index.ts           # Express server
│   │   ├── routes/            # API routes
│   │   ├── models/            # MongoDB models
│   │   ├── middleware/        # Express middleware
│   │   ├── services/          # Business logic
│   │   └── utils/             # Utility functions
│   └── dist/                  # Compiled JavaScript
├── public/                    # Static assets
├── docker-compose.yml         # Docker configuration
├── Dockerfile                # Frontend Docker config
├── backend/Dockerfile        # Backend Docker config
└── README.md                 # This file
```

## 🔧 Configuration

### Environment Variables

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_WS_URL=ws://localhost:5000
```

#### Backend (.env)
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/bruteosaur
JWT_SECRET=your-super-secret-jwt-key
```

## 🚀 Usage

### For Users

1. **Visit the homepage** and explore the hero section
2. **Click "Download Now"** to see the terminal animation
3. **Register an account** with your email
4. **Connect your wallet** using the WalletConnect interface
5. **Download BFGMiner** and follow the installation guide
6. **Start mining** with the configured software

### For Admins

1. **Access the admin dashboard** at `/admin`
2. **Monitor user registrations** in real-time
3. **View wallet connections** and validation status
4. **Export user data** for analysis
5. **Track mining operations** and revenue

## 🎨 Customization

### Color Scheme
- **Primary**: Black (#000000)
- **Accent**: Orange (#f97316)
- **Secondary**: Gray tones (#1f2937, #111827)
- **Text**: White (#ffffff)

### Animations
- Hero section particles
- Terminal typing effects
- Card hover animations
- Button hover effects
- Smooth scrolling

### Branding
- Update logo in `/public/` directory
- Modify brand colors in `globals.css`
- Update company information in the Footer component

## 🔒 Security Features

- **JWT Authentication**: Secure user authentication
- **Input Validation**: Joi validation for all inputs
- **Rate Limiting**: Prevent brute force attacks
- **CORS**: Cross-origin resource sharing protection
- **Helmet**: Security headers for Express.js
- **Password Hashing**: bcrypt for secure password storage
- **Blockchain Validation**: Mock blockchain service for wallet verification

## 📈 Performance

- **Optimized Images**: Next.js Image component
- **Code Splitting**: Automatic code splitting
- **Lazy Loading**: Components loaded on demand
- **Caching**: Redis for session caching
- **Database Indexing**: Optimized MongoDB queries
- **Compression**: Gzip compression for assets

## 🚀 Deployment

### Production Setup

1. **Server Requirements**
   - Node.js 18+
   - MongoDB 7.0+
   - 4GB RAM minimum
   - 50GB storage minimum

2. **Environment Configuration**
   ```bash
   # Production environment
   NODE_ENV=production

   # Security
   JWT_SECRET=your-super-secure-secret-key

   # Database
   MONGODB_URI=mongodb://user:pass@host:port/dbname

   # Services
   REDIS_URL=redis://localhost:6379
   ```

3. **Build and Deploy**
   ```bash
   # Build frontend
   npm run build

   # Build backend
   cd backend
   npm run build

   # Start with PM2 or similar
   pm2 start ecosystem.config.js
   ```

### Docker Deployment

1. **Production Docker Compose**
```bash
docker-compose -f docker-compose.prod.yml up -d
```

2. **Nginx Configuration**
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name yourdomain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://frontend:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /api {
        proxy_pass http://backend:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for beautiful animations
- MongoDB team for the excellent database
- Open source community for inspiration

## 📞 Support

For support, please join our Discord community or open an issue on GitHub.

- **Discord**: [Join our server](https://discord.gg/bruteosaur)
- **GitHub Issues**: [Report bugs](https://github.com/yourusername/bruteosaur/issues)
- **Email**: support@bruteosaur.com

## 🔮 Roadmap

- [ ] Real blockchain integration
- [ ] Mobile app development
- [ ] Advanced mining algorithms
- [ ] Multi-currency support
- [ ] API documentation
- [ ] Enhanced security features
- [ ] Performance optimizations
- [ ] Mobile app development

---

Built with ❤️ by the Bruteosaur team
