import express from 'express';
import { submitContact, getContactMessages, updateContactStatus } from '../controllers/contactController';
import { authenticate, authorize } from '../middleware/auth';
import { UserRole } from '../types';

const router = express.Router();

router.post('/', submitContact);
router.get('/', authenticate, authorize(UserRole.SUPER_ADMIN, UserRole.MANAGER), getContactMessages);
router.put('/:id/status', authenticate, authorize(UserRole.SUPER_ADMIN, UserRole.MANAGER), updateContactStatus);

export default router;
