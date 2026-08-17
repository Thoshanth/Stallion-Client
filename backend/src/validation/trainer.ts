import { z } from 'zod';
import { Status, PublishedState } from '../types';

export const createTrainerSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(100),
    designation: z.string().min(2, 'Designation must be at least 2 characters').max(100),
    specialization: z.union([
      z.array(z.string()),
      z.string().transform((str) => {
        try {
          return JSON.parse(str);
        } catch {
          return [];
        }
      })
    ]).optional(),
    biography: z.string().min(10, 'Biography must be at least 10 characters').max(1000),
    experience: z.union([
      z.number(),
      z.string().transform((str) => {
        const num = parseInt(str, 10);
        if (isNaN(num)) throw new Error('Experience must be a valid number');
        return num;
      })
    ]).pipe(z.number().min(0, 'Experience cannot be negative').max(50)),
    branch: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid branch ID'),
    programs: z.union([
      z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid program ID')),
      z.string().transform((str) => {
        try {
          return JSON.parse(str);
        } catch {
          return [];
        }
      })
    ]).optional(),
    socialLinks: z.union([
      z.object({
        instagram: z.string().url().optional(),
        twitter: z.string().url().optional(),
        linkedin: z.string().url().optional(),
        facebook: z.string().url().optional(),
      }),
      z.string().transform((str) => {
        try {
          return JSON.parse(str);
        } catch {
          return {};
        }
      })
    ]).optional(),
    displayOrder: z.union([
      z.number(),
      z.string().transform((str) => {
        const num = parseInt(str, 10);
        if (isNaN(num)) return 0;
        return num;
      })
    ]).optional(),
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
    specialization: z.union([
      z.array(z.string()),
      z.string().transform((str) => {
        try {
          return JSON.parse(str);
        } catch {
          return [];
        }
      })
    ]).optional(),
    biography: z.string().min(10, 'Biography must be at least 10 characters').max(1000).optional(),
    experience: z.union([
      z.number(),
      z.string().transform((str) => {
        const num = parseInt(str, 10);
        if (isNaN(num)) throw new Error('Experience must be a valid number');
        return num;
      })
    ]).pipe(z.number().min(0, 'Experience cannot be negative').max(50)).optional(),
    branch: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid branch ID').optional(),
    programs: z.union([
      z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid program ID')),
      z.string().transform((str) => {
        try {
          return JSON.parse(str);
        } catch {
          return [];
        }
      })
    ]).optional(),
    socialLinks: z.union([
      z.object({
        instagram: z.string().url().optional(),
        twitter: z.string().url().optional(),
        linkedin: z.string().url().optional(),
        facebook: z.string().url().optional(),
      }),
      z.string().transform((str) => {
        try {
          return JSON.parse(str);
        } catch {
          return {};
        }
      })
    ]).optional(),
    displayOrder: z.union([
      z.number(),
      z.string().transform((str) => {
        const num = parseInt(str, 10);
        if (isNaN(num)) return 0;
        return num;
      })
    ]).optional(),
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