import mongoose, { Schema, Document } from 'mongoose';
import { PublishedState } from '../types';

export interface IFAQDocument extends Document {
  question: string;
  answer: string;
  category?: string;
  displayOrder: number;
  publishedState: PublishedState;
  createdAt: Date;
  updatedAt: Date;
}

const faqSchema = new Schema<IFAQDocument>(
  {
    question: {
      type: String,
      required: [true, 'Question is required'],
      trim: true,
      maxlength: [300, 'Question cannot exceed 300 characters'],
    },
    answer: {
      type: String,
      required: [true, 'Answer is required'],
      trim: true,
      maxlength: [1000, 'Answer cannot exceed 1000 characters'],
    },
    category: {
      type: String,
      trim: true,
      maxlength: [50, 'Category cannot exceed 50 characters'],
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    publishedState: {
      type: String,
      enum: Object.values(PublishedState),
      default: PublishedState.DRAFT,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
faqSchema.index({ publishedState: 1, displayOrder: 1 });
faqSchema.index({ category: 1, displayOrder: 1 });

export const FAQ = mongoose.model<IFAQDocument>('FAQ', faqSchema);