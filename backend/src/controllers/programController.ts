import { Request, Response } from 'express';
import { Program } from '../models/Program';
import { Status, PublishedState } from '../types';

export const getPrograms = async (req: Request, res: Response) => {
  try {
    const programs = await Program.find({
      status: Status.ACTIVE,
      publishedState: PublishedState.PUBLISHED,
    })
      .sort({ displayOrder: 1, createdAt: -1 })
      .populate('trainers', 'name profileImage designation')
      .populate('branches', 'name slug');

    res.status(200).json({
      success: true,
      data: programs,
    });
  } catch (error) {
    console.error('Error fetching programs:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch programs',
    });
  }
};
