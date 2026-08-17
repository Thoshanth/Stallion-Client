import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Program } from './src/models/Program';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/stallion-fitness';

async function removeDummyPrograms() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    
    // Array of slugs to delete
    const slugsToDelete = [
      'weight-loss',
      'body-building',
      'crossfit',
      'yoga',
      'zumba',
      'aerobics',
      'gymnastics',
      'personal-training',
      'nutrition',
      'physical-therapy'
    ];
    
    // Delete by both slug and name just in case
    const result = await Program.deleteMany({
      $or: [
        { name: { $in: slugsToDelete } },
        { slug: { $in: slugsToDelete } }
      ]
    });
    
    console.log(`Deleted ${result.deletedCount} dummy programs.`);

    console.log('Done!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

removeDummyPrograms();
