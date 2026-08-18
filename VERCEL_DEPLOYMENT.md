# Vercel deployment guide for Stallion Client

This project is best deployed as two separate services:

- Frontend: Vercel (Next.js)
- Backend API: Render or Railway (Node/Express)

## 1) Frontend on Vercel

1. Push this repository to GitHub.
2. In Vercel, choose Import Project.
3. Set the project root to the `frontend` folder.
4. Framework preset: Next.js
5. Build command: `npm install && npm run build`
6. Output directory: `.next`
7. Add environment variables:
   - `NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api/v1`
   - `NEXT_PUBLIC_SITE_URL=https://your-frontend-domain.vercel.app`

The frontend already reads these values in [frontend/lib/api.js](frontend/lib/api.js) and [frontend/next.config.js](frontend/next.config.js).

## 2) Backend deployment

Deploy the API from the `backend` folder to Render or Railway.

Required environment variables:

- `NODE_ENV=production`
- `PORT=5000`
- `FRONTEND_URL=https://your-frontend-domain.vercel.app`
- `MONGODB_URI=...`
- `JWT_SECRET=...`
- `JWT_EXPIRES_IN=7d`
- `CLOUDINARY_CLOUD_NAME=...`
- `CLOUDINARY_API_KEY=...`
- `CLOUDINARY_API_SECRET=...`
- `GOOGLE_SHEETS_SPREADSHEET_ID=...`
- `GOOGLE_SHEETS_CREDENTIALS={...}`

Build command for backend:

```bash
npm install
npm run build
npm run start
```

The app entry point is defined in [backend/package.json](backend/package.json) and [backend/src/server.ts](backend/src/server.ts).

## 3) Health checks

After deployment, verify:

- Frontend loads: `https://your-frontend-domain.vercel.app`
- API health check: `https://your-backend-domain.com/health`
- Data fetch works from the frontend via `NEXT_PUBLIC_API_URL`

## 4) Recommended final production URLs

- Frontend: `https://your-frontend-domain.vercel.app`
- Backend: `https://your-backend-domain.com`
- API base: `https://your-backend-domain.com/api/v1`

## 5) Important note

Vercel is ideal for the Next.js frontend. The Express backend is better hosted on a platform with a long-lived Node process. If you want to keep both on Vercel, the backend must be converted to a Vercel serverless/Node handler first.

## 6) Verification performed locally

I verified both app builds successfully before preparing the deployment steps:

- `cd backend && npm run build` ✅
- `cd frontend && npm run build` ✅
