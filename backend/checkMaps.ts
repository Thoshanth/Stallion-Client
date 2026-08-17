import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Branch } from './src/models/Branch';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/stallion-fitness';

async function checkMaps() {
  try {
    await mongoose.connect(MONGODB_URI);
    const branches = await Branch.find({ slug: { $in: ['idpl', 'subash-nagar'] } }, 'name slug mapUrl googleMapsUrl');
    console.log(JSON.stringify(branches, null, 2));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

checkMaps();
