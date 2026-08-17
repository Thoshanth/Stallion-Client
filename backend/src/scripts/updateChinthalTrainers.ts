import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Branch } from '../models/Branch';
import { Trainer } from '../models/Trainer';
import { Program } from '../models/Program';
import { Status, PublishedState } from '../types';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/stallion-fitness';

async function updateChinthalTrainers() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    
    // Find Chinthal branch
    const branch = await Branch.findOne({ slug: 'chinthal' });
    if (!branch) {
      throw new Error('Chinthal branch not found!');
    }

    console.log('Found Chinthal branch. Deleting old trainers...');
    
    // Delete existing trainers for Chinthal
    await Trainer.deleteMany({ branch: branch._id });

    // The new trainers from the screenshot
    const trainerData = [
      { name: 'Bandari Venkatesh', designation: 'Powerlifting & Strength Training', experience: 4 },
      { name: 'Vanampally Santhosh', designation: 'Functional Training & CrossFit', experience: 5 },
      { name: 'Srikar', designation: 'Bodybuilding & Nutrition', experience: 2 }
    ];

    const createdTrainers = [];
    for (const t of trainerData) {
      // Create trainer (programs can be left empty for now, or we can just fetch random ones, but not strictly needed based on UI since designation acts as program)
      const tr = await Trainer.create({
        name: t.name,
        designation: t.designation,
        biography: `Certified expert specializing in ${t.designation}.`,
        experience: t.experience,
        branch: branch._id,
        programs: [],
        status: Status.ACTIVE,
        publishedState: PublishedState.PUBLISHED,
        profileImage: '/images/hero.png' // Fallback
      });
      createdTrainers.push(tr);
    }

    // Update branch to point to new trainers
    branch.trainers = createdTrainers.map(t => t._id);
    await branch.save();

    console.log('Successfully updated Chinthal trainers!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating trainers:', error);
    process.exit(1);
  }
}

updateChinthalTrainers();
