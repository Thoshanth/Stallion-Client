import { Request, Response } from 'express';
import { Trainer } from '../models/Trainer';
import { AuthRequest, ApiResponse, PublishedState, Status } from '../types';
import cloudinary from '../config/cloudinary';
import fs from 'fs';
import { isDbReady } from '../config/database';

// Mock data fallback for when database is unavailable
const MOCK_TRAINERS = [
  {
    _id: '1',
    name: 'Ramesh Kumar',
    slug: 'ramesh-kumar',
    designation: 'Head Trainer',
    specialization: ['Strength Training', 'Bodybuilding'],
    bio: 'Certified fitness expert with 10+ years of experience in strength training and bodybuilding.',
    profileImage: '/images/trainers/ramesh.jpg',
    displayOrder: 1,
    status: Status.ACTIVE,
    publishedState: PublishedState.PUBLISHED,
    branch: { _id: '1', name: 'GajulRamaram', slug: 'gajulramaram' },
    programs: [],
  },
  {
    _id: '2',
    name: 'Priya Singh',
    slug: 'priya-singh',
    designation: 'Yoga & Wellness Coach',
    specialization: ['Yoga', 'Flexibility', 'Mindfulness'],
    bio: 'Passionate about holistic wellness and helping clients achieve balance through yoga and mindfulness.',
    profileImage: '/images/trainers/priya.jpg',
    displayOrder: 2,
    status: Status.ACTIVE,
    publishedState: PublishedState.PUBLISHED,
    branch: { _id: '2', name: 'IDPL', slug: 'idpl' },
    programs: [],
  },
];

export class TrainerController {
  // Get all trainers (public)
  async getTrainers(req: Request, res: Response): Promise<void> {
    // If DB is not ready, return mock data immediately
    if (!isDbReady) {
      console.warn('⚠️ Using mock trainers data (DB unavailable)');
      const response: ApiResponse = {
        success: true,
        data: MOCK_TRAINERS,
        pagination: {
          page: 1,
          limit: 10,
          total: MOCK_TRAINERS.length,
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
      const sort = req.query.sort as string || '-displayOrder';

      // Build filter for public API (only published and active)
      const filter: any = {
        status: Status.ACTIVE,
        publishedState: PublishedState.PUBLISHED,
      };

      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: 'i' } },
          { designation: { $regex: search, $options: 'i' } },
          { specialization: { $in: [new RegExp(search, 'i')] } },
        ];
      }

      if (branch) {
        filter.branch = branch;
      }

      const skip = (page - 1) * limit;

      const [trainers, total] = await Promise.all([
        Trainer.find(filter)
          .populate('branch', 'name slug')
          .populate('programs', 'name slug')
          .sort(sort)
          .skip(skip)
          .limit(limit)
          .lean(),
        Trainer.countDocuments(filter),
      ]);

      const response: ApiResponse = {
        success: true,
        data: trainers,
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
        data: MOCK_TRAINERS,
        pagination: {
          page: 1,
          limit: 10,
          total: MOCK_TRAINERS.length,
          pages: 1,
        },
      };
      res.json(response);
    }
  }

  // Get single trainer (public)
  async getTrainer(req: Request, res: Response): Promise<void> {
    // If DB is not ready, return mock data immediately
    if (!isDbReady) {
      console.warn('⚠️ Using mock trainers data (DB unavailable)');
      const { id } = req.params;
      const mockTrainer = MOCK_TRAINERS.find((t) => t._id === id || t.slug === id);
      
      if (!mockTrainer) {
        res.status(404).json({
          success: false,
          error: 'Trainer not found',
        });
        return;
      }

      const response: ApiResponse = {
        success: true,
        data: mockTrainer,
      };
      res.json(response);
      return;
    }

    try {
      const { id } = req.params;
      
      const trainer = await Trainer.findOne({
        $or: [
          { _id: id },
          { slug: id }
        ],
        status: Status.ACTIVE,
        publishedState: PublishedState.PUBLISHED,
      })
        .populate('branch', 'name slug address phone email')
        .populate('programs', 'name slug description')
        .lean();

      if (!trainer) {
        res.status(404).json({
          success: false,
          error: 'Trainer not found',
        });
        return;
      }

      const response: ApiResponse = {
        success: true,
        data: trainer,
      };

      res.json(response);
    } catch (error: any) {
      const { id } = req.params;
      const mockTrainer = MOCK_TRAINERS.find((t) => t._id === id || t.slug === id);
      
      if (!mockTrainer) {
        res.status(404).json({
          success: false,
          error: 'Trainer not found',
        });
        return;
      }

      const response: ApiResponse = {
        success: true,
        data: mockTrainer,
      };
      res.json(response);
    }
  }

  // Admin: Get all trainers
  async getAdminTrainers(req: AuthRequest, res: Response): Promise<void> {
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
          { name: { $regex: search, $options: 'i' } },
          { designation: { $regex: search, $options: 'i' } },
          { specialization: { $in: [new RegExp(search, 'i')] } },
        ];
      }

      if (branch) filter.branch = branch;
      if (status) filter.status = status;
      if (publishedState) filter.publishedState = publishedState;

      const skip = (page - 1) * limit;

      const [trainers, total] = await Promise.all([
        Trainer.find(filter)
          .populate('branch', 'name slug')
          .populate('programs', 'name slug')
          .sort(sort)
          .skip(skip)
          .limit(limit),
        Trainer.countDocuments(filter),
      ]);

      const response: ApiResponse = {
        success: true,
        data: trainers,
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
        error: 'Failed to fetch trainers',
        message: error.message,
      });
    }
  }

  // Admin: Create trainer
  async createTrainer(req: AuthRequest, res: Response): Promise<void> {
    try {
      const trainerData = req.body;
      let profileImageUrl = '';

      // Handle file upload if present
      if (req.file) {
        try {
          const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'stallion/trainers',
            transformation: [
              { width: 400, height: 400, crop: 'fill' },
              { quality: 'auto', fetch_format: 'auto' }
            ]
          });
          profileImageUrl = result.secure_url;
          
          // Delete local file
          fs.unlinkSync(req.file.path);
        } catch (uploadError) {
          console.error('Image upload failed:', uploadError);
          // Continue without image
        }
      }

      const trainer = new Trainer({
        ...trainerData,
        ...(profileImageUrl && { profileImage: profileImageUrl }),
      });

      await trainer.save();
      await trainer.populate(['branch', 'programs']);

      const response: ApiResponse = {
        success: true,
        message: 'Trainer created successfully',
        data: trainer,
      };

      res.status(201).json(response);
    } catch (error: any) {
      // Clean up uploaded file on error
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      res.status(500).json({
        success: false,
        error: 'Failed to create trainer',
        message: error.message,
      });
    }
  }

  // Admin: Update trainer
  async updateTrainer(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData = req.body;
      let profileImageUrl = '';

      // Find existing trainer
      const existingTrainer = await Trainer.findById(id);
      if (!existingTrainer) {
        res.status(404).json({
          success: false,
          error: 'Trainer not found',
        });
        return;
      }

      // Handle file upload if present
      if (req.file) {
        try {
          const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'stallion/trainers',
            transformation: [
              { width: 400, height: 400, crop: 'fill' },
              { quality: 'auto', fetch_format: 'auto' }
            ]
          });
          profileImageUrl = result.secure_url;

          // Delete old image from cloudinary
          if (existingTrainer.profileImage) {
            const publicId = existingTrainer.profileImage.split('/').pop()?.split('.')[0];
            if (publicId) {
              await cloudinary.uploader.destroy(`stallion/trainers/${publicId}`);
            }
          }
          
          // Delete local file
          fs.unlinkSync(req.file.path);
        } catch (uploadError) {
          console.error('Image upload failed:', uploadError);
        }
      }

      const trainer = await Trainer.findByIdAndUpdate(
        id,
        {
          ...updateData,
          ...(profileImageUrl && { profileImage: profileImageUrl }),
        },
        { new: true, runValidators: true }
      ).populate(['branch', 'programs']);

      const response: ApiResponse = {
        success: true,
        message: 'Trainer updated successfully',
        data: trainer,
      };

      res.json(response);
    } catch (error: any) {
      // Clean up uploaded file on error
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      res.status(500).json({
        success: false,
        error: 'Failed to update trainer',
        message: error.message,
      });
    }
  }

  // Admin: Delete trainer
  async deleteTrainer(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const trainer = await Trainer.findById(id);
      if (!trainer) {
        res.status(404).json({
          success: false,
          error: 'Trainer not found',
        });
        return;
      }

      // Delete image from cloudinary
      if (trainer.profileImage) {
        try {
          const publicId = trainer.profileImage.split('/').pop()?.split('.')[0];
          if (publicId) {
            await cloudinary.uploader.destroy(`stallion/trainers/${publicId}`);
          }
        } catch (deleteError) {
          console.error('Failed to delete image:', deleteError);
        }
      }

      await Trainer.findByIdAndDelete(id);

      const response: ApiResponse = {
        success: true,
        message: 'Trainer deleted successfully',
      };

      res.json(response);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: 'Failed to delete trainer',
        message: error.message,
      });
    }
  }
}