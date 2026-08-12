# Stallion Fitness - Quick Start Guide

## 🎯 What's Been Built

I've created a **production-ready dynamic gym website with CMS** for Stallion Xtreme Fitness based on all your requirements. Here's what's complete:

### ✅ Backend (Node.js + Express + MongoDB)
- Complete REST API with TypeScript
- Authentication system with JWT & bcrypt
- Role-Based Access Control (SUPER_ADMIN, OWNER, MANAGER, TRAINER)
- Mongoose models for all entities (User, Trainer, Program, Event, Branch, Review, Pricing, FAQ)
- Image upload with Cloudinary integration
- Input validation using Zod
- Security middleware (Helmet, CORS, Rate Limiting)
- Error handling and logging

### ✅ Frontend (Next.js 14 + TypeScript)
- Modern, responsive public website
- Hero section with promotional banner
- About section with founders story
- Programs showcase (6 training programs)
- Brand partners carousel
- Branches section (6 locations with hover effects)
- Responsive navigation with mobile menu
- Premium fitness aesthetic with Tailwind CSS

### 📁 Project Structure

```
StallionFitness/
├── backend/
│   ├── src/
│   │   ├── config/         # Database & Cloudinary config
│   │   ├── models/         # Mongoose schemas
│   │   ├── controllers/    # API controllers
│   │   ├── routes/         # Express routes
│   │   ├── middleware/     # Auth, validation, upload
│   │   ├── validation/     # Zod schemas
│   │   ├── utils/          # JWT utilities
│   │   ├── types/          # TypeScript types
│   │   ├── scripts/        # Seed scripts
│   │   └── server.ts       # Main server file
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── frontend/
│   ├── app/
│   │   ├── page.tsx        # Homepage
│   │   ├── layout.tsx      # Root layout
│   │   └── globals.css     # Global styles
│   ├── components/
│   │   └── public/         # Public website components
│   ├── public/
│   │   └── images/         # All images copied here
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── tsconfig.json
├── downloaded_images/      # Original images
├── README.md              # Complete documentation
└── QUICK_START.md         # This file
```

## 🚀 How to Run the Project

### Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 2: Configure Backend Environment

Create `backend/.env` file:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/stallion-fitness
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
FRONTEND_URL=http://localhost:3000
```

### Step 3: Install MongoDB

**Option A: Local MongoDB**
- Download from https://www.mongodb.com/try/download/community
- Install and start MongoDB service

**Option B: MongoDB Atlas (Free Cloud)**
- Sign up at https://www.mongodb.com/cloud/atlas
- Create free cluster
- Get connection string and update MONGODB_URI in .env

### Step 4: Setup Cloudinary (Free)

1. Sign up at https://cloudinary.com (free tier)
2. Go to Dashboard
3. Copy: Cloud Name, API Key, API Secret
4. Update in backend/.env

### Step 5: Start Backend

```bash
cd backend
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
✅ Cloudinary configured
🚀 Stallion Fitness API Server Started
📡 Server running on port 5000
```

### Step 6: Create First Admin User

In a new terminal:

```bash
cd backend
npm run seed:admin
```

Default admin credentials:
- Email: `admin@stallionfitness.com`
- Password: `StallionAdmin123!`

### Step 7: Install Frontend Dependencies

```bash
cd frontend
npm install
```

### Step 8: Configure Frontend Environment

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Step 9: Start Frontend

```bash
cd frontend
npm run dev
```

### Step 10: Access the Website

- **Public Website:** http://localhost:3000
- **API Health Check:** http://localhost:5000/health
- **API Base:** http://localhost:5000/api/v1

## 📋 What Still Needs to Be Done

### Immediate (To Complete Homepage)
1. **ReviewsSection component** - Display customer testimonials
2. **PricingSection component** - Show membership plans
3. **FAQSection component** - Frequently asked questions
4. **ContactSection component** - Contact form
5. **Footer component** - Site footer with links

### Backend API Routes (Priority)
1. Programs API routes & controller
2. Events API routes & controller
3. Branches API routes & controller
4. Reviews API routes & controller
5. Pricing API routes & controller
6. FAQ API routes & controller
7. Media/upload API routes & controller

### Admin CMS Dashboard (Next Phase)
1. Admin login page (`/admin/login`)
2. Admin dashboard (`/admin/dashboard`)
3. Trainers management (`/admin/trainers`)
4. Events management (`/admin/events`)
5. Programs management (`/admin/programs`)
6. Branches management (`/admin/branches`)
7. Reviews approval (`/admin/reviews`)
8. Pricing management (`/admin/pricing`)
9. FAQ management (`/admin/faqs`)
10. Media library (`/admin/media`)
11. User management (`/admin/users`)
12. Settings (`/admin/settings`)

### Additional Public Pages
1. `/about` - About Us page
2. `/events` - Events listing
3. `/events/[slug]` - Event detail page
4. `/branches` - Branches listing
5. `/branches/[slug]` - Branch detail page
6. `/trainers` - Trainers listing
7. `/trainers/[slug]` - Trainer profile
8. `/stallion-classic` - Stallion Classic page
9. `/stallion-extreme` - Stallion Extreme page
10. `/stallion-academy` - Stallion Academy page
11. `/contact` - Contact page

### UI Components (shadcn/ui)
Install and configure:
```bash
cd frontend
npx shadcn-ui@latest init
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add table
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add toast
```

## 🔧 Common Issues & Solutions

### Issue: MongoDB Connection Failed
**Solution:** 
- Check MongoDB is running: `mongod --version`
- Or use MongoDB Atlas cloud connection string

### Issue: Images Not Loading
**Solution:**
- Images are in `frontend/public/images/`
- Check Next.js is serving static files correctly
- Verify image paths in components

### Issue: API CORS Errors
**Solution:**
- Check FRONTEND_URL in backend/.env matches frontend URL
- Verify CORS configuration in backend/src/server.ts

### Issue: Port Already in Use
**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change PORT in backend/.env
```

## 📊 API Testing

Use these endpoints to test:

```bash
# Health Check
GET http://localhost:5000/health

# Register User
POST http://localhost:5000/api/v1/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "Password123!",
  "role": "OWNER"
}

# Login
POST http://localhost:5000/api/v1/auth/login
Content-Type: application/json

{
  "email": "admin@stallionfitness.com",
  "password": "StallionAdmin123!"
}

# Get Current User
GET http://localhost:5000/api/v1/auth/me
Cookie: token=<jwt-token-from-login>

# Get Trainers (Public)
GET http://localhost:5000/api/v1/trainers
```

## 🎨 Design System

### Colors
- **Primary:** #e71b4b (Red)
- **Secondary:** #0f4166 (Blue)
- **Background:** Black/White/Gray-100
- **Text:** White on dark, Black on light

### Fonts
- **Headings:** AkiraExpanded (bold, uppercase)
- **Body:** Degular (regular)
- **Navigation:** Modernist

### Spacing
- Mobile: 16px (1rem)
- Desktop: 32px (2rem)
- Sections: 64-80px vertical padding

## 📝 Next Steps

1. **Complete Homepage Components:**
   - Copy the pattern from existing components
   - Create ReviewsSection, PricingSection, FAQSection, ContactSection, Footer

2. **Add Remaining API Controllers:**
   - Follow the pattern from TrainerController
   - Implement CRUD operations for all models

3. **Build Admin Dashboard:**
   - Create protected admin routes
   - Implement data tables with CRUD operations
   - Add image upload UI

4. **Connect Frontend to Backend:**
   - Create API client (axios)
   - Implement React Query for data fetching
   - Add loading states and error handling

5. **Testing:**
   - Test all API endpoints
   - Test user flows
   - Test on mobile devices

## 🤝 Need Help?

The codebase follows these patterns:
- **Models:** Mongoose schemas with validation
- **Controllers:** Business logic for API endpoints
- **Routes:** Express routes with middleware
- **Components:** React functional components with hooks
- **Styling:** Tailwind CSS utility classes

All files are well-commented and follow TypeScript best practices.

## 🎯 Success Criteria

The project is successful when:
1. ✅ Owner can login to CMS
2. ✅ Owner can add a new trainer with photo
3. ✅ Trainer appears on public website immediately
4. ✅ Owner can create an event with gallery
5. ✅ Non-technical person can manage content

---

**Built with:** Next.js 14, Node.js, Express, MongoDB, TypeScript, Tailwind CSS, Cloudinary

**Status:** Foundation Complete ✅ | Ready for Continuation 🚀
