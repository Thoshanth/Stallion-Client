import { Request, Response } from 'express';
import { Event } from '../models/Event';
import { AuthRequest, ApiResponse, PublishedState, Status } from '../types';
import cloudinary from '../config/cloudinary';
import fs from 'fs';
import { isDbReady } from '../config/database';

// Mock data fallback for when database is unavailable
const MOCK_EVENTS = [
  {
    _id: '1',
    title: 'Summer Fitness Challenge',
    slug: 'summer-fitness-challenge-2024-07-15',
    description: 'Join us for a month-long fitness challenge with exciting prizes and amazing workouts!',
    date: new Date('2024-07-15'),
    startTime: '09:00',
    endTime: '11:00',
    branch: { _id: '1', name: 'GajulRamaram', slug: 'gajulramaram' },
    trainer: { _id: '1', name: 'Ramesh Kumar' },
    status: Status.ACTIVE,
    publishedState: PublishedState.PUBLISHED,
    coverImage: '/images/events/summer-challenge.jpg',
    registrationUrl: 'https://forms.gle/example',
    gallery: [],
  },
  {
    _id: '2',
    title: 'Yoga Wellness Workshop',
    slug: 'yoga-wellness-workshop-2024-08-20',
    description: 'Discover inner peace and flexibility in our comprehensive yoga workshop for all levels.',
    date: new Date('2024-08-20'),
    startTime: '16:00',
    endTime: '18:00',
    branch: { _id: '2', name: 'IDPL', slug: 'idpl' },
    trainer: { _id: '2', name: 'Priya Singh' },
    status: Status.ACTIVE,
    publishedState: PublishedState.PUBLISHED,
    coverImage: '/images/events/yoga-workshop.jpg',
    registrationUrl: null,
    gallery: [],
  },
];

export class EventController {
  // Get all events (public)
  async getEvents(req: Request, res: Response): Promise<void> {
    // If DB is not ready, return mock data immediately
    if (!isDbReady) {
      console.warn('⚠️ Using mock events data (DB unavailable)');
      const response: ApiResponse = {
        success: true,
        data: MOCK_EVENTS.filter(e => e.status === Status.ACTIVE && e.publishedState === PublishedState.PUBLISHED),
        pagination: {
          page: 1,
          limit: 10,
          total: MOCK_EVENTS.length,
          pages: 1,
        },
      };
      res.json(response);
      return;
    }

    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = req.query.search as string;
      const branch = req.query.branch as string;
      const sort = req.query.sort as string || 'date';

      // Build filter for public API (only published and active)
      const filter: any = {
        status: Status.ACTIVE,
        publishedState: PublishedState.PUBLISHED,
      };

      if (search) {
        filter.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ];
      }

      if (branch) {
        filter.branch = branch;
      }

      const skip = (page - 1) * limit;

      const [events, total] = await Promise.all([
        Event.find(filter)
          .populate('branch', 'name slug')
          .populate('trainer', 'name designation')
          .sort(sort)
          .skip(skip)
          .limit(limit)
          .lean(),
        Event.countDocuments(filter),
      ]);

      const response: ApiResponse = {
        success: true,
        data: events,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      };

      res.json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: true,
        data: MOCK_EVENTS.filter(e => e.status === Status.ACTIVE && e.publishedState === PublishedState.PUBLISHED),
        pagination: {
          page: 1,
          limit: 10,
          total: MOCK_EVENTS.length,
          pages: 1,
        },
      };
      res.json(response);
    }
  }

  // Get single event (public)
  async getEvent(req: Request, res: Response): Promise<void> {
    // If DB is not ready, return mock data immediately
    if (!isDbReady) {
      console.warn('⚠️ Using mock events data (DB unavailable)');
      const { id } = req.params;
      const mockEvent = MOCK_EVENTS.find((e) => e._id === id || e.slug === id);
      
      if (!mockEvent || mockEvent.status !== Status.ACTIVE || mockEvent.publishedState !== PublishedState.PUBLISHED) {
        res.status(404).json({
          success: false,
          error: 'Event not found',
        });
        return;
      }

      const response: ApiResponse = {
        success: true,
        data: mockEvent,
      };
      res.json(response);
      return;
    }

    try {
      const { id } = req.params;
      
      const event = await Event.findOne({
        $or: [
          { _id: id },
          { slug: id }
        ],
        status: Status.ACTIVE,
        publishedState: PublishedState.PUBLISHED,
      })
        .populate('branch', 'name slug address phone')
        .populate('trainer', 'name designation profileImage')
        .lean();

      if (!event) {
        res.status(404).json({
          success: false,
          error: 'Event not found',
        });
        return;
      }

      const response: ApiResponse = {
        success: true,
        data: event,
      };

      res.json(response);
    } catch (error: any) {
      const { id } = req.params;
      const mockEvent = MOCK_EVENTS.find((e) => e._id === id || e.slug === id);
      
      if (!mockEvent || mockEvent.status !== Status.ACTIVE || mockEvent.publishedState !== PublishedState.PUBLISHED) {
        res.status(404).json({
          success: false,
          error: 'Event not found',
        });
        return;
      }

      const response: ApiResponse = {
        success: true,
        data: mockEvent,
      };
      res.json(response);
    }
  }

  // Admin: Get all events
  async getAdminEvents(req: AuthRequest, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = req.query.search as string;
      const branch = req.query.branch as string;
      const status = req.query.status as Status;
      const publishedState = req.query.publishedState as PublishedState;
      const sort = req.query.sort as string || '-createdAt';

      const filter: any = {};

      if (search) {
        filter.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ];
      }

      if (branch) filter.branch = branch;
      if (status) filter.status = status;
      if (publishedState) filter.publishedState = publishedState;

      const skip = (page - 1) * limit;

      const [events, total] = await Promise.all([
        Event.find(filter)
          .populate('branch', 'name slug')
          .populate('trainer', 'name designation')
          .sort(sort)
          .skip(skip)
          .limit(limit),
        Event.countDocuments(filter),
      ]);

      const response: ApiResponse = {
        success: true,
        data: events,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      };

      res.json(response);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch events',
        message: error.message,
      });
    }
  }

  // Admin: Create event
  async createEvent(req: AuthRequest, res: Response): Promise<void> {
    try {
      const eventData = req.body;
      let coverImageUrl = '';

      // Handle file upload if present
      if (req.file) {
        try {
          const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'stallion/events',
            transformation: [
              { width: 800, height: 600, crop: 'fill' },
              { quality: 'auto', fetch_format: 'auto' }
            ]
          });
          coverImageUrl = result.secure_url;
          
          // Delete local file
          fs.unlinkSync(req.file.path);
        } catch (uploadError) {
          console.error('Image upload failed:', uploadError);
          // Continue without image
        }
      }

      const event = new Event({
        ...eventData,
        ...(coverImageUrl && { coverImage: coverImageUrl }),
      });

      await event.save();
      await event.populate(['branch', 'trainer']);

      const response: ApiResponse = {
        success: true,
        message: 'Event created successfully',
        data: event,
      };

      res.status(201).json(response);
    } catch (error: any) {
      // Clean up uploaded file on error
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      res.status(500).json({
        success: false,
        error: 'Failed to create event',
        message: error.message,
      });
    }
  }

  // Admin: Update event
  async updateEvent(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData = req.body;
      let coverImageUrl = '';

      // Find existing event
      const existingEvent = await Event.findById(id);
      if (!existingEvent) {
        res.status(404).json({
          success: false,
          error: 'Event not found',
        });
        return;
      }

      // Handle file upload if present
      if (req.file) {
        try {
          const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'stallion/events',
            transformation: [
              { width: 800, height: 600, crop: 'fill' },
              { quality: 'auto', fetch_format: 'auto' }
            ]
          });
          coverImageUrl = result.secure_url;

          // Delete old image from cloudinary
          if (existingEvent.coverImage) {
            const publicId = existingEvent.coverImage.split('/').pop()?.split('.')[0];
            if (publicId) {
              await cloudinary.uploader.destroy(`stallion/events/${publicId}`);
            }
          }
          
          // Delete local file
          fs.unlinkSync(req.file.path);
        } catch (uploadError) {
          console.error('Image upload failed:', uploadError);
        }
      }

      const event = await Event.findByIdAndUpdate(
        id,
        {
          ...updateData,
          ...(coverImageUrl && { coverImage: coverImageUrl }),
        },
        { new: true, runValidators: true }
      ).populate(['branch', 'trainer']);

      const response: ApiResponse = {
        success: true,
        message: 'Event updated successfully',
        data: event,
      };

      res.json(response);
    } catch (error: any) {
      // Clean up uploaded file on error
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      res.status(500).json({
        success: false,
        error: 'Failed to update event',
        message: error.message,
      });
    }
  }

  // Admin: Delete event
  async deleteEvent(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const event = await Event.findById(id);
      if (!event) {
        res.status(404).json({
          success: false,
          error: 'Event not found',
        });
        return;
      }

      // Delete cover image from cloudinary
      if (event.coverImage) {
        try {
          const publicId = event.coverImage.split('/').pop()?.split('.')[0];
          if (publicId) {
            await cloudinary.uploader.destroy(`stallion/events/${publicId}`);
          }
        } catch (deleteError) {
          console.error('Failed to delete cover image:', deleteError);
        }
      }

      // Delete gallery images from cloudinary
      if (event.gallery && event.gallery.length > 0) {
        try {
          const deletePromises = event.gallery.map(imageUrl => {
            const publicId = imageUrl.split('/').pop()?.split('.')[0];
            if (publicId) {
              return cloudinary.uploader.destroy(`stallion/events/${publicId}`);
            }
          });
          await Promise.all(deletePromises);
        } catch (deleteError) {
          console.error('Failed to delete gallery images:', deleteError);
        }
      }

      await Event.findByIdAndDelete(id);

      const response: ApiResponse = {
        success: true,
        message: 'Event deleted successfully',
      };

      res.json(response);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: 'Failed to delete event',
        message: error.message,
      });
    }
  }
}
