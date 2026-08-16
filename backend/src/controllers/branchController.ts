import { Request, Response } from 'express';
import { Branch } from '../models/Branch';
import { Status } from '../types';
import { isDbReady } from '../config/database';

// Mock branch data for when DB is unavailable
const MOCK_BRANCHES = [
  {
    _id: '1',
    name: 'GajulRamaram',
    slug: 'gajulramaram',
    address: 'Gajularamaram Rd, Hyderabad',
    phone: '+91 8885110136',
    email: 'support@stallionxtremefitness.com',
    image: '/images/ramaramherosection.JPG',
    hoverImage: '/images/ramaramhover.JPG',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.5!2d78.4!3d17.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1',
    openingHours: {
      monday: { open: '06:00', close: '22:00', closed: false },
      tuesday: { open: '06:00', close: '22:00', closed: false },
      wednesday: { open: '06:00', close: '22:00', closed: false },
      thursday: { open: '06:00', close: '22:00', closed: false },
      friday: { open: '06:00', close: '22:00', closed: false },
      saturday: { open: '06:00', close: '22:00', closed: false },
      sunday: { open: '06:00', close: '22:00', closed: false },
    },
    programs: [],
    trainers: [],
    status: Status.ACTIVE,
  },
  {
    _id: '2',
    name: 'IDPL',
    slug: 'idpl',
    address: 'IDPL Main Rd, Hyderabad',
    phone: '+91 8885110136',
    email: 'support@stallionxtremefitness.com',
    image: '/images/idplherosec.JPG',
    hoverImage: '/images/chinthalhover.JPG',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.5!2d78.4!3d17.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1',
    openingHours: {
      monday: { open: '06:00', close: '22:00', closed: false },
      tuesday: { open: '06:00', close: '22:00', closed: false },
      wednesday: { open: '06:00', close: '22:00', closed: false },
      thursday: { open: '06:00', close: '22:00', closed: false },
      friday: { open: '06:00', close: '22:00', closed: false },
      saturday: { open: '06:00', close: '22:00', closed: false },
      sunday: { open: '06:00', close: '22:00', closed: false },
    },
    programs: [],
    trainers: [],
    status: Status.ACTIVE,
  },
  {
    _id: '3',
    name: 'Kompally',
    slug: 'kompally',
    address: 'Kompally Hwy, Hyderabad',
    phone: '+91 8885110136',
    email: 'support@stallionxtremefitness.com',
    image: '/images/kompallyherosec.JPG',
    hoverImage: '/images/subashhover.JPG',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.5!2d78.4!3d17.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1',
    openingHours: {
      monday: { open: '06:00', close: '22:00', closed: false },
      tuesday: { open: '06:00', close: '22:00', closed: false },
      wednesday: { open: '06:00', close: '22:00', closed: false },
      thursday: { open: '06:00', close: '22:00', closed: false },
      friday: { open: '06:00', close: '22:00', closed: false },
      saturday: { open: '06:00', close: '22:00', closed: false },
      sunday: { open: '06:00', close: '22:00', closed: false },
    },
    programs: [],
    trainers: [],
    status: Status.ACTIVE,
  },
  {
    _id: '4',
    name: 'Kondapur',
    slug: 'kondapur',
    address: 'Kondapur Center, Hyderabad',
    phone: '+91 8885110136',
    email: 'support@stallionxtremefitness.com',
    image: '/images/kondapurhero.JPG',
    hoverImage: '/images/kondapurhover.JPG',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.5!2d78.4!3d17.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1',
    openingHours: {
      monday: { open: '06:00', close: '22:00', closed: false },
      tuesday: { open: '06:00', close: '22:00', closed: false },
      wednesday: { open: '06:00', close: '22:00', closed: false },
      thursday: { open: '06:00', close: '22:00', closed: false },
      friday: { open: '06:00', close: '22:00', closed: false },
      saturday: { open: '06:00', close: '22:00', closed: false },
      sunday: { open: '06:00', close: '22:00', closed: false },
    },
    programs: [],
    trainers: [],
    status: Status.ACTIVE,
  },
  {
    _id: '5',
    name: 'Suchitra',
    slug: 'suchitra',
    address: 'Suchitra Circle, Hyderabad',
    phone: '+91 8885110136',
    email: 'support@stallionxtremefitness.com',
    image: '/images/suchitrahero.JPG',
    hoverImage: '/images/suchitrahover.JPG',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.5!2d78.4!3d17.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1',
    openingHours: {
      monday: { open: '06:00', close: '22:00', closed: false },
      tuesday: { open: '06:00', close: '22:00', closed: false },
      wednesday: { open: '06:00', close: '22:00', closed: false },
      thursday: { open: '06:00', close: '22:00', closed: false },
      friday: { open: '06:00', close: '22:00', closed: false },
      saturday: { open: '06:00', close: '22:00', closed: false },
      sunday: { open: '06:00', close: '22:00', closed: false },
    },
    programs: [],
    trainers: [],
    status: Status.ACTIVE,
  },
  {
    _id: '6',
    name: 'Ashok Nagar Bhel',
    slug: 'ashok-nagar-bhel',
    address: 'Ashok Nagar, BHEL, Hyderabad',
    phone: '+91 8885110136',
    email: 'support@stallionxtremefitness.com',
    image: '/images/bhelhover.jpg',
    hoverImage: '/images/bhelcover.jpg',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.5!2d78.4!3d17.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1',
    openingHours: {
      monday: { open: '06:00', close: '22:00', closed: false },
      tuesday: { open: '06:00', close: '22:00', closed: false },
      wednesday: { open: '06:00', close: '22:00', closed: false },
      thursday: { open: '06:00', close: '22:00', closed: false },
      friday: { open: '06:00', close: '22:00', closed: false },
      saturday: { open: '06:00', close: '22:00', closed: false },
      sunday: { open: '06:00', close: '22:00', closed: false },
    },
    programs: [],
    trainers: [],
    status: Status.ACTIVE,
  },
];

export const getBranches = async (req: Request, res: Response) => {
  // If DB is not ready, return mock data immediately
  if (!isDbReady) {
    console.warn('⚠️  Using mock branch data (DB unavailable)');
    return res.status(200).json({
      success: true,
      data: MOCK_BRANCHES,
    });
  }

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
    
    // Return mock data when DB is down
    res.status(200).json({
      success: true,
      data: MOCK_BRANCHES,
    });
  }
};

export const getBranch = async (req: Request, res: Response) => {
  // If DB is not ready, return mock data immediately
  if (!isDbReady) {
    console.warn('⚠️  Using mock branch data (DB unavailable)');
    
    // Fallback to mock data
    const mockBranch = MOCK_BRANCHES.find((b) => b.slug === req.params.slug);
    
    if (!mockBranch) {
      return res.status(404).json({ success: false, error: 'Branch not found' });
    }
    
    return res.status(200).json({ success: true, data: mockBranch });
  }

  try {
    const branch = await Branch.findOne({ slug: req.params.slug, status: Status.ACTIVE })
      .populate('trainers', 'name profileImage designation bio')
      .populate('programs', 'name slug image description');
    
    if (!branch) {
      return res.status(404).json({ success: false, error: 'Branch not found' });
    }
    
    res.status(200).json({ success: true, data: branch });
  } catch (error) {
    console.error('Error fetching branch:', error);
    
    // Fallback to mock data
    const mockBranch = MOCK_BRANCHES.find((b) => b.slug === req.params.slug);
    
    if (!mockBranch) {
      return res.status(404).json({ success: false, error: 'Branch not found' });
    }
    
    res.status(200).json({ success: true, data: mockBranch });
  }
};
