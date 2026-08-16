import mongoose, { Schema, Document, Types } from 'mongoose';
import slugify from 'slugify';
import { Status } from '../types';

export interface IBranchDocument extends Document {
  name: string;
  slug: string;
  address: string;
  phone: string;
  email?: string;
  latitude?: number;
  longitude?: number;
  googleMapsUrl?: string;
  mapUrl?: string;
  image?: string;
  hoverImage?: string;
  openingHours: {
    monday: { open: string; close: string; closed?: boolean };
    tuesday: { open: string; close: string; closed?: boolean };
    wednesday: { open: string; close: string; closed?: boolean };
    thursday: { open: string; close: string; closed?: boolean };
    friday: { open: string; close: string; closed?: boolean };
    saturday: { open: string; close: string; closed?: boolean };
    sunday: { open: string; close: string; closed?: boolean };
  };
  images: string[];
  programs: Types.ObjectId[];
  trainers: Types.ObjectId[];
  status: Status;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const branchSchema = new Schema<IBranchDocument>(
  {
    name: {
      type: String,
      required: [true, 'Branch name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    latitude: {
      type: Number,
      min: -90,
      max: 90,
    },
    longitude: {
      type: Number,
      min: -180,
      max: 180,
    },
    googleMapsUrl: {
      type: String,
      trim: true,
    },
    mapUrl: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    hoverImage: {
      type: String,
      trim: true,
    },
    openingHours: {
      monday: {
        open: { type: String, default: '06:00' },
        close: { type: String, default: '22:00' },
        closed: { type: Boolean, default: false },
      },
      tuesday: {
        open: { type: String, default: '06:00' },
        close: { type: String, default: '22:00' },
        closed: { type: Boolean, default: false },
      },
      wednesday: {
        open: { type: String, default: '06:00' },
        close: { type: String, default: '22:00' },
        closed: { type: Boolean, default: false },
      },
      thursday: {
        open: { type: String, default: '06:00' },
        close: { type: String, default: '22:00' },
        closed: { type: Boolean, default: false },
      },
      friday: {
        open: { type: String, default: '06:00' },
        close: { type: String, default: '22:00' },
        closed: { type: Boolean, default: false },
      },
      saturday: {
        open: { type: String, default: '06:00' },
        close: { type: String, default: '22:00' },
        closed: { type: Boolean, default: false },
      },
      sunday: {
        open: { type: String, default: '06:00' },
        close: { type: String, default: '22:00' },
        closed: { type: Boolean, default: false },
      },
    },
    images: [{ type: String }],
    programs: [{ type: Schema.Types.ObjectId, ref: 'Program' }],
    trainers: [{ type: Schema.Types.ObjectId, ref: 'Trainer' }],
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.ACTIVE,
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
branchSchema.index({ slug: 1 }, { unique: true });
branchSchema.index({ status: 1, displayOrder: 1 });
branchSchema.index({ latitude: 1, longitude: 1 });

// Generate slug before saving
branchSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

export const Branch = mongoose.model<IBranchDocument>('Branch', branchSchema);