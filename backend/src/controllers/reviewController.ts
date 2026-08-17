import { Request, Response } from 'express';
import { Review } from '../models/Review';
import { ReviewStatus } from '../types';
import { isDbReady } from '../config/database';

// Mock data fallback for when database is unavailable
const MOCK_REVIEWS = [
  {
    _id: '1',
    customerName: 'Paul K',
    rating: 5,
    comment: 'Best gym in Hyderabad! The trainers are incredibly knowledgeable and the equipment is top-notch. I\'ve seen amazing results in just 3 months.',
    displayOrder: 1,
    status: ReviewStatus.APPROVED,
    branch: null,
    createdAt: new Date('2024-01-15'),
  },
  {
    _id: '2',
    customerName: 'Syra',
    rating: 5,
    comment: 'Stallion has transformed my fitness journey. The personalized attention and motivating atmosphere keep me coming back. Highly recommend!',
    displayOrder: 2,
    status: ReviewStatus.APPROVED,
    branch: null,
    createdAt: new Date('2024-01-20'),
  },
  {
    _id: '3',
    customerName: 'Krishna',
    rating: 5,
    comment: 'Excellent facilities and professional trainers. The gym is always clean and well-maintained. Worth every rupee!',
    displayOrder: 3,
    status: ReviewStatus.APPROVED,
    branch: null,
    createdAt: new Date('2024-01-25'),
  },
];

export const getReviews = async (req: Request, res: Response) => {
  // If DB is not ready, return mock data immediately
  if (!isDbReady) {
    console.warn('⚠️ Using mock reviews data (DB unavailable)');
    return res.status(200).json({
      success: true,
      data: MOCK_REVIEWS,
    });
  }

  try {
    const reviews = await Review.find({
      status: ReviewStatus.APPROVED,
    })
      .sort({ displayOrder: 1, rating: -1, createdAt: -1 })
      .populate('branch', 'name');

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(200).json({
      success: true,
      data: MOCK_REVIEWS,
    });
  }
};

export const getAdminReviews = async (req: Request, res: Response) => {
  if (!isDbReady) {
    return res.status(200).json({
      success: true,
      data: MOCK_REVIEWS,
    });
  }

  try {
    const reviews = await Review.find()
      .sort({ createdAt: -1 })
      .populate('branch', 'name');

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    console.error('Error fetching admin reviews:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch reviews',
    });
  }
};
