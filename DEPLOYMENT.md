# Deployment Guide - Quantiva Advisory Website

## 🚀 Production Deployment Checklist

### 1. Domain Configuration
- [x] **BASE_URL**: Set to `https://quantivaadvisory.com` in `sitemap.mjs`
- [x] **ORIGIN**: Updated in Next.js configuration
- [x] **robots.txt**: Points to correct sitemap URL

### 2. Language Redirect System
- [x] **Root redirect**: `/` automatically redirects to `/{de|en}/` based on user preference
- [x] **Language detection**: Uses `navigator.language` or saved preference
- [x] **Preference saving**: Language choice is saved in localStorage
- [x] **URL structure**: All routes are language-prefixed (`/de/`, `/en/`)
- [x] **Provider wrapping**: LanguageProvider wraps the entire app at the root level
- [x] **Type safety**: Proper TypeScript types for language codes and routing

### 3. Routing Structure
- [x] **Language-prefixed routes**: All routes use `/:lng/*` pattern
- [x] **Valid language codes**: Only `de` and `en` are accepted
- [x] **Invalid language handling**: Redirects to `/de/` for invalid codes
- [x] **404 handling**: Unknown routes redirect to language home
- [x] **Type safety**: Proper TypeScript types for route parameters

### 4. Next.js App Router Configuration

#### Vercel (Recommended)
- [x] **`vercel.json`**: Complete Vercel configuration with Next.js routing, security headers, and caching
- [x] **Framework preset**: Next.js
- [x] **Build command**: `npm run build`
- [x] **App Router**: Handles `/de/*`, `/en/*`, `/cases/*` routes automatically
- [x] **Security headers**: HSTS, CSP, X-Frame-Options, etc.
- [x] **Caching**: Optimized cache headers for assets and sitemap
- [x] **API Routes**: Serverless functions for contact form and other endpoints

### 5. SEO & Sitemap
- [x] **Dynamic sitemap**: Imports case studies from `app/lib/data/cases.json`
- [x] **Hreflang alternates**: Proper language switching
- [x] **x-default URLs**: Points to language-less canonical URLs
- [x] **Automatic generation**: Via `postbuild` hook

### 6. Data Management
- [x] **Centralized data**: `app/lib/data/cases.json` for case studies
- [x] **Dynamic imports**: Sitemap reads from data source
- [x] **Easy updates**: Add new cases by updating data file

## 🔧 Platform-Specific Instructions

### Netlify Deployment
1. Connect GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Configure redirects for Next.js App Router
5. Set up environment variables for API routes

### Vercel Deployment (Recommended)
1. Connect GitHub repository to Vercel
2. Framework preset: Next.js
3. The `vercel.json` file includes:
   - Next.js App Router routing for `/de/*`, `/en/*`, `/cases/*`
   - Security headers (HSTS, CSP, X-Frame-Options, etc.)
   - Caching headers for optimal performance
   - Sitemap caching configuration
   - API routes as serverless functions

### Manual Server Deployment
1. Build the project: `npm run build`
2. Copy `.next` directory to your server
3. Install dependencies: `npm ci --production`
4. Start the server: `npm start`
5. Configure reverse proxy (nginx/Apache) for Next.js

## Search Console & Domain

Aktuelle Anleitung: [docs/ops-search-console.md](docs/ops-search-console.md).

- Sitemap kommt von `app/sitemap.ts` (`/sitemap.xml`), nicht mehr von `sitemap.mjs`.
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` / `NEXT_PUBLIC_BING_SITE_VERIFICATION` setzen, sobald die Tokens vorliegen.
- `quantivaadvisory.com` muss in Vercel als Domain liegen, sonst bleibt die Canonical-Domain 404.

## 📊 SEO Considerations

### x-default Strategy
Current configuration uses language-less URLs as x-default:
- `https://quantivaadvisory.com/` (x-default)
- `https://quantivaadvisory.com/de/` (German)
- `https://quantivaadvisory.com/en/` (English)

**Alternative**: If you prefer `/de` as canonical:
```javascript
// In sitemap.mjs, change xDefault logic:
const xDefault = `${BASE_URL}/de${basePath}`;
```

### OG Images Strategy
- **Current**: Same OG images for all languages
- **Alternative**: Language-specific OG images
  - Update Helmet meta tags in each route
  - Use different image paths per language

### Content Updates
1. **Add new case study**:
   - Add to `app/lib/data/cases.json`
   - Sitemap will automatically include it
   - No manual sitemap updates needed

2. **Update existing content**:
   - Edit `app/lib/data/cases.json`
   - Rebuild: `npm run build`
   - Sitemap regenerates automatically

## 🚨 Important Notes

### Build Process
- Sitemap is generated automatically after each build
- No manual sitemap updates required
- Case studies are imported dynamically

### URL Structure
- All URLs include proper hreflang alternates
- Search engines can properly index multilingual content
- Clean URL structure: `/de/`, `/en/`, `/de/cases/`, etc.
- Next.js App Router handles routing automatically

### Performance
- Static assets cached for 1 year
- Gzip compression enabled
- Optimized bundle sizes

## 🔍 Testing Checklist

Before going live:
- [ ] Test all routes: `/`, `/de/`, `/en/`, `/cases`, `/de/cases`, `/en/cases`
- [ ] Test case detail pages: `/de/cases/btp-delivery`, etc.
- [ ] Verify sitemap: `https://quantivaadvisory.com/sitemap.xml`
- [ ] Check robots.txt: `https://quantivaadvisory.com/robots.txt`
- [ ] Test language switching
- [ ] Verify OG meta tags
- [ ] Test contact form functionality
- [ ] Check mobile responsiveness
- [ ] Validate HTML/CSS
- [ ] Test page load speeds

## 📈 Post-Deployment

1. **Submit sitemap to Google Search Console**
2. **Monitor Core Web Vitals**
3. **Set up analytics tracking**
4. **Configure error monitoring**
5. **Test contact form email delivery**
