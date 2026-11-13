# Oyris Beauty - Deployment Guide

## ✅ Pre-Deployment Checklist Completed

All files are properly configured and ready for deployment:

- ✅ Video switching bug fixed (services page)
- ✅ .gitignore files configured (root and frontend)
- ✅ vercel.json configured for monorepo deployment
- ✅ All changes committed to git
- ✅ Project structure optimized

---

## 📦 Step 1: Push to GitHub

### Create a new repository on GitHub:
1. Go to https://github.com/new
2. Name your repository (e.g., `oyris-beauty`)
3. Keep it **Public** or **Private** (your choice)
4. **DO NOT** initialize with README, .gitignore, or license
5. Click "Create repository"

### Push your code:
```bash
cd "c:\Users\USER\Desktop\oyrisbeauty\oyris-beauty"

# Add the GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/oyris-beauty.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## 🚀 Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel**: https://vercel.com/
2. **Sign in** with your GitHub account
3. **Import Project**:
   - Click "Add New..." → "Project"
   - Select your `oyris-beauty` repository
4. **Configure Project**:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend` (IMPORTANT!)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)
5. **Environment Variables**: None needed for now
6. **Deploy**: Click "Deploy"
7. Wait 2-3 minutes for deployment to complete
8. Your site will be live at: `https://your-project-name.vercel.app`

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from project root)
cd "c:\Users\USER\Desktop\oyrisbeauty\oyris-beauty"
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Choose your account
# - Link to existing project? No
# - What's your project's name? oyris-beauty
# - In which directory is your code located? frontend
# - Want to modify settings? No

# Deploy to production
vercel --prod
```

---

## 🔧 Important Vercel Settings

When deploying, make sure:

1. **Root Directory**: Set to `frontend`
2. **Framework**: Next.js (auto-detected)
3. **Node Version**: 18.x or higher (Vercel handles this)
4. **Build Settings**:
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

---

## 📁 Project Structure (Monorepo)

```
oyris-beauty/
├── frontend/               # Next.js application
│   ├── public/            # Static assets (images, videos)
│   ├── src/
│   │   ├── app/           # App router pages
│   │   └── components/    # React components
│   ├── .gitignore         # Frontend-specific ignores
│   ├── package.json       # Dependencies
│   └── next.config.mjs    # Next.js config
├── backend/               # (Empty - for future use)
├── .gitignore             # Root gitignore
├── vercel.json            # Vercel deployment config
├── README.md              # Project documentation
└── DEPLOYMENT.md          # This file
```

---

## 🌐 Custom Domain (Optional)

After deployment, you can add a custom domain:

1. Go to your project in Vercel Dashboard
2. Click "Settings" → "Domains"
3. Add your domain (e.g., `oyrisbeauty.com`)
4. Follow Vercel's instructions to update DNS records
5. Vercel automatically handles SSL certificates

---

## 🔄 Future Updates

To push updates:

```bash
cd "c:\Users\USER\Desktop\oyrisbeauty\oyris-beauty"

# Make your changes, then:
git add .
git commit -m "Your commit message"
git push

# Vercel will automatically deploy the new version
```

---

## 🐛 Troubleshooting

### Video files are too large?
- Compress videos further using ffmpeg
- Consider hosting large videos on a CDN (Cloudflare R2, AWS S3)
- Update video sources to CDN URLs

### Build fails on Vercel?
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `frontend/package.json`
- Verify Node version compatibility

### Images not loading?
- All images must be in `frontend/public/`
- Reference them without `/public` prefix (e.g., `/logo1.png`)
- Check file names match exactly (case-sensitive)

---

## 📞 Support

For deployment issues:
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- GitHub Docs: https://docs.github.com

---

## ✨ What's Deployed

Your Oyris Beauty website includes:
- 🏠 Homepage with video background and about section
- 💄 Services page (Soft Glam, Event/Owambe, Photoshoot, Bridal)
- 💰 Pricing page with group discount promotions
- 📸 Portfolio gallery with image modal
- ✨ Transformations page with before/after sliders
- 📝 Booking page with payment flow and 50% deposit
- ⭐ Reviews page
- 📄 Terms of Service page
- 🎨 All pages are mobile-responsive and optimized

---

**Ready to deploy? Follow Step 1 above to get started! 🚀**
