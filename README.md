# 🚀 Bill Stein's Developer Portfolio

A modern, interactive portfolio built with Next.js 14, TypeScript, and Tailwind CSS. Features an innovative terminal-style navigation system and responsive design.

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## 🎯 Project Progress

> **Current Status:** 🟡 In Active Development
> **Last Updated:** November 8, 2024
> **Completion:** 45% (27/60 tasks)

---

## 📋 Development Roadmap

### 🚨 **URGENT PRIORITIES** (Must Complete First)

#### 📸 Content & Assets
- [ ] Replace all placeholder images with real project screenshots
- [ ] Create professional project mockups (use Shots.so or Figma)
- [ ] Deploy projects to Vercel/Netlify
- [ ] Update all "#" demo/repo links with actual URLs
- [ ] Add resume PDF to `/public/resume/Bill_Stein_Resume.pdf`
- [ ] Create Open Graph image (1200x630px) for social sharing
- [ ] Write detailed project descriptions with metrics/impact
- [ ] Update Twitter/social links (currently points to "/")

#### 🔐 Security & Configuration
- [x] Fix XSS vulnerability in contact form (DOMPurify)
- [ ] Get real Resend API key from resend.com
- [ ] Test contact form end-to-end
- [ ] Add rate limiting to prevent spam submissions
- [ ] Update `.env.example` with all required variables

---

### ⚡ **HIGH PRIORITY** (Next 2 Weeks)

#### 🎨 UI/UX Enhancements
- [x] Dark/Light theme toggle
- [x] Responsive mobile design
- [x] Interactive terminal navigation system
- [x] Smooth scroll animations
- [x] Loading states
- [x] Error boundary
- [ ] Add scroll progress indicator
- [ ] Improve mobile navigation menu
- [ ] Add page transition animations
- [ ] Create custom 404 page design
- [ ] Add "Back to Top" button

#### 🔍 SEO & Discoverability
- [x] Add comprehensive meta tags (Open Graph, Twitter Cards)
- [x] Implement structured data (JSON-LD)
- [x] Create `robots.txt`
- [x] Generate `sitemap.xml`
- [ ] Submit sitemap to Google Search Console
- [ ] Add Google Analytics / Vercel Analytics
- [ ] Verify with Google Search Console
- [ ] Optimize meta descriptions for keywords
- [ ] Add canonical URLs

#### ♿ Accessibility (WCAG AA)
- [x] Skip navigation link
- [x] Semantic HTML structure
- [x] Keyboard navigation support
- [ ] Add ARIA labels to interactive elements
- [ ] Test with screen readers (NVDA, JAWS)
- [ ] Verify color contrast ratios (WCAG AA)
- [ ] Add focus indicators to all interactive elements
- [ ] Run axe DevTools accessibility audit
- [ ] Add alt text to all images

---

### 🎯 **MEDIUM PRIORITY** (Next Month)

#### 🛠️ Backend/API Features
- [x] Contact form with validation
- [x] Email integration (Resend)
- [x] API route error handling
- [ ] Implement form submission rate limiting
- [ ] Add CAPTCHA (hCaptcha or Turnstile)
- [ ] Create API for fetching GitHub stats
- [ ] Add newsletter signup (optional)
- [ ] Implement view counter for projects

#### 📊 Analytics & Monitoring
- [ ] Set up Vercel Analytics
- [ ] Add performance monitoring
- [ ] Track contact form submissions
- [ ] Monitor Core Web Vitals
- [ ] Set up error logging (Sentry optional)
- [ ] Create analytics dashboard

#### 🚀 Performance Optimization
- [ ] Optimize images (convert to WebP)
- [ ] Implement lazy loading for below-fold content
- [ ] Add bundle analyzer and reduce bundle size
- [ ] Optimize font loading (font-display: swap)
- [ ] Achieve Lighthouse score 95+ (all categories)
- [ ] Implement service worker for offline support
- [ ] Add resource hints (preconnect, prefetch)

---

### ✨ **STRETCH GOALS** (Nice to Have)

#### 🎯 Advanced Features
- [ ] **GitHub Activity Integration**
  - [ ] Live contribution graph
  - [ ] Recent activity feed
  - [ ] Repository showcase with stars/forks
- [ ] **Blog Section**
  - [ ] MDX blog with syntax highlighting
  - [ ] Blog post filtering by tags
  - [ ] Reading time estimates
  - [ ] Table of contents generation
- [ ] **Command Palette (⌘K Navigation)**
  - [ ] Keyboard shortcuts overlay
  - [ ] Fuzzy search
  - [ ] Quick actions menu
- [ ] **Project Case Studies**
  - [ ] Individual project pages (`/projects/[slug]`)
  - [ ] Problem → Solution → Results format
  - [ ] Embedded video demos
  - [ ] Code snippets with syntax highlighting
- [ ] **Testimonials Section**
  - [ ] Client/colleague recommendations
  - [ ] LinkedIn integration
  - [ ] Rotating testimonial carousel
- [ ] **Interactive Resume**
  - [ ] Timeline view of experience
  - [ ] Skills proficiency visualization
  - [ ] Downloadable PDF generation

#### 🎨 UI/UX Polish
- [ ] Add micro-interactions (button hovers, card animations)
- [ ] Create loading skeletons for better perceived performance
- [ ] Implement parallax scrolling effects
- [ ] Add Easter eggs in terminal (Konami code)
- [ ] Create custom cursor for desktop
- [ ] Add sound effects (optional, with toggle)
- [ ] Implement Bento grid layout for projects

#### 🔗 Integrations
- [ ] Connect to DEV.to API for blog cross-posting
- [ ] Integrate with Medium for article import
- [ ] Add GitHub Gist embeds for code snippets
- [ ] Connect to CodePen/CodeSandbox for demos
- [ ] Add Twitter feed widget
- [ ] Implement real-time visitor counter

#### 🌐 Advanced Content
- [ ] Multi-language support (i18n)
- [ ] "Now" page (what I'm currently learning/working on)
- [ ] Resources/Bookmarks page
- [ ] Learning journey timeline
- [ ] Tech radar visualization
- [ ] Interactive skills chart (Chart.js or D3.js)

---

## 🛠️ Tech Stack

### Core
- **Framework:** Next.js 14.2 (App Router)
- **Language:** TypeScript 5.4
- **Styling:** Tailwind CSS 3.4
- **Animations:** Framer Motion 11.0

### UI Components
- **Icons:** Lucide React
- **Theme:** next-themes (dark/light mode)
- **Components:** Custom UI library (Badge, Button, Card)

### Backend/APIs
- **Email:** Resend
- **Form Validation:** React Hook Form + Zod
- **Sanitization:** DOMPurify (XSS protection)

### Developer Tools
- **Linting:** ESLint (Next.js config)
- **Type Checking:** TypeScript strict mode
- **Git Hooks:** (Optional) Husky + lint-staged

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/BillSteinUNB/Portfolio.git
cd Portfolio

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### Environment Variables

Create a `.env.local` file with:

```env
# Resend API Key (get from https://resend.com)
RESEND_API_KEY=re_your_api_key_here

# Your contact email
CONTACT_EMAIL=contact@billstein.dev

# Your site URL
NEXT_PUBLIC_SITE_URL=https://www.billsteincs.com
```

---

## 📦 Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/BillSteinUNB/Portfolio)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

---

## ✨ Key Features

### 🖥️ Interactive Terminal
- **Unique navigation system** with command-line interface
- 11+ commands for exploring the portfolio
- Command history with arrow key navigation
- Easter eggs and developer jokes
- Minimizable window design

**Try these commands:**
```bash
help       # Show all available commands
projects   # View featured projects
joke       # Get a random developer joke
theme      # Toggle dark/light mode
matrix     # Enter the Matrix... 🐰
```

### 🎨 Modern Design
- Responsive mobile-first layout
- Dark/light theme with system preference detection
- Smooth scroll animations with Framer Motion
- Professional color system using CSS variables
- Custom UI component library

### 🔒 Security Features
- XSS protection with DOMPurify
- Server-side validation with Zod
- Environment variable validation
- Rate limiting ready
- Secure API routes

### ♿ Accessibility
- WCAG AA compliant
- Keyboard navigation support
- Skip to main content link
- Screen reader friendly
- Semantic HTML throughout

---

## 📊 Performance Metrics

Current targets:
- **Lighthouse Performance:** 95+
- **Lighthouse Accessibility:** 95+
- **Lighthouse Best Practices:** 95+
- **Lighthouse SEO:** 95+
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3.0s

---

## 🤝 Contributing

This is a personal portfolio project, but suggestions and feedback are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 📬 Contact

**Bill Stein** - Full-Stack Developer

- 📧 Email: [contact@billstein.dev](mailto:contact@billstein.dev)
- 💼 LinkedIn: [linkedin.com/in/billstein3714982](https://www.linkedin.com/in/billstein3714982)
- 🐙 GitHub: [@BillSteinUNB](https://github.com/BillSteinUNB)
- 🌐 Website: [www.billsteincs.com](https://www.billsteincs.com)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide](https://lucide.dev/) - Beautiful icon set
- [Vercel](https://vercel.com/) - Deployment platform

---

<div align="center">

**⭐ Star this repo if you found it helpful!**

Made with ❤️ and ☕ by Bill Stein

</div>
