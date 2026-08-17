import express from 'express';
import { getReviews, getAdminReviews } from '../controllers/reviewController';
import { authenticate, authorize } from '../middleware/auth';
import { UserRole } from '../types';


const router = express.Router();

router.get('/', getReviews);
router.get('/admin', authenticate, authorize(UserRole.SUPER_ADMIN, UserRole.MANAGER), getAdminReviews);

export default router;
