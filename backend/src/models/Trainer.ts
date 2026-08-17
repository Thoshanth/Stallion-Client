import mongoose, { Schema, Document, Types } from 'mongoose';
import slugify from 'slugify';
import { Status, PublishedState } from '../types';

export interface ITrainerDocument extends Document {
  name: string;
  slug: string;
  profileImage?: string;
  designation: string;
  specialization: string[];
  biography: string;
  experience: number;
  branch: Types.ObjectId;
  programs: Types.ObjectId[];
  socialLinks: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    facebook?: string;
  };
  displayOrder: number;
  status: Status;
  publishedState: PublishedState;
  createdAt: Date;
  updatedAt: Date;
}

const trainerSchema = new Schema<ITrainerDocument>(
  {
    name: {
      type: String,
      required: [true, 'Trainer name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    profileImage: {
      type: String,
    },
    designation: {
      type: String,
      required: [true, 'Designation is required'],
      trim: true,
      maxlength: [100, 'Designation cannot exceed 100 characters'],
    },
    specialization: [{
      type: String,
      trim: true,
    }],
    biography: {
      type: String,
      required: [true, 'Biography is required'],
      trim: true,
      maxlength: [1000, 'Biography cannot exceed 1000 characters'],
    },
    experience: {
      type: Number,
      required: [true, 'Experience is required'],
      min: [0, 'Experience cannot be negative'],
      max: [50, 'Experience cannot exceed 50 years'],
    },
    branch: {
      type: Schema.Types.ObjectId,
      ref: 'Branch',
      required: [true, 'Branch is required'],
    },
    programs: [{ type: Schema.Types.ObjectId, ref: 'Program' }],
    socialLinks: {
      instagram: { type: String, trim: true },
      twitter: { type: String, trim: true },
      linkedin: { type: String, trim: true },
      facebook: { type: String, trim: true },
    },
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
// We remove the strict unique index on slug to handle it manually in the pre-save hook
trainerSchema.index({ slug: 1 });
trainerSchema.index({ status: 1, publishedState: 1, displayOrder: 1 });
trainerSchema.index({ branch: 1 });

// Generate unique slug before saving
trainerSchema.pre('save', async function (next) {
  if (this.isModified('name')) {
    const baseSlug = slugify(this.name, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;
    
    const TrainerModel = this.constructor as mongoose.Model<ITrainerDocument>;
    
    while (await TrainerModel.exists({ slug, _id: { $ne: this._id } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    
    this.slug = slug;
  }
  next();
});

export const Trainer = mongoose.model<ITrainerDocument>('Trainer', trainerSchema);