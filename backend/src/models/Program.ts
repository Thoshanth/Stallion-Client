import mongoose, { Schema, Document, Types } from 'mongoose';
import slugify from 'slugify';
import { Status, PublishedState } from '../types';

export interface IProgramDocument extends Document {
  name: string;
  slug: string;
  description: string;
  image?: string;
  features: string[];
  trainers: Types.ObjectId[];
  branches: Types.ObjectId[];
  displayOrder: number;
  status: Status;
  publishedState: PublishedState;
  createdAt: Date;
  updatedAt: Date;
}

const programSchema = new Schema<IProgramDocument>(
  {
    name: {
      type: String,
      required: [true, 'Program name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    image: {
      type: String,
    },
    features: [{
      type: String,
      trim: true,
    }],
    trainers: [{ type: Schema.Types.ObjectId, ref: 'Trainer' }],
    branches: [{ type: Schema.Types.ObjectId, ref: 'Branch' }],
    displayOrder: {
      type: Number,
      default: 0,
    },
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
programSchema.index({ slug: 1 }, { unique: true });
programSchema.index({ status: 1, publishedState: 1, displayOrder: 1 });

// Generate slug before saving
programSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

export const Program = mongoose.model<IProgramDocument>('Program', programSchema);