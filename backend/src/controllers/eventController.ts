import { Request, Response } from 'express';
import { Event } from '../models/Event';
import { Status } from '../types';
import { isDbReady } from '../config/database';

// Mock data fallback for when database is unavailable
const MOCK_EVENTS = [
  {
    _id: '1',
    name: 'Summer Fitness Challenge',
    slug: 'summer-fitness-challenge',
    description: 'Join us for a month-long fitness challenge with exciting prizes!',
    date: new Date('2024-07-15'),
    branch: { _id: '1', name: 'GajulRamaram' },
    trainer: { _id: '1', name: 'John Doe' },
    status: Status.ACTIVE,
  },
];

export const getEvents = async (req: Request, res: Response) => {
  // If DB is not ready, return mock data immediately
  if (!isDbReady) {
    console.warn('⚠️ Using mock events data (DB unavailable)');
    return res.status(200).json({
      success: true,
      data: MOCK_EVENTS,
    });
  }

  try {
    const events = await Event.find({ status: Status.ACTIVE })
      .populate('branch', 'name')
      .populate('trainer', 'name')
      .sort({ date: 1 });

    res.status(200).json({
      success: true,
      data: events,
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(200).json({
      success: true,
      data: MOCK_EVENTS,
    });
  }
};

export const getEvent = async (req: Request, res: Response) => {
  // If DB is not ready, return mock data immediately
  if (!isDbReady) {
    console.warn('⚠️ Using mock events data (DB unavailable)');
    const mockEvent = MOCK_EVENTS.find((e) => e.slug === req.params.slug);
    
    if (!mockEvent) {
      return res.status(404).json({
        success: false,
        error: 'Event not found',
      });
    }
    
    return res.status(200).json({
      success: true,
      data: mockEvent,
    });
  }

  try {
    const event = await Event.findOne({ slug: req.params.slug, status: Status.ACTIVE })
      .populate('branch', 'name')
      .populate('trainer', 'name');

    if (!event) {
      return res.status(404).json({
        success: false,
        error: 'Event not found',
      });
    }

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    console.error('Error fetching event:', error);
    const mockEvent = MOCK_EVENTS.find((e) => e.slug === req.params.slug);
    
    if (!mockEvent) {
      return res.status(404).json({
        success: false,
        error: 'Event not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: mockEvent,
    });
  }
};
