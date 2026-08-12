import { Request, Response } from 'express';
import { Branch } from '../models/Branch';
import { Status } from '../types';

export const getBranches = async (req: Request, res: Response) => {
  try {
    const branches = await Branch.find({
      status: Status.ACTIVE,
    })
      .sort({ name: 1 })
      .populate('trainers', 'name profileImage designation')
      .populate('programs', 'name slug image');

    res.status(200).json({
      success: true,
      data: branches,
    });
  } catch (error) {
    console.error('Error fetching branches:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch branches',
    });
  }
};
