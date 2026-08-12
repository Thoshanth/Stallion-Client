import { Request, Response } from 'express';
import { FAQ } from '../models/FAQ';
import { PublishedState } from '../types';

export const getFAQs = async (req: Request, res: Response) => {
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
    res.status(500).json({
      success: false,
      error: 'Failed to fetch FAQs',
    });
  }
};
