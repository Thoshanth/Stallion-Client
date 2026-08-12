import { Request, Response } from 'express';
import { PricingPlan } from '../models/PricingPlan';
import { Status } from '../types';

export const getPricingPlans = async (req: Request, res: Response) => {
  try {
    const plans = await PricingPlan.find({
      status: Status.ACTIVE,
    })
      .sort({ displayOrder: 1, price: 1 })
      .populate('branches', 'name');

    res.status(200).json({
      success: true,
      data: plans,
    });
  } catch (error) {
    console.error('Error fetching pricing plans:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch pricing plans',
    });
  }
};
