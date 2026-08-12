import mongoose, { Schema, Document, Types } from 'mongoose';
import slugify from 'slugify';
import { Status, PublishedState } from '../types';

export interface IEventDocument extends Document {
  title: string;
  slug: string;
  description: string;
  coverImage?: string;
  date: Date;
  startTime: string;
  endTime: string;
  branch: Types.ObjectId;
  trainer?: Types.ObjectId;
  registrationUrl?: string;
  gallery: string[];
  status: Status;
  publishedState: PublishedState;
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema<IEventDocument>(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    coverImage: {
      type: String,
    },
    date: {
      type: Date,
      required: [true, 'Event date is required'],
    },
    startTime: {
      type: String,
      required: [true, 'Start time is required'],
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please provide valid time in HH:MM format'],
    },
    endTime: {
      type: String,
      required: [true, 'End time is required'],
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please provide valid time in HH:MM format'],
    },
    branch: {
      type: Schema.Types.ObjectId,
      ref: 'Branch',
      required: [true, 'Branch is required'],
    },
    trainer: {
      type: Schema.Types.ObjectId,
      ref: 'Trainer',
    },
    registrationUrl: {
      type: String,
      trim: true,
    },
    gallery: [{ type: String }],
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.ACTIVE,
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
eventSchema.index({ slug: 1 }, { unique: true });
eventSchema.index({ status: 1, publishedState: 1, date: -1 });
eventSchema.index({ branch: 1, date: -1 });
eventSchema.index({ trainer: 1 });

// Generate slug before saving
eventSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    const dateStr = this.date.toISOString().split('T')[0];
    this.slug = slugify(`${this.title}-${dateStr}`, { lower: true, strict: true });
  }
  next();
});

export const Event = mongoose.model<IEventDocument>('Event', eventSchema);