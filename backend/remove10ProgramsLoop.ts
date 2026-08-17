import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Program } from './src/models/Program';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/stallion-fitness';

async function removeDummyPrograms() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    
    const p = await Program.find({ status: 'ACTIVE', publishedState: 'PUBLISHED' })
      .sort({ displayOrder: 1, createdAt: -1 })
      .limit(10);
      
    console.log(`Found ${p.length} programs to delete.`);
    
    let deletedCount = 0;
    for (const prog of p) {
      await Program.findByIdAndDelete(prog._id);
      deletedCount++;
    }
    
    console.log(`Deleted ${deletedCount} dummy programs.`);

    console.log('Done!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

removeDummyPrograms();
