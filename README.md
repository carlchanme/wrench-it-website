# WrenchIt Website

![WrenchIt Logo](public/logo.svg)

Professional software development and AI automation services website built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

### Core Features
- ⚡ **Next.js 14** with App Router
- 🎨 **Tailwind CSS** for styling
- 🔧 **TypeScript** for type safety
- 🌙 **Dark mode** support
- 📱 **Fully responsive** design
- ♿ **Accessibility** compliant

### Business Features
- 📊 Portfolio/Case Studies showcase
- 💼 Service offerings pages
- 📝 Blog system with MDX support
- 📬 Newsletter subscription
- 📞 Contact forms with validation
- 🤝 Client testimonials
- ❓ FAQ section
- 🎯 Call-to-action components

### SEO & Performance
- 🔍 **SEO optimized** with meta tags
- 📊 **Structured data** (JSON-LD)
- 🗺️ **XML sitemap** generation
- 🤖 **robots.txt** configuration
- 📈 **Google Analytics** integration
- 🍪 **GDPR-compliant** cookie consent
- ⚡ **Core Web Vitals** monitoring
- 🚀 **Performance optimized** with caching

### Developer Experience
- 🔥 **Hot Module Replacement**
- 📦 **Component library** with Radix UI
- 🎭 **Error boundaries**
- 🔄 **Loading states**
- 🧪 **Testing utilities**
- 📝 **Comprehensive documentation**

## 📋 Prerequisites

- Node.js 18.17 or later
- npm or yarn
- Git

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/wrenchit-io/website.git
cd wrench-it-website
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Required for production
NEXT_PUBLIC_SITE_URL=https://wrenchit.io
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Optional services
EMAIL_SERVICE_API_KEY=your-api-key
SENDGRID_API_KEY=your-sendgrid-key
```

### 4. Run development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

#### Method 1: Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy to production:
```bash
npm run deploy
# or for preview
npm run deploy:preview
```

#### Method 2: GitHub Integration

1. Push your code to GitHub
2. Import the project on [Vercel Dashboard](https://vercel.com/new)
3. Configure environment variables in Vercel Dashboard
4. Deploy automatically on push to main branch

### Environment Variables on Vercel

Add these environment variables in your Vercel Dashboard:

```
NEXT_PUBLIC_SITE_URL=https://wrenchit.io
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GA_CONVERSION_ID=AW-XXXXXXXXXX
EMAIL_SERVICE_API_KEY=your-email-api-key
SENDGRID_API_KEY=your-sendgrid-key
```

### Custom Domain Setup

1. In Vercel Dashboard, go to Settings → Domains
2. Add your domain: `wrenchit.io`
3. Configure DNS records:

```
A Record: @ → 76.76.21.21
CNAME: www → cname.vercel-dns.com
```

4. SSL certificate will be automatically provisioned

## 📦 Build & Optimization

### Production Build

```bash
npm run build:prod
```

### Analyze Bundle Size

```bash
npm run build:analyze
```

### Clean Build Cache

```bash
npm run clean:cache
```

### Performance Testing

```bash
npm run lighthouse
```

## 🧪 Testing

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

### Format Code

```bash
npm run format
```

## 📁 Project Structure

```
wrench-it-website/
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Homepage
│   │   ├── about/          # About page
│   │   ├── services/       # Services pages
│   │   ├── portfolio/      # Portfolio pages
│   │   ├── blog/           # Blog pages
│   │   ├── contact/        # Contact page
│   │   └── api/            # API routes
│   ├── components/         # React components
│   │   ├── ui/            # UI components
│   │   ├── seo/           # SEO components
│   │   └── sections/      # Page sections
│   ├── lib/               # Utility functions
│   │   ├── utils.ts       # Helper functions
│   │   ├── structured-data.ts
│   │   └── performance.ts
│   └── types/             # TypeScript types
├── public/                # Static assets
├── .env.example          # Environment variables template
├── next.config.js        # Next.js configuration
├── vercel.json          # Vercel configuration
├── tailwind.config.ts   # Tailwind CSS configuration
└── package.json         # Project dependencies
```

## 🔧 Configuration Files

### vercel.json
- Build settings
- Environment variables
- Headers and redirects
- Function configuration
- Regional deployment

### next.config.js
- Image optimization
- Caching strategies
- Security headers
- Webpack configuration
- Performance optimizations

### domains.json
- Custom domain configuration
- Redirect rules

## 📊 Analytics & Monitoring

### Google Analytics Setup

1. Create a GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get your Measurement ID (G-XXXXXXXXXX)
3. Add to environment variables:
```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Performance Monitoring

The website includes built-in performance monitoring:
- Core Web Vitals tracking
- Resource timing analysis
- Error tracking
- User interaction tracking

View performance data in:
- Google Analytics
- Vercel Analytics Dashboard
- Chrome DevTools Performance tab

## 🔒 Security

### Headers
- Content Security Policy (CSP)
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy

### Best Practices
- Environment variables for sensitive data
- HTTPS enforced
- Input validation and sanitization
- Rate limiting on API routes
- GDPR-compliant cookie handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server

# Testing & Quality
npm run lint            # Run ESLint
npm run type-check      # TypeScript checking
npm run format          # Format with Prettier

# Deployment
npm run deploy          # Deploy to Vercel (production)
npm run deploy:preview  # Deploy preview to Vercel

# Utilities
npm run clean           # Clean all build artifacts
npm run clean:cache     # Clean Next.js cache
npm run lighthouse      # Run Lighthouse audit
```

## 🐛 Troubleshooting

### Common Issues

#### Build Errors
```bash
# Clear cache and rebuild
npm run clean:cache
npm run build
```

#### Environment Variables Not Loading
- Ensure `.env.local` exists
- Restart development server after changes
- Use `NEXT_PUBLIC_` prefix for client-side variables

#### Deployment Issues
- Check environment variables in Vercel Dashboard
- Verify build logs in Vercel
- Ensure all dependencies are in `package.json`

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 📄 License

This project is proprietary and confidential. All rights reserved by WrenchIt.

## 👥 Team

- **Carl Rodriguez** - Lead Developer
- **WrenchIt Team** - Development & Design

## 📞 Support

For support, email carl@wrenchit.io or open an issue on GitHub.

---

Built with ❤️ by [WrenchIt](https://wrenchit.io)