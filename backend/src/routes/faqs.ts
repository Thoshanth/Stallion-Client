import express from 'express';
import { getFAQs } from '../controllers/faqController';

const router = express.Router();

router.get('/', getFAQs);

export default router;
