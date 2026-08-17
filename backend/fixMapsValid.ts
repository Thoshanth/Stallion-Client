import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Branch } from './src/models/Branch';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/stallion-fitness';

// A valid Google Maps embed URL for Hyderabad
const validMapUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121825.29778235213!2d78.43168249821817!3d17.411602738758872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2f5%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1716954271822!5m2!1sen!2sin';
const invalidUrlPrefix = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.5!2d78.4!3d17.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1';

async function fixMaps() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    
    // Find all branches
    const branches = await Branch.find({});
    
    for (const branch of branches) {
      if (branch.mapUrl && branch.mapUrl.startsWith(invalidUrlPrefix)) {
        branch.mapUrl = validMapUrl;
        await branch.save();
        console.log(`Updated map for: ${branch.name}`);
      }
    }

    console.log('Done fixing maps!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

fixMaps();
