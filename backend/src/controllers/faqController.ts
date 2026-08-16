import { Request, Response } from 'express';
import { FAQ } from '../models/FAQ';
import { PublishedState } from '../types';
import { isDbReady } from '../config/database';

// Mock data fallback for when database is unavailable
const MOCK_FAQS = [
  {
    _id: '1',
    question: 'What are your gym operating hours?',
    answer: 'We are open from 5:00 AM to 11:00 PM, 7 days a week. Our trainers are available during peak hours (6 AM-10 AM and 5 PM-9 PM) for personalized guidance.',
    displayOrder: 1,
    publishedState: PublishedState.PUBLISHED,
    createdAt: new Date('2024-01-01'),
  },
  {
    _id: '2',
    question: 'What kind of equipment do you have?',
    answer: 'We have state-of-the-art equipment including cardio machines, free weights, resistance machines, functional training zones, and specialized areas for CrossFit and boxing. All equipment is regularly maintained and sanitized.',
    displayOrder: 2,
    publishedState: PublishedState.PUBLISHED,
    createdAt: new Date('2024-01-02'),
  },
  {
    _id: '3',
    question: 'Are your trainers certified?',
    answer: 'Yes, all our trainers are certified professionals with recognized credentials from ACE, NASM, or equivalent certifications. They undergo continuous education to stay updated with the latest fitness trends and techniques.',
    displayOrder: 3,
    publishedState: PublishedState.PUBLISHED,
    createdAt: new Date('2024-01-03'),
  },
  {
    _id: '4',
    question: 'Can I freeze my membership?',
    answer: 'Yes, you can freeze your membership for medical reasons or travel. A freeze period of up to 30 days per year is allowed with proper documentation. Please contact our front desk for more details.',
    displayOrder: 4,
    publishedState: PublishedState.PUBLISHED,
    createdAt: new Date('2024-01-04'),
  },
  {
    _id: '5',
    question: 'Do you offer trial sessions?',
    answer: 'Yes, we offer a complimentary trial session for first-time visitors. This includes a gym tour, fitness assessment, and a workout session with one of our trainers. Book your trial session by contacting us or visiting any of our branches.',
    displayOrder: 5,
    publishedState: PublishedState.PUBLISHED,
    createdAt: new Date('2024-01-05'),
  },
];

export const getFAQs = async (req: Request, res: Response) => {
  // If DB is not ready, return mock data immediately
  if (!isDbReady) {
    console.warn('⚠️ Using mock FAQs data (DB unavailable)');
    return res.status(200).json({
      success: true,
      data: MOCK_FAQS,
    });
  }

  try {
    const faqs = await FAQ.find({
      publishedState: PublishedState.PUBLISHED,
    })
      .sort({ displayOrder: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      data: faqs,
    });
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    res.status(200).json({
      success: true,
      data: MOCK_FAQS,
    });
  }
};
