import { Request, Response } from 'express';
import { Review } from '../models/Review';
import { ReviewStatus } from '../types';

export const getReviews = async (req: Request, res: Response) => {
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
    res.status(500).json({
      success: false,
      error: 'Failed to fetch reviews',
    });
  }
};
