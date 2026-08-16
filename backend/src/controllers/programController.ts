import { Request, Response } from 'express';
import { Program } from '../models/Program';
import { Status, PublishedState } from '../types';
import { isDbReady } from '../config/database';

// Mock data fallback for when database is unavailable
const MOCK_PROGRAMS = [
  {
    _id: '1',
    name: 'Stallion Strength',
    slug: 'stallion-strength',
    description: 'Build raw power with our signature strength training program',
    shortDescription: 'Strength & Power Building',
    benefits: ['Increased muscle mass', 'Enhanced strength', 'Improved bone density'],
    duration: '8 weeks',
    level: 'Intermediate',
    image: '/images/programs/strength.jpg',
    displayOrder: 1,
    status: Status.ACTIVE,
    publishedState: PublishedState.PUBLISHED,
    trainers: [],
    branches: [],
  },
  {
    _id: '2',
    name: 'HIIT Inferno',
    slug: 'hiit-inferno',
    description: 'High-intensity interval training for maximum fat burn',
    shortDescription: 'Fat Burning & Conditioning',
    benefits: ['Rapid fat loss', 'Improved cardiovascular health', 'Increased endurance'],
    duration: '6 weeks',
    level: 'Advanced',
    image: '/images/programs/hiit.jpg',
    displayOrder: 2,
    status: Status.ACTIVE,
    publishedState: PublishedState.PUBLISHED,
    trainers: [],
    branches: [],
  },
  {
    _id: '3',
    name: 'Functional Warrior',
    slug: 'functional-warrior',
    description: 'Master functional movements for real-world strength',
    shortDescription: 'Functional Fitness Training',
    benefits: ['Better mobility', 'Injury prevention', 'Athletic performance'],
    duration: '10 weeks',
    level: 'All levels',
    image: '/images/programs/functional.jpg',
    displayOrder: 3,
    status: Status.ACTIVE,
    publishedState: PublishedState.PUBLISHED,
    trainers: [],
    branches: [],
  },
  {
    _id: '4',
    name: 'Boxing Conditioning',
    slug: 'boxing-conditioning',
    description: 'Fighter-style conditioning for peak performance',
    shortDescription: 'Combat Sports Training',
    benefits: ['Enhanced reflexes', 'Full-body conditioning', 'Stress relief'],
    duration: '8 weeks',
    level: 'Intermediate',
    image: '/images/programs/boxing.jpg',
    displayOrder: 4,
    status: Status.ACTIVE,
    publishedState: PublishedState.PUBLISHED,
    trainers: [],
    branches: [],
  },
  {
    _id: '5',
    name: 'Mobility Mastery',
    slug: 'mobility-mastery',
    description: 'Improve flexibility and movement quality',
    shortDescription: 'Flexibility & Recovery',
    benefits: ['Increased flexibility', 'Better posture', 'Reduced pain'],
    duration: '6 weeks',
    level: 'All levels',
    image: '/images/programs/mobility.jpg',
    displayOrder: 5,
    status: Status.ACTIVE,
    publishedState: PublishedState.PUBLISHED,
    trainers: [],
    branches: [],
  },
  {
    _id: '6',
    name: 'Elite 1:1 Coaching',
    slug: 'elite-coaching',
    description: 'Personalized training tailored to your goals',
    shortDescription: 'Personal Training',
    benefits: ['Custom programming', 'Direct attention', 'Faster results'],
    duration: 'Ongoing',
    level: 'All levels',
    image: '/images/programs/coaching.jpg',
    displayOrder: 6,
    status: Status.ACTIVE,
    publishedState: PublishedState.PUBLISHED,
    trainers: [],
    branches: [],
  },
];

export const getPrograms = async (req: Request, res: Response) => {
  // If DB is not ready, return mock data immediately
  if (!isDbReady) {
    console.warn('⚠️ Using mock programs data (DB unavailable)');
    return res.status(200).json({
      success: true,
      data: MOCK_PROGRAMS,
    });
  }

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
    res.status(200).json({
      success: true,
      data: MOCK_PROGRAMS,
    });
  }
};
