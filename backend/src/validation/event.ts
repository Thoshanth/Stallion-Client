import { z } from 'zod';
import { Status, PublishedState } from '../types';

export const createEventSchema = z.object({
  body: z.object({
    title: z.string().min(2, 'Title must be at least 2 characters').max(200),
    description: z.string().min(10, 'Description must be at least 10 characters').max(1000),
    date: z.string().transform((str) => new Date(str)),
    startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please provide valid time in HH:MM format'),
    endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please provide valid time in HH:MM format'),
    branch: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid branch ID'),
    trainer: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid trainer ID').optional(),
    registrationUrl: z.string().url().optional().or(z.literal('')),
    gallery: z.union([
      z.array(z.string()),
      z.string().transform((str) => {
        try {
          return JSON.parse(str);
        } catch {
          return [];
        }
      })
    ]).optional(),
    status: z.nativeEnum(Status).optional(),
    publishedState: z.nativeEnum(PublishedState).optional(),
  }),
});

export const updateEventSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid event ID'),
  }),
  body: z.object({
    title: z.string().min(2, 'Title must be at least 2 characters').max(200).optional(),
    description: z.string().min(10, 'Description must be at least 10 characters').max(1000).optional(),
    date: z.string().transform((str) => new Date(str)).optional(),
    startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please provide valid time in HH:MM format').optional(),
    endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please provide valid time in HH:MM format').optional(),
    branch: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid branch ID').optional(),
    trainer: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid trainer ID').optional(),
    registrationUrl: z.string().url().optional().or(z.literal('')),
    gallery: z.union([
      z.array(z.string()),
      z.string().transform((str) => {
        try {
          return JSON.parse(str);
        } catch {
          return [];
        }
      })
    ]).optional(),
    status: z.nativeEnum(Status).optional(),
    publishedState: z.nativeEnum(PublishedState).optional(),
  }),
});

export const getEventSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid event ID'),
  }),
});

export const listEventsSchema = z.object({
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