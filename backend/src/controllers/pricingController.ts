import { Request, Response } from 'express';
import { PricingPlan } from '../models/PricingPlan';
import { Status } from '../types';
import { isDbReady } from '../config/database';

// Mock data fallback for when database is unavailable
const MOCK_PRICING_PLANS = [
  {
    _id: '1',
    name: 'Basic',
    slug: 'basic',
    price: 1000,
    billingCycle: 'monthly',
    description: 'Perfect for beginners starting their fitness journey',
    features: [
      'Access to gym equipment',
      'Locker facility',
      'Basic fitness assessment',
      'Group classes included',
    ],
    displayOrder: 1,
    status: Status.ACTIVE,
    branches: [],
    createdAt: new Date('2024-01-01'),
  },
  {
    _id: '2',
    name: 'Pro',
    slug: 'pro',
    price: 2500,
    billingCycle: 'monthly',
    description: 'Most popular plan with additional benefits',
    features: [
      'All Basic features',
      '2 personal training sessions/month',
      'Nutrition guidance',
      'Access to all classes',
      'Diet chart',
    ],
    displayOrder: 2,
    status: Status.ACTIVE,
    branches: [],
    createdAt: new Date('2024-01-01'),
  },
  {
    _id: '3',
    name: 'Elite',
    slug: 'elite',
    price: 5000,
    billingCycle: 'monthly',
    description: 'Premium experience with unlimited training',
    features: [
      'All Pro features',
      'Unlimited personal training',
      'Priority equipment access',
      'Customized meal plans',
      'Free supplements',
      'Priority class booking',
    ],
    displayOrder: 3,
    status: Status.ACTIVE,
    branches: [],
    createdAt: new Date('2024-01-01'),
  },
  {
    _id: '4',
    name: 'Legacy',
    slug: 'legacy',
    price: 50000,
    billingCycle: 'yearly',
    description: 'Ultimate annual plan with maximum savings',
    features: [
      'All Elite features',
      'Save ₹10,000 compared to monthly',
      'Freeze up to 60 days/year',
      'Free guest passes (5/month)',
      'Exclusive member events',
      'Complimentary merchandise',
    ],
    displayOrder: 4,
    status: Status.ACTIVE,
    branches: [],
    createdAt: new Date('2024-01-01'),
  },
];

export const getPricingPlans = async (req: Request, res: Response) => {
  // If DB is not ready, return mock data immediately
  if (!isDbReady) {
    console.warn('⚠️ Using mock pricing plans data (DB unavailable)');
    return res.status(200).json({
      success: true,
      data: MOCK_PRICING_PLANS,
    });
  }

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
    res.status(200).json({
      success: true,
      data: MOCK_PRICING_PLANS,
    });
  }
};
