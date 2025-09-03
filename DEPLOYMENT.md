# Deployment Guide & Checklist

This guide provides step-by-step instructions for deploying the WrenchIT website to Vercel.

## 🚀 Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/wrenchit-io/website)

## 📋 Pre-Deployment Checklist

### Code Quality
- [ ] Run `npm run lint` - No linting errors
- [ ] Run `npm run type-check` - No TypeScript errors
- [ ] Run `npm run build` - Build succeeds locally
- [ ] Run `npm run format:check` - Code is properly formatted
- [ ] All console.logs removed from production code
- [ ] Error handling implemented for all API calls

### Performance
- [ ] Images optimized (WebP/AVIF formats)
- [ ] Lazy loading implemented for images
- [ ] Bundle size checked with `npm run build:analyze`
- [ ] Lighthouse score > 90 for all metrics
- [ ] Critical CSS inlined
- [ ] Fonts preloaded

### SEO
- [ ] Meta tags configured for all pages
- [ ] Open Graph images created (1200x630px)
- [ ] Sitemap generated correctly
- [ ] Robots.txt configured
- [ ] Canonical URLs set
- [ ] Structured data (JSON-LD) implemented

### Security
- [ ] Environment variables secured
- [ ] API keys not exposed in client code
- [ ] CORS configured properly
- [ ] CSP headers configured
- [ ] Rate limiting on API routes
- [ ] Input validation on all forms

### Content
- [ ] All placeholder content replaced
- [ ] Contact information updated
- [ ] Privacy Policy page created
- [ ] Terms of Service page created
- [ ] Cookie Policy updated
- [ ] 404 page customized

## 🔧 Environment Variables Setup

### Required Variables

```env
# Production Site URL
NEXT_PUBLIC_SITE_URL=https://wrenchit.io

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Email Service (Choose one)
SENDGRID_API_KEY=SG.XXXXXXXXXXXX
# OR
EMAIL_SERVICE_API_KEY=your-email-api-key

# Contact Form
EMAIL_FROM_ADDRESS=noreply@wrenchit.io
EMAIL_TO_ADDRESS=carl@wrenchit.io
```

### Optional Variables

```env
# Google Tag Manager
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Facebook Pixel
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=XXXXXXXXXXXXXXX

# Error Tracking
SENTRY_DSN=https://XXXXXXXX@sentry.io/XXXXXXX

# reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=XXXXXXXXXX
RECAPTCHA_SECRET_KEY=XXXXXXXXXX
```

## 📦 Deployment Steps

### 1. Prepare Your Repository

```bash
# Ensure you're on the main branch
git checkout main

# Pull latest changes
git pull origin main

# Run tests and checks
npm run lint
npm run type-check
npm run build

# Commit any final changes
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 2. Deploy with Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### 3. Configure in Vercel Dashboard

1. **Import Project**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Select the main branch

2. **Configure Build Settings**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

3. **Add Environment Variables**
   - Go to Settings → Environment Variables
   - Add all required variables from `.env.example`
   - Select appropriate environments (Production/Preview/Development)

4. **Configure Domains**
   - Go to Settings → Domains
   - Add `wrenchit.io`
   - Add `www.wrenchit.io` (redirect to apex)

## 🌐 DNS Configuration

### For wrenchit.io

Add these DNS records to your domain provider:

```
Type    Name    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

### SSL Certificate

SSL certificates are automatically provisioned by Vercel once DNS is configured.

## 🔍 Post-Deployment Verification

### Functionality Tests
- [ ] Homepage loads correctly
- [ ] Navigation works on all pages
- [ ] Contact form submits successfully
- [ ] Newsletter signup works
- [ ] Dark mode toggle functions
- [ ] All images load properly
- [ ] Mobile responsive design works

### SEO Verification
- [ ] Google Search Console connected
- [ ] Sitemap submitted to Google
- [ ] robots.txt accessible at `/robots.txt`
- [ ] Meta tags render correctly (check with social media debuggers)

### Performance Tests
- [ ] Run Lighthouse audit: `npm run lighthouse`
- [ ] Check Core Web Vitals in Google PageSpeed Insights
- [ ] Test on real devices (mobile/tablet/desktop)
- [ ] Verify caching headers with Chrome DevTools

### Analytics Setup
- [ ] Google Analytics receiving data
- [ ] Events tracking properly
- [ ] Goals/Conversions configured
- [ ] Real-time data visible

## 🔄 Continuous Deployment

### Automatic Deployments

Vercel automatically deploys:
- **Production**: When pushing to `main` branch
- **Preview**: When creating pull requests

### Manual Deployments

```bash
# Deploy specific branch
vercel --prod --scope=your-team

# Deploy with different environment
vercel --env=staging

# Rollback to previous deployment
vercel rollback
```

## 🐛 Troubleshooting

### Build Failures

```bash
# Clear cache and rebuild
vercel --force

# Check build logs
vercel logs

# Run build locally with production env
NODE_ENV=production npm run build
```

### Environment Variables Issues

1. Verify in Vercel Dashboard → Settings → Environment Variables
2. Ensure `NEXT_PUBLIC_` prefix for client-side variables
3. Redeploy after changing environment variables

### Domain Issues

1. Verify DNS propagation: `nslookup wrenchit.io`
2. Check SSL certificate status in Vercel Dashboard
3. Clear browser cache and cookies

### Performance Issues

1. Enable Vercel Analytics
2. Check function logs for slow API calls
3. Review bundle size with `npm run build:analyze`
4. Optimize images and lazy load components

## 📊 Monitoring

### Vercel Analytics

Enable in Vercel Dashboard → Analytics

### Custom Monitoring

```javascript
// Track deployments
fetch('/api/deployment', {
  method: 'POST',
  body: JSON.stringify({
    version: process.env.VERCEL_GIT_COMMIT_SHA,
    timestamp: new Date().toISOString()
  })
})
```

## 🔐 Security Checklist

- [ ] API routes protected with authentication where needed
- [ ] Rate limiting implemented
- [ ] CORS configured correctly
- [ ] Security headers in place
- [ ] Secrets not exposed in client bundles
- [ ] Dependencies updated to latest secure versions

## 📝 Rollback Procedure

If issues occur after deployment:

1. **Immediate Rollback**
   ```bash
   vercel rollback
   ```

2. **Rollback to Specific Deployment**
   ```bash
   vercel ls  # List deployments
   vercel rollback [deployment-url]
   ```

3. **Fix and Redeploy**
   ```bash
   git revert HEAD
   git push origin main
   ```

## 📞 Support

For deployment issues:
- Vercel Support: [vercel.com/support](https://vercel.com/support)
- GitHub Issues: [github.com/wrenchit-io/website/issues](https://github.com/wrenchit-io/website/issues)
- Email: carl@wrenchit.io

---

Last Updated: January 2025