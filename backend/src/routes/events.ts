import express from 'express';
import { EventController } from '../controllers/eventController';
import { authenticate } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = express.Router();
const eventController = new EventController();

// Bind methods to the controller instance
const getEvents = eventController.getEvents.bind(eventController);
const getEvent = eventController.getEvent.bind(eventController);
const getAdminEvents = eventController.getAdminEvents.bind(eventController);
const createEvent = eventController.createEvent.bind(eventController);
const updateEvent = eventController.updateEvent.bind(eventController);
const deleteEvent = eventController.deleteEvent.bind(eventController);

// Admin routes MUST come before the dynamic :id route
router.get('/admin/all', authenticate, getAdminEvents);
router.post('/admin', authenticate, upload.single('coverImage'), createEvent);
router.put('/admin/:id', authenticate, upload.single('coverImage'), updateEvent);
router.delete('/admin/:id', authenticate, deleteEvent);

// Public routes
router.get('/', getEvents);
router.get('/:id', getEvent);

export default router;
