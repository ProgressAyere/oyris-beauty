# 💄 Oyris Beauty - Professional Makeup & Beauty Services

A modern, responsive Next.js website for Oyris Beauty, offering professional makeup and beauty services in Lagos, Nigeria. The website features a stunning portfolio, booking system with payment integration, and comprehensive service showcases.

![Next.js](https://img.shields.io/badge/Next.js-16.4.3-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=flat-square&logo=tailwind-css)

---

## ✨ Features

### 🎨 Core Pages
- **Homepage**: Split-screen video background with about section, transformations, portfolio preview, pricing cards, and FAQ
- **Services**: Dynamic service pages (Soft Glam, Event/Owambe, Photoshoot, Bridal) with video headers
- **Portfolio**: Image gallery with zoom modal and category filters
- **Pricing**: Transparent pricing with group discount promotions
- **Booking**: Multi-step booking form with payment flow
- **Transformations**: Before/after slider showcases
- **Reviews**: Customer testimonials
- **Terms of Service**: Booking policies and terms

### 💡 Key Functionality
- ✅ **Smart Booking System**
  - Multi-step form (3 steps: Info → Event Details → Payment)
  - Service pre-selection from query parameters (`?service=soft-glam`)
  - Automatic cost calculation (service + travel fees)
  - Input validation (name: alphabets only, phone: digits only)
  - 50% deposit requirement with bank account details
  - WhatsApp integration for receipt submission

- ✅ **Group Discounts**
  - Soft Glam: ₦1,500 off per person (3+ bookings)
  - Event/Photoshoot: ₦2,000 off per person (3+ bookings, outside Ojodu)

- ✅ **Dynamic Video Headers**
  - Service-specific videos that switch on navigation
  - Smooth transitions between services

- ✅ **Responsive Design**
  - Mobile-first approach
  - Touch-friendly navigation
  - Optimized images and videos
  - Collapsible mobile menu

### 🎨 Design System
- **Brand Colors**:
  - Pink: `#FF66C4`
  - Tan: `#C4A895`
  - Background: `#FAF7F5`
- **Typography**: Inter font family for clean, modern aesthetics
- **Components**: Reusable Header, Footer, ImageModal, TransformationSlider

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or higher
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/oyris-beauty.git
   cd oyris-beauty
   ```

2. **Navigate to frontend**
   ```bash
   cd frontend
   ```

3. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
oyris-beauty/
├── frontend/                   # Next.js application
│   ├── public/                # Static assets
│   │   ├── bridal/           # Bridal makeup images & videos
│   │   ├── birthday/         # Birthday/photoshoot images & videos
│   │   ├── everyday-look/    # Soft glam images & videos
│   │   ├── ceo/              # About/artist images
│   │   ├── home.mp4          # Homepage video
│   │   ├── logo1.png/svg     # Brand logos
│   │   └── logo2.png/svg
│   ├── src/
│   │   ├── app/              # App Router pages
│   │   │   ├── page.js       # Homepage
│   │   │   ├── layout.js     # Root layout
│   │   │   ├── globals.css   # Global styles
│   │   │   ├── book/         # Booking page
│   │   │   ├── services/     # Services page
│   │   │   ├── portfolio/    # Portfolio page
│   │   │   ├── pricing/      # Pricing page
│   │   │   ├── reviews/      # Reviews page
│   │   │   ├── terms/        # Terms of Service
│   │   │   └── transformations/ # Transformations page
│   │   ├── components/       # React components
│   │   │   ├── Header.js     # Navigation header
│   │   │   ├── Footer.js     # Footer with video background
│   │   │   ├── ImageModal.js # Image zoom modal
│   │   │   ├── LogoIntro.js  # Logo animation
│   │   │   ├── PageTransition.js # Page transitions
│   │   │   └── SiteChrome.js # Layout wrapper
│   │   └── lib/
│   │       └── scroll-lock.js # Scroll lock utility
│   ├── .gitignore            # Git ignore rules
│   ├── package.json          # Dependencies
│   ├── next.config.mjs       # Next.js configuration
│   ├── jsconfig.json         # JavaScript config
│   ├── eslint.config.mjs     # ESLint config
│   ├── vercel.json           # Vercel deployment config
│   ├── convert-logos.js      # Logo conversion script
│   └── convert-video.js      # Video conversion script
├── backend/                   # (Empty - for future use)
├── .gitignore                # Root gitignore
└── README.md                 # This file
```

---

## 🎯 Pages Overview

### Homepage (`/`)
- Video hero section with about content
- Meet the Artist section
- Transformations showcase with before/after sliders
- Portfolio preview (3 images + gallery modal)
- Pricing cards with service information
- FAQ accordion section
- Final CTA before footer

### Services (`/services?service=<service-name>`)
- Dynamic service pages based on query parameter
- Service-specific video headers
- Image gallery for each service
- Service descriptions and features
- Links to booking page with pre-selected service

**Available Services:**
- `soft-glam` - Natural, polished everyday makeup
- `event-owambe` - Bold celebration makeup with Gele
- `photoshoot` - Camera-ready studio makeup
- `bridal` - Complete bridal beauty package

### Booking (`/book?service=<service-name>`)
**Step 1: Your Info**
- Name (alphabets only validation)
- Phone number (digits only validation)

**Step 2: Event Details**
- Interactive calendar (blocks past dates)
- Service selection (pre-selected from query param)

**Step 3: Additional Details**
- Event area/location selection
- Number of faces
- Message/inspiration notes
- **Cost Breakdown Display:**
  - Service price
  - Travel fee (if applicable)
  - Total amount
- **Payment Information:**
  - 50% deposit requirement notice
  - Bank accounts (Palmpay & UBA)
  - WhatsApp button to send receipt

### Pricing (`/pricing`)
- Service pricing cards
- **Group Discount Section** (eye-catching gradient design)
  - Soft Glam: ₦1,500 off per person (3+ people)
  - Event/Photoshoot: ₦2,000 off per person (3+ people, outside Ojodu)
- How pricing works explanation
- All services comparison table

### Portfolio (`/portfolio`)
- Filterable image gallery (All, Bridal, Soft Glam, Event, Photoshoot)
- Click to zoom with ImageModal
- Smooth animations and transitions

### Transformations (`/transformations`)
- Full-screen before/after sliders
- Touch and mouse drag support
- Multiple transformation showcases

### Reviews (`/reviews`)
- Customer testimonials
- Star ratings
- Service-specific feedback

### Terms (`/terms`)
- Booking deposit policy (50% non-refundable)
- Rescheduling policy (48-hour notice)
- Cancellation policy (72-hour full refund)
- General terms and conditions

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: [Next.js 16.4.3](https://nextjs.org/) (App Router)
- **UI Library**: [React 18](https://react.dev/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Image Optimization**: Next.js Image component
- **Font**: [Inter](https://fonts.google.com/specimen/Inter) via next/font

### Deployment
- **Hosting**: [Vercel](https://vercel.com/)
- **Version Control**: Git & GitHub

### Development Tools
- **Linting**: ESLint with Next.js config
- **Video Processing**: ffmpeg (for video conversion)
- **Image Processing**: Sharp (for image optimization)

---

## 🔧 Configuration Files

### `next.config.mjs`
- Image optimization settings
- Remote patterns for external images
- Build configuration

### `vercel.json`
- Deployment configuration for Vercel
- Build and routing settings

### `.gitignore`
- Excludes `node_modules`, `.next`, build artifacts
- Excludes environment files and OS files

---

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

All pages are fully responsive with mobile-first design approach.

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - **IMPORTANT**: In "Configure Project" settings:
     - Set **Root Directory** to `frontend`
     - Click "Edit" next to Root Directory
     - Select `frontend` from the dropdown
     - Click "Continue"
   - Framework Preset: Next.js (auto-detected)
   - Click "Deploy"

3. **Custom Domain** (Optional)
   - Add your custom domain in Vercel dashboard
   - Update DNS records as instructed
   - SSL is automatically configured

#### Important Vercel Settings

**Root Directory Configuration:**
- ⚠️ **You MUST set the Root Directory to `frontend`**
- This tells Vercel where your Next.js app is located
- Without this, the build will fail

**Build Settings (Auto-detected):**
- Framework: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

---

## 🎨 Brand Guidelines

### Colors
```css
--pink: #FF66C4;        /* Primary brand color */
--tan: #C4A895;         /* Secondary brand color */
--beige: #FAF7F5;       /* Background */
--dark-tan: #B5917F;    /* Darker tan for hover states */
```

### Typography
- **Headings**: Serif font (default system serif)
- **Body**: Inter (Google Fonts)
- **Font Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

---

## 🔗 Key Links

### Contact Information
- **WhatsApp**: [+234 808 929 2454](https://wa.me/2348089292454)
- **Phone**: +234 703 869 9245
- **Email**: priscillaoyen@gmail.com

### Bank Accounts (50% Deposit)
- **Palmpay**: 8183634915 - Priscilla Ayere
- **UBA**: 2124391857 - Priscilla Ayere

### Service Areas
- Ojodu / Alagbole / Akute (No travel fee)
- Ajah / Sangotedo / Chevron (+₦20,000 travel)
- Ikeja / GRA / Magodo (+₦15,000 travel)
- Yaba / Surulere / Gbagada (+₦15,000 travel)
- Festac / Amuwo / Oshodi (+₦15,000 travel)
- Lekki / VI / Ikoyi (+₦20,000 travel)
- Outside Lagos (Quote on request)

---

## 📝 Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint

# Utilities
node convert-video.js    # Convert videos to MP4
node convert-logos.js    # Convert logos to SVG
```

---

## 🤝 Contributing

This is a private project for Oyris Beauty. For any suggestions or improvements, please contact the development team.

---

## 📄 License

All rights reserved © Oyris Beauty 2024

---

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting platform
- All clients who contributed to the portfolio images

---

## 📞 Support

For technical issues or questions:
- Create an issue in the repository
- Contact the development team
- Email: priscillaoyen@gmail.com

---

**Built by Progress Ayere with ❤️ for Oyris Beauty**
