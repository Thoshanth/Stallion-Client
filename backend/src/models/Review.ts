import mongoose, { Schema, Document, Types } from 'mongoose';
import { ReviewStatus } from '../types';

export interface IReviewDocument extends Document {
  name: string;
  rating: number;
  reviewText: string;
  avatar?: string;
  source?: string;
  branch?: Types.ObjectId;
  status: ReviewStatus;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReviewDocument>(
  {
    name: {
      type: String,
      required: [true, 'Reviewer name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
    },
    reviewText: {
      type: String,
      required: [true, 'Review text is required'],
      trim: true,
      maxlength: [500, 'Review cannot exceed 500 characters'],
    },
    avatar: {
      type: String,
    },
    source: {
      type: String,
      trim: true,
      maxlength: [50, 'Source cannot exceed 50 characters'],
    },
    branch: {
      type: Schema.Types.ObjectId,
      ref: 'Branch',
    },
    status: {
      type: String,
      enum: Object.values(ReviewStatus),
      default: ReviewStatus.PENDING,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
reviewSchema.index({ status: 1, displayOrder: 1 });
reviewSchema.index({ branch: 1, status: 1 });
reviewSchema.index({ rating: -1 });

export const Review = mongoose.model<IReviewDocument>('Review', reviewSchema);