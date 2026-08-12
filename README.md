# Stallion Xtreme Fitness - Dynamic Website + CMS

A modern, full-stack gym management platform with a public-facing website and comprehensive CMS dashboard.

## 🏗️ Architecture

```
Stallion/
├── frontend/          # Next.js public website + Admin CMS
├── backend/           # Node.js + Express API
├── shared/            # Shared types and utilities
└── docs/              # Documentation
```

## 🚀 Technology Stack

### Frontend
- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **State Management:** React Context + Server Components
- **Image Optimization:** Next.js Image with Cloudinary

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT + bcrypt
- **Validation:** Zod
- **File Upload:** Multer + Cloudinary
- **API:** RESTful

### Infrastructure
- **Image Storage:** Cloudinary
- **Database:** MongoDB Atlas
- **Authentication:** JWT-based with httpOnly cookies
- **Security:** Helmet, CORS, Rate Limiting

## 📋 Features

### Public Website
- Hero section with dynamic content
- About Stallion and founders
- Training programs showcase
- Brand partners carousel
- Branch locator with 6 locations
- Customer reviews
- Pricing plans
- FAQ section
- Contact form
- Responsive navigation

### Admin CMS Dashboard (`/admin`)
- **Dashboard:** Analytics and overview
- **Trainers:** Full CRUD with image upload
- **Programs:** Manage training programs
- **Events:** Event management with galleries
- **Branches:** Location management
- **Reviews:** Approve/manage customer reviews
- **Pricing:** Dynamic pricing plans
- **FAQ:** Question & answer management
- **Media Library:** Centralized image management
- **Users:** Admin user management
- **Settings:** Site configuration
- **Audit Logs:** Track all changes

### Security Features
- Role-Based Access Control (SUPER_ADMIN, OWNER, MANAGER, TRAINER)
- Secure password hashing (bcrypt)
- JWT authentication with httpOnly cookies
- Input validation and sanitization
- Rate limiting on sensitive endpoints
- CORS configuration
- Secure file upload validation
- SQL injection prevention
- XSS protection

## 🔐 User Roles

- **SUPER_ADMIN:** Full system access
- **OWNER:** Manage all content, trainers, events, branches
- **MANAGER:** Limited content management
- **TRAINER:** View/edit own profile and assigned content

## 🚦 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Cloudinary account
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd StallionFitness
```

2. **Install dependencies**
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. **Environment Setup**

Create `.env` files in both frontend and backend directories:

**Backend `.env`:**
```env
# Server
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/stallion-fitness

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# CORS
FRONTEND_URL=http://localhost:3000
```

**Frontend `.env.local`:**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. **Database Setup**

The database will be auto-initialized with indexes when you first run the backend.

5. **Create First Admin User**

After starting the backend, use the seed script or create manually:

```bash
cd backend
npm run seed:admin
```

Or use the API endpoint:
```bash
POST http://localhost:5000/api/v1/auth/register
{
  "name": "Admin User",
  "email": "admin@stallionfitness.com",
  "password": "ChangeThisPassword123!",
  "role": "SUPER_ADMIN"
}
```

### Running the Application

**Development Mode:**

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Access:
- Public Website: http://localhost:3000
- Admin CMS: http://localhost:3000/admin
- API: http://localhost:5000/api/v1

**Production Build:**

```bash
# Backend
cd backend
npm run build
npm start

# Frontend
cd frontend
npm run build
npm start
```

## 📁 Project Structure

```
stallion-fitness/
├── frontend/
│   ├── app/
│   │   ├── (public)/          # Public pages
│   │   │   ├── page.tsx       # Homepage
│   │   │   ├── about/
│   │   │   ├── events/
│   │   │   ├── branches/
│   │   │   └── contact/
│   │   ├── admin/             # CMS Dashboard
│   │   │   ├── dashboard/
│   │   │   ├── trainers/
│   │   │   ├── events/
│   │   │   ├── programs/
│   │   │   └── ...
│   │   └── api/               # API routes (if needed)
│   ├── components/
│   │   ├── ui/                # shadcn components
│   │   ├── public/            # Public site components
│   │   └── admin/             # Admin components
│   ├── lib/
│   ├── styles/
│   └── public/
│       └── images/
├── backend/
│   ├── src/
│   │   ├── config/            # Configuration
│   │   ├── models/            # Mongoose models
│   │   ├── routes/            # API routes
│   │   ├── controllers/       # Route controllers
│   │   ├── middleware/        # Auth, validation, etc.
│   │   ├── services/          # Business logic
│   │   ├── utils/             # Utilities
│   │   └── server.ts          # Entry point
│   └── uploads/               # Temporary uploads
├── shared/
│   └── types/                 # Shared TypeScript types
└── docs/
    └── api/                   # API documentation
```

## 🔌 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/logout` - Logout
- `GET /api/v1/auth/me` - Get current user

### Public Endpoints
- `GET /api/v1/trainers` - Get all published trainers
- `GET /api/v1/programs` - Get all programs
- `GET /api/v1/events` - Get published events
- `GET /api/v1/branches` - Get all branches
- `GET /api/v1/reviews` - Get approved reviews
- `GET /api/v1/pricing` - Get pricing plans
- `GET /api/v1/faqs` - Get published FAQs

### Admin Endpoints (Protected)
- `POST /api/v1/admin/trainers` - Create trainer
- `PUT /api/v1/admin/trainers/:id` - Update trainer
- `DELETE /api/v1/admin/trainers/:id` - Delete trainer
- `POST /api/v1/admin/events` - Create event
- `POST /api/v1/admin/media/upload` - Upload images
- ... (similar CRUD for all entities)

## 🎨 Design Principles

- **Premium Fitness Aesthetic:** Strong typography, high-quality imagery
- **Mobile-First:** Fully responsive design
- **Performance:** Optimized images, lazy loading, CDN delivery
- **Accessibility:** Semantic HTML, ARIA labels, keyboard navigation
- **SEO:** Meta tags, structured data, sitemap

## 🔒 Security Best Practices

1. Never store passwords in plaintext
2. Use HTTPS in production
3. Validate all inputs server-side
4. Sanitize user-generated content
5. Implement rate limiting
6. Use secure HTTP headers
7. Keep dependencies updated
8. Never expose secrets in frontend code
9. Use environment variables
10. Implement CSRF protection

## 📈 Future Extensibility

The architecture supports adding:
- Membership management
- Class scheduling and bookings
- Payment integration
- WhatsApp notifications
- Lead management
- CRM functionality
- Attendance tracking
- Offers and coupons
- Analytics dashboard

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 🚀 Deployment

### Backend (Render/Railway/Heroku)
1. Set environment variables
2. Configure MongoDB Atlas
3. Set up Cloudinary
4. Deploy backend service
5. Note the API URL

### Frontend (Vercel/Netlify)
1. Set NEXT_PUBLIC_API_URL to backend URL
2. Deploy frontend
3. Configure custom domain

## 📝 License

© 2024 Stallion Xtreme Fitness. All rights reserved.

## 🤝 Support

For support, email support@stallionxtremefitness.com

## 🎯 Key Demo Test

The system is successful when:

1. **Trainer Management:** Owner adds new trainer → uploads photo → publishes → appears on website immediately
2. **Event Creation:** Owner creates event → adds gallery → publishes → visible on events page
3. **Media Management:** Owner uploads 5 photos → optimized → gallery updated
4. **Access Control:** Trainer tries to edit another trainer → DENIED
5. **Non-Technical Usage:** Person with zero coding knowledge can add trainer/event after brief explanation
