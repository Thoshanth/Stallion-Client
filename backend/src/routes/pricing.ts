import express from 'express';
import { getPricingPlans } from '../controllers/pricingController';

const router = express.Router();

router.get('/', getPricingPlans);

export default router;
