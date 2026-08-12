import { Router } from 'express';
import { TrainerController } from '../controllers/trainerController';
import { validate } from '../middleware/validation';
import { authenticate, authorize } from '../middleware/auth';
import { uploadSingle } from '../middleware/upload';
import { UserRole } from '../types';
import { 
  createTrainerSchema, 
  updateTrainerSchema, 
  getTrainerSchema,
  listTrainersSchema
} from '../validation/trainer';

const router = Router();
const trainerController = new TrainerController();

// Public routes
router.get('/', validate(listTrainersSchema), trainerController.getTrainers);
router.get('/:id', validate(getTrainerSchema), trainerController.getTrainer);

// Admin routes
router.get('/admin/all', 
  authenticate, 
  authorize(UserRole.SUPER_ADMIN, UserRole.OWNER, UserRole.MANAGER),
  validate(listTrainersSchema),
  trainerController.getAdminTrainers
);

router.post('/', 
  authenticate,
  authorize(UserRole.SUPER_ADMIN, UserRole.OWNER, UserRole.MANAGER),
  uploadSingle('profileImage'),
  validate(createTrainerSchema),
  trainerController.createTrainer
);

router.put('/:id',
  authenticate,
  authorize(UserRole.SUPER_ADMIN, UserRole.OWNER, UserRole.MANAGER),
  uploadSingle('profileImage'),
  validate(updateTrainerSchema),
  trainerController.updateTrainer
);

router.delete('/:id',
  authenticate,
  authorize(UserRole.SUPER_ADMIN, UserRole.OWNER),
  validate(getTrainerSchema),
  trainerController.deleteTrainer
);

export default router;