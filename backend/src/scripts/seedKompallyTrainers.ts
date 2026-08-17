import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Branch } from '../models/Branch';
import { Trainer } from '../models/Trainer';
import { Status, PublishedState } from '../types';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/stallion-fitness';

async function seedKompallyTrainers() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    
    // Find Subash Nagar branch
    const branch = await Branch.findOne({ slug: 'subash-nagar' });
    if (!branch) {
      throw new Error('Subash Nagar branch not found!');
    }

    console.log('Found Subash Nagar branch. Deleting old trainers...');
    
    // Delete existing trainers for Kompally
    await Trainer.deleteMany({ branch: branch._id });

    // The new trainers from the screenshot
    const trainerData = [
      { name: 'Rahul Raj', designation: 'Personal Training & Body Transformation', experience: 5 },
      { name: 'Mosin Khan', designation: 'Bodybuilding & Strength Training', experience: 7 },
      { name: 'Nutrition Expert', designation: 'Nutrition & Wellness Coaching', experience: 2 }, // Name was missing in screenshot
      { name: 'Nirmal jakkamsetti', designation: 'Health & Fitness Coaching', experience: 5 },
      { name: 'Ashish Samal', designation: 'powerlifting & Strength Training', experience: 6 }
    ];

    const createdTrainers = [];
    for (const t of trainerData) {
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
      createdTrainers.push(tr._id);
    }

    // Update branch to point to new trainers
    branch.trainers = createdTrainers;
    
    // Set the branch badge as shown in the screenshot
    branch.badge = 'CULT Partnered';
    
    await branch.save();

    console.log('Successfully updated Kompally trainers!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating trainers:', error);
    process.exit(1);
  }
}

seedKompallyTrainers();
