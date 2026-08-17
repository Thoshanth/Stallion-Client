import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Branch } from '../models/Branch';
import { Trainer } from '../models/Trainer';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/stallion-fitness';

async function syncTrainers() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    
    console.log('Finding all trainers...');
    const trainers = await Trainer.find({});
    
    console.log(`Found ${trainers.length} trainers. Syncing with branches...`);
    
    // First, clear all trainers arrays in branches to ensure no dangling references
    await Branch.updateMany({}, { $set: { trainers: [] } });

    // Then re-add all active/published trainers to their branches
    for (const trainer of trainers) {
      if (trainer.branch) {
        await Branch.findByIdAndUpdate(trainer.branch, {
          $addToSet: { trainers: trainer._id }
        });
      }
    }

    console.log('Successfully synced all trainers to their branches!');
    process.exit(0);
  } catch (error) {
    console.error('Error syncing trainers:', error);
    process.exit(1);
  }
}

syncTrainers();
