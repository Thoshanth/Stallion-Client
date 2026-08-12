import mongoose, { Schema, Document, Types } from 'mongoose';
import { Status } from '../types';

export interface IPricingPlanDocument extends Document {
  name: string;
  description: string;
  price: number;
  billingPeriod: 'monthly' | 'quarterly' | 'yearly' | 'lifetime';
  features: string[];
  branches: Types.ObjectId[];
  highlighted: boolean;
  displayOrder: number;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}

const pricingPlanSchema = new Schema<IPricingPlanDocument>(
  {
    name: {
      type: String,
      required: [true, 'Plan name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [300, 'Description cannot exceed 300 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    billingPeriod: {
      type: String,
      enum: ['monthly', 'quarterly', 'yearly', 'lifetime'],
      required: [true, 'Billing period is required'],
    },
    features: [{
      type: String,
      trim: true,
    }],
    branches: [{ type: Schema.Types.ObjectId, ref: 'Branch' }],
    highlighted: {
      type: Boolean,
      default: false,
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
  },
  {
    timestamps: true,
  }
);

// Indexes
pricingPlanSchema.index({ status: 1, displayOrder: 1 });
pricingPlanSchema.index({ highlighted: -1, displayOrder: 1 });

export const PricingPlan = mongoose.model<IPricingPlanDocument>('PricingPlan', pricingPlanSchema);