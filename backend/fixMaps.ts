import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Branch } from './src/models/Branch';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/stallion-fitness';

const defaultMapUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.5!2d78.4!3d17.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1';

async function fixMaps() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    
    // Find all branches without mapUrl
    const branches = await Branch.find({
      $or: [
        { mapUrl: { $exists: false } },
        { mapUrl: '' },
        { mapUrl: null }
      ]
    });
    
    console.log(`Found ${branches.length} branches without mapUrl. Setting default...`);
    
    for (const branch of branches) {
      branch.mapUrl = defaultMapUrl;
      await branch.save();
      console.log(`Updated map for: ${branch.name} (${branch.slug})`);
    }

    console.log('Done!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

fixMaps();
