import express from 'express';
import { getBranches, getBranch } from '../controllers/branchController';

const router = express.Router();

router.get('/', getBranches);
router.get('/:slug', getBranch);

export default router;
