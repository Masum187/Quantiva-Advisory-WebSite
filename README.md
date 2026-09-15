# Quantiva Advisory - Professional SAP & Cloud Consulting

Visit our website: [Quantiva Advisory](https://quantivaadvisory.com)

## Quick Start
```bash
npm install
npm run dev
```

See full documentation below.
# Quantiva Advisory Website

A modern, responsive website for Quantiva Advisory with internationalization (German/English), SEO optimization, case studies, and advanced animations.

## Features

- 🌐 **Bilingual Support**: German and English language switching with URL prefixes (/de/, /en/)
- 📱 **Responsive Design**: Mobile-first approach with Tailwind CSS
- 🔍 **Advanced SEO**: Meta tags, OpenGraph, Twitter Cards, JSON-LD structured data
- 🎬 **Smooth Animations**: Framer Motion powered animations and transitions
- 📄 **Case Studies**: Dedicated pages for case studies and service offerings
- 🧭 **Smart Navigation**: ScrollSpy navigation with active state indicators
- 🎨 **Modern UI**: Clean, professional design with parallax effects
- ⚡ **Fast Loading**: Optimized React build with code splitting

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **SEO**: Next.js built-in SEO features
- **Backend**: Next.js API Routes
- **Build Tool**: Next.js (Turbopack)

## Getting Started

### Prerequisites

- Node.js 20 or higher (see `engines` in package.json)
- npm or yarn

Betriebs-Playbooks: [Search Console](docs/ops-search-console.md) · [Contentful](docs/ops-content.md) · [Calendly](docs/ops-calendly.md) · [HRIS](docs/ops-hris.md)

### Installation

1. Clone the repository or navigate to the project directory:
   ```bash
   cd Quantiva-Advisory
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Local API Server (optional)

This project deploys as a **Next.js application on Vercel** with serverless API routes.

Run the development server:

```bash
npm run dev
```

This starts:
- Next.js dev server on port 3000
- Hot reloading and fast refresh enabled

### Building for Production

1. **Automatic sitemap generation**: The sitemap is automatically generated after each build:
   ```bash
   npm run build
   ```

2. **Manual sitemap generation** (legacy helper; production uses `app/sitemap.ts`):
   ```bash
   npm run generate:sitemap
   ```

3. Start the production server:
   ```bash
   npm start
   ```

The production build will be served on port 3000 (or the PORT environment variable).

## Project Structure

```
quantiva-Advisory/
├── app/                      # Next.js App Router
│   ├── de/                  # German pages
│   ├── en/                  # English pages
│   ├── api/                 # API routes (serverless functions)
│   │   ├── contact/         # Contact form endpoint
│   │   ├── ai-test/         # AI testing endpoint
│   │   └── video-generation/ # Video generation API
│   ├── components/          # React components
│   │   ├── pages/           # Page-specific components
│   │   └── ui/              # Reusable UI components
│   ├── lib/                 # Utilities and data
│   │   └── data/            # JSON data files
│   │       ├── cases.json   # Case studies data
│   │       ├── taxonomy.json # Categories and industries
│   │       └── content.json # Website content
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   ├── error.tsx            # Error page
│   ├── not-found.tsx        # 404 page
│   └── global-error.tsx     # Global error boundary
├── public/                  # Static files
│   ├── sitemap.xml         # Generated sitemap
│   ├── robots.txt          # SEO robots file
│   └── assets/             # Images and media
├── scripts/                # Build and utility scripts
│   ├── generate-og.mjs     # OG image generation
│   ├── validate-cases.mjs  # Case studies validation
│   └── report-cases.mjs    # Case studies reporting
├── sitemap.mjs             # Dynamic sitemap generation
├── vercel.json             # Vercel deployment configuration
├── next.config.js          # Next.js configuration
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## Pages & Routes

- `/` or `/de/` or `/en/` - Main homepage
- `/cases` or `/de/cases` or `/en/cases` - Case studies overview
- `/cases/:slug` or `/de/cases/:slug` or `/en/cases/:slug` - Individual case study details

## API Endpoints

> **Note**: This is a Next.js project deployed on Vercel. API routes are serverless functions that work in production.

### POST /api/contact

Handles contact form submissions.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'm interested in your services.",
  "lang": "en"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for your message. We will get back to you soon!"
}
```

## OG Assets & Favicons Setup

### Required Files in `/public/`

The following files need to be created with actual assets (currently placeholders):

```
/public/
├─ favicon.ico                    // 32×32, ICO format
├─ apple-touch-icon.png           // 180×180, PNG format
├─ icon-192.png                   // PWA-Icon 192×192, PNG
├─ icon-512.png                   // PWA-Icon 512×512, PNG
├─ safari-pinned-tab.svg          // monochrome SVG for macOS Safari
├─ site.webmanifest               // PWA manifest (✅ created)
├─ browserconfig.xml              // for old Edge/IE Tiles (✅ created)
├─ assets/
│    ├─ og-default.jpg           // 1200×630 (1.91:1) - Homepage OG
│    ├─ og-cases.jpg             // 1200×630 - Cases page OG
│    └─ cases/
│         ├─ btp-hero.jpg       // Case-specific OG images
│         ├─ data-hero.jpg
│         └─ integration-hero.jpg
└─ robots.txt (✅ created)
```

### OG Image Specifications

- **Size**: 1200×630 px (minimum 600×315)
- **Format**: JPEG with 80–85% quality
- **Content**: Important elements in central 80% area
- **No transparency**: Avoid PNG with transparency

### PWA Configuration

The `site.webmanifest` includes:
- App name: "Quantiva Advisory"
- Theme color: `#0f766e` (teal)
- Icons: 192×192 and 512×512
- Display mode: standalone

### Centralized Data Management

The website uses a centralized JSON data source for all case studies:

1. **Data Source**: `app/lib/data/cases.json` (✅ created)
2. **Features**:
   - Single source of truth for all case data
   - Bilingual content (German/English)
   - Complete case details (goals, solutions, results, tech stack)
   - Used by React components and build scripts

3. **Data Structure**:
   ```json
   {
     "slug": "btp-delivery",
     "titleDe": "BTP Delivery in 12 Wochen",
     "titleEn": "BTP Delivery in 12 Weeks",
     "heroImage": "/assets/cases/btp-hero.jpg",
     "goalsDe": ["Schnellere Deployments"],
     "tech": ["SAP BTP", "GitHub Actions"]
   }
   ```

### Data Validation System

The website includes a comprehensive validation system for case data:

1. **Validation Script**: `scripts/validate-cases.mjs` (✅ created)
2. **Features**:
   - JSON Schema validation with AJV
   - Custom business logic checks
   - Asset file existence validation
   - Strict mode for production builds
   - CLI flag support (`--strict`)

3. **Usage**:
   ```bash
   # Soft validation (warnings allowed)
   npm run validate:cases
   
   # Strict validation (errors fail build)
   npm run validate:cases:strict

   # Current venture portfolio (projects.ts)
   npm run validate:ventures
   npm run validate:ventures:strict
   ```

4. **Validation Rules**:
   - Unique slugs across all cases
   - Required titles in at least one language
   - Valid file paths for images/videos
   - Proper quote structure
   - Asset file existence (strict mode)

5. **Build Integration**:
   - Automatic strict validation in `postbuild`
   - Build fails if validation errors found
   - GitHub Actions workflow for CI validation

### Terminal Dashboard & Reporting

The website includes a comprehensive reporting system with taxonomy validation:

1. **Terminal Dashboard**: `scripts/report-cases.mjs` (✅ created)
2. **Features**:
   - Colorized terminal table with case status
   - Asset existence validation (Hero, OG, Media)
   - Bilingual content verification
   - **Taxonomy whitelist validation** (Categories & Industries)
   - **Distribution statistics** for categories and industries
   - Markdown export for PR comments
   - OK/WARN status counting

3. **Usage**:
   ```bash
   npm run report:cases
   ```

4. **Output**:
   - Terminal table with colorized status
   - **Distribution statistics** for categories and industries
   - **Invalid taxonomy values** marked with `(!)` in red
   - Markdown report: `reports/cases-report.md`
   - Status summary (OK/WARN counts)

5. **GitHub Actions Integration**:
   - Automatic PR comments with case reports
   - Sticky comments (updates existing, no spam)
   - Runs after build and validation

### Taxonomy Management

The website includes a centralized taxonomy system for consistent categorization:

1. **Taxonomy Configuration**: `app/lib/data/taxonomy.json` (✅ created)
2. **Features**:
   - **Whitelist validation** for categories and industries
   - **Case-sensitive** validation for consistency
   - **Soft validation** (warnings) vs **strict validation** (errors)
   - **Distribution tracking** in reports

3. **Configuration**:
   ```json
   {
     "categories": ["Cloud", "Data", "Daten", "Integration", "Security", "Quality", "Enablement"],
     "industries": ["Pharma", "Healthcare", "Logistics", "Logistik", "Manufacturing", "Retail", "Finance", "Public"]
   }
   ```

4. **Validation Behavior**:
   - **Soft mode** (`npm run validate:cases`): Shows warnings for invalid taxonomy
   - **Strict mode** (`npm run validate:cases:strict`): Fails build on invalid taxonomy
   - **Build integration**: Strict validation runs in `postbuild` script

5. **Report Integration**:
   - **Invalid values** marked with `(!)` in terminal output
   - **Distribution statistics** show usage counts
   - **Whitelist reference** included in markdown reports

### Admin Dashboard

The website includes a comprehensive admin dashboard for case management:

1. **Admin Dashboard**: `app/components/AdminDashboard.tsx` (✅ created)
2. **Features**:
   - **Visual case management** with data grid
   - **Real-time validation** with error highlighting
   - **Import/Export** JSON functionality
   - **Bulk operations** (select, delete multiple cases)
   - **Distribution charts** for categories and industries
   - **Dark/Light theme** support
   - **Responsive design** for mobile and desktop

3. **Access**:
   - **URL**: `/admin` (no language prefix required)
   - **Features**: Full CRUD operations for case studies
   - **Validation**: Real-time validation with detailed error messages
   - **Data persistence**: Local storage for demo data
   - **Next.js Integration**: Uses App Router and API routes

4. **UI Components**:
   - **Data Grid**: Sortable, filterable table with case information
   - **Drawer Editor**: Slide-out panel for editing cases
   - **KPI Cards**: Statistics overview (total cases, filtered, selected)
   - **Charts**: Bar chart showing category distribution
   - **Search & Filters**: Real-time search and taxonomy filtering

5. **Validation Features**:
   - **Live validation** during editing
   - **Taxonomy whitelist** enforcement
   - **File path validation** for images and videos
   - **Required field** validation
   - **Error tooltips** with detailed messages

### Automated OG Image Generation

The website includes an automated OG image generation system:

1. **Script**: `scripts/generate-og.mjs` (✅ created)
2. **Features**:
   - Reads case data from JSON source
   - Generates professional OG images for each case study
   - Uses hero images when available, skips invalid files gracefully
   - Includes Quantiva branding badge
   - Optimized for 1200×630 social media format
   - Automatic generation during build process

3. **Usage**:
   ```bash
   npm run generate:og
   ```

4. **Generated Files**:
   - `public/assets/og/btp-delivery.jpg`
   - `public/assets/og/data-quality.jpg`
   - `public/assets/og/api-first.jpg`

### Dynamic OG Images (Optional)

For dynamic OG image generation on Vercel:

1. **API Route**: `/api/og.ts` (✅ created)
2. **Usage**: Replace static images with dynamic URLs:
   ```typescript
   const dynOg = `${ORIGIN}/api/og?title=${encodeURIComponent(pageTitleText)}`;
   <meta property="og:image" content={dynOg} />
   ```

### Testing Checklist

1. **HTML Head Validation**:
   - [ ] `<link rel="icon">` present
   - [ ] `<link rel="apple-touch-icon">` present
   - [ ] `<link rel="manifest">` present
   - [ ] `<meta name="theme-color">` set

2. **Social Media Testing**:
   - [ ] Facebook Sharing Debugger
   - [ ] Twitter Card Validator
   - [ ] LinkedIn Post Inspector

3. **URLs to Test**:
   - [ ] `https://quantivaadvisory.com/` (homepage)
   - [ ] `https://quantivaadvisory.com/de/` (German)
   - [ ] `https://quantivaadvisory.com/en/` (English)
   - [ ] `https://quantivaadvisory.com/de/cases` (cases page)
   - [ ] `https://quantivaadvisory.com/de/cases/btp-delivery` (case detail)

## SEO & Sitemap Management

### Sitemap Generation

The website includes an advanced sitemap generator that creates a comprehensive `sitemap.xml` file with:

- **Clean Structure**: Only localized URLs (`/de/`, `/en/`) with proper hreflang alternates
- **SEO Optimized**: Each URL includes all language alternatives and x-default
- **Efficient**: 10 URLs total (2 static pages + 3 case studies × 2 languages)
- **Automatic**: Generated after each build via `postbuild` hook
- **Configurable**: Easy to add new pages or case studies

**Automatic Generation**: The sitemap is automatically generated after each build via the `postbuild` hook.

**Manual Generation**:
```bash
npm run generate:sitemap
# or
npm run sitemap
```

### Updating Case Studies

When adding new case studies:

1. Add the case data to `app/lib/data/cases.json`
2. The sitemap generator automatically reads from the JSON file
3. Regenerate the sitemap: `npm run generate:sitemap`

### SEO Configuration

- **IMPORTANT**: Update `BASE_URL` in `sitemap.mjs` to your production domain:
  ```javascript
  const BASE_URL = "https://quantivaadvisory.com"; // Replace with your actual domain
  ```
- Modify meta tags in the Helmet components
- Update structured data (JSON-LD) as needed

## Customization

### Updating Content

All text content is stored in the `T` object at the top of `QuantivaWebsite.tsx`. You can easily modify:

- Company information
- Service descriptions
- Contact details
- SEO metadata

### Styling

The website uses Tailwind CSS for styling. You can customize:

- Colors in `tailwind.config.js`
- Component styles directly in the JSX
- Responsive breakpoints

### Career Form URL

Update the `CAREER_FORM_URL` constant to point to your actual career application form (Google Forms, Typeform, etc.).

## Deployment

### Automated Deployment with GitHub Actions

The project includes GitHub Actions workflows for automated building and deployment:

1. **Basic Build Workflow** (`.github/workflows/build.yml`):
   - Runs on every push
   - Builds the project with automatic sitemap generation
   - Verifies build output

2. **Production Deployment** (`.github/workflows/deploy.yml`):
   - Runs on pushes to `main` branch
   - Includes deployment options for Vercel, Netlify, and GitHub Pages
   - Uncomment the deployment method you prefer

### Manual Deployment

Build manually:
```bash
npm run build
# Deploy to your preferred platform (Vercel, Netlify, etc.)
```

### Deployment Platforms

#### Vercel
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Next.js app and deploy it
3. The sitemap will be automatically generated on each deployment
4. API routes work as serverless functions

#### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. The sitemap will be automatically generated on each build
5. Configure redirects for Next.js routing

#### GitHub Pages
1. Uncomment the GitHub Pages section in `.github/workflows/deploy.yml`
2. Push to `main` branch to trigger deployment
3. Enable GitHub Pages in repository settings

#### Heroku
1. Create a Heroku app
2. Set the buildpack to Node.js
3. Deploy:
   ```bash
   git push heroku main
   ```

## Environment Variables

- `PORT`: Server port (default: 3000)
- `NEXT_PUBLIC_BASE_URL`: Base URL for the application
- `NEXT_PUBLIC_ANALYTICS_ID`: Google Analytics ID (optional)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary to Quantiva Advisory.

## Contact

For questions or support, contact:
- Email: info@quantiva-advisory.com
