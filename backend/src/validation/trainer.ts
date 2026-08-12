import { z } from 'zod';
import { Status, PublishedState } from '../types';

export const createTrainerSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(100),
    designation: z.string().min(2, 'Designation must be at least 2 characters').max(100),
    specialization: z.array(z.string()).optional(),
    biography: z.string().min(10, 'Biography must be at least 10 characters').max(1000),
    experience: z.number().min(0, 'Experience cannot be negative').max(50),
    branch: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid branch ID'),
    programs: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid program ID')).optional(),
    socialLinks: z.object({
      instagram: z.string().url().optional(),
      twitter: z.string().url().optional(),
      linkedin: z.string().url().optional(),
      facebook: z.string().url().optional(),
    }).optional(),
    displayOrder: z.number().optional(),
    status: z.nativeEnum(Status).optional(),
    publishedState: z.nativeEnum(PublishedState).optional(),
  }),
});

export const updateTrainerSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid trainer ID'),
  }),
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(100).optional(),
    designation: z.string().min(2, 'Designation must be at least 2 characters').max(100).optional(),
    specialization: z.array(z.string()).optional(),
    biography: z.string().min(10, 'Biography must be at least 10 characters').max(1000).optional(),
    experience: z.number().min(0, 'Experience cannot be negative').max(50).optional(),
    branch: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid branch ID').optional(),
    programs: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid program ID')).optional(),
    socialLinks: z.object({
      instagram: z.string().url().optional(),
      twitter: z.string().url().optional(),
      linkedin: z.string().url().optional(),
      facebook: z.string().url().optional(),
    }).optional(),
    displayOrder: z.number().optional(),
    status: z.nativeEnum(Status).optional(),
    publishedState: z.nativeEnum(PublishedState).optional(),
  }),
});

export const getTrainerSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid trainer ID'),
  }),
});

export const listTrainersSchema = z.object({
  query: z.object({
    page: z.string().transform(Number).optional(),
    limit: z.string().transform(Number).optional(),
    sort: z.string().optional(),
    search: z.string().optional(),
    branch: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid branch ID').optional(),
    status: z.nativeEnum(Status).optional(),
    publishedState: z.nativeEnum(PublishedState).optional(),
  }),
});